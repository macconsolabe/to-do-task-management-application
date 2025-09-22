using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApp.Models.DTOs.AI;
using TodoApp.Models.DTOs.Request;
using TodoApp.Models.Entities;
using TodoApp.Services;
using TaskStatus = TodoApp.Models.Entities.TaskStatus;

namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AIController : ControllerBase
    {
        private readonly IAIService? _aiService;
        private readonly TodoContext _context;
        private readonly ILogger<AIController> _logger;
        private readonly IConfiguration _configuration;

        public AIController(TodoContext context, ILogger<AIController> logger, IConfiguration configuration, IAIService? aiService = null)
        {
            _aiService = aiService;
            _context = context;
            _logger = logger;
            _configuration = configuration;
        }

        // GET: api/AI/status
        [HttpGet("status")]
        public ActionResult<object> GetAIStatus()
        {
            var isEnabled = _aiService != null;
            return Ok(new { 
                enabled = isEnabled,
                message = isEnabled ? "AI Assistant is available" : "AI Assistant is disabled"
            });
        }

        // POST: api/AI/chat
        [HttpPost("chat")]
        public async Task<ActionResult<AIChatResponseDto>> Chat(AIChatRequestDto request)
        {
            if (_aiService == null)
            {
                return Ok(new AIChatResponseDto
                {
                    Response = "AI Assistant is currently disabled. To enable it, set EnableAI=true in the configuration.",
                    IsTaskReady = false
                });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var response = await _aiService.ChatAsync(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in AI chat");
                return StatusCode(500, new { message = "An error occurred while processing your request" });
            }
        }

        // POST: api/AI/create-task
        [HttpPost("create-task")]
        public async Task<ActionResult<TodoTask>> CreateTaskFromAI(CreateTaskFromAIDto request)
        {
            if (_aiService == null)
            {
                return BadRequest(new { message = "AI Assistant is currently disabled" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Map parsed task to actual task
                var todoTask = new TodoTask
                {
                    Title = request.Task.Title,
                    Description = request.Task.Description,
                    Status = Enum.Parse<TaskStatus>(request.Task.Status),
                    Priority = Enum.Parse<TaskPriority>(request.Task.Priority),
                    DueDate = request.Task.DueDate,
                    UserId = request.UserId,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.TodoTasks.Add(todoTask);
                await _context.SaveChangesAsync();

                // Create subtasks if any
                if (request.Task.Subtasks.Any())
                {
                    var subtasks = request.Task.Subtasks.Select((title, index) => new Subtask
                    {
                        Title = title,
                        IsCompleted = false,
                        Order = index,
                        TodoTaskId = todoTask.Id,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow
                    }).ToList();

                    _context.Subtasks.AddRange(subtasks);
                    await _context.SaveChangesAsync();
                }

                // Reload with subtasks
                var createdTask = await _context.TodoTasks
                    .Include(t => t.Subtasks.OrderBy(s => s.Order))
                    .FirstOrDefaultAsync(t => t.Id == todoTask.Id);

                return Ok(createdTask);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating task from AI");
                return StatusCode(500, new { message = "An error occurred while creating the task" });
            }
        }

        // POST: api/AI/parse-task
        [HttpPost("parse-task")]
        public async Task<ActionResult<ParsedTaskDto>> ParseTask([FromBody] string text)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return BadRequest("Text is required");
            }

            try
            {
                var parsedTask = await _aiService.ParseTaskFromText(text);
                if (parsedTask == null)
                {
                    return BadRequest("Could not parse task from text");
                }

                return Ok(parsedTask);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing task");
                return StatusCode(500, new { message = "An error occurred while parsing the task" });
            }
        }
    }
}
