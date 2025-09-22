using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApp.Models.Entities;
using TodoApp.Models.DTOs.Request;
using TodoApp.Models.DTOs.Response;
using TodoApp.Extensions;
using TaskStatus = TodoApp.Models.Entities.TaskStatus;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoTasksController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoTasksController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/TodoTasks?userId={userId}
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoTaskResponseDto>>> GetTodoTasks([FromQuery] int? userId = null)
        {
            var query = _context.TodoTasks
                .Include(t => t.Subtasks.OrderBy(s => s.Order))
                .AsQueryable();

            // Filter by user if userId is provided
            if (userId.HasValue)
            {
                query = query.Where(t => t.UserId == userId.Value);
            }

            var tasks = await query
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            return tasks.Select(t => t.ToResponseDto()).ToList();
        }

        // GET: api/TodoTasks/search?query={searchTerm}&userId={userId}
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<TodoTaskResponseDto>>> SearchTodoTasks(
            [FromQuery] string query, 
            [FromQuery] int? userId = null)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest(new { message = "Search query cannot be empty" });
            }

            // Normalize search query for case-insensitive search
            var searchTerm = query.Trim().ToLower();

            var queryBuilder = _context.TodoTasks
                .Include(t => t.Subtasks.OrderBy(s => s.Order))
                .AsQueryable();

            // Filter by user if userId is provided
            if (userId.HasValue)
            {
                queryBuilder = queryBuilder.Where(t => t.UserId == userId.Value);
            }

            // Search across title, description, and subtasks
            var searchResults = await queryBuilder
                .Where(t => 
                    // Search in task title
                    t.Title.ToLower().Contains(searchTerm) ||
                    // Search in task description
                    t.Description.ToLower().Contains(searchTerm) ||
                    // Search in subtask titles
                    t.Subtasks.Any(s => s.Title.ToLower().Contains(searchTerm))
                )
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            return searchResults.Select(t => t.ToResponseDto()).ToList();
        }

        // GET: api/TodoTasks/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<TodoTaskResponseDto>> GetTodoTask(int id)
        {
            var todoTask = await _context.TodoTasks
                .Include(t => t.Subtasks.OrderBy(s => s.Order))
                .FirstOrDefaultAsync(t => t.Id == id);

            if (todoTask == null)
            {
                return NotFound();
            }

            return todoTask.ToResponseDto();
        }

        // POST: api/TodoTasks
        [HttpPost]
        public async Task<ActionResult<TodoTaskResponseDto>> CreateTodoTask(CreateTodoTaskDto createDto)
        {
            // Debug logging
            Console.WriteLine($"Received CreateTodoTaskDto: Title={createDto.Title}, UserId={createDto.UserId}");
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Verify user exists
            var userExists = await _context.Users.AnyAsync(u => u.Id == createDto.UserId);
            if (!userExists)
            {
                return BadRequest(new { message = "Invalid user ID" });
            }

            var todoTask = new TodoTask
            {
                Title = createDto.Title,
                Description = createDto.Description,
                Priority = createDto.Priority,
                DueDate = createDto.DueDate,
                UserId = createDto.UserId,
                Status = TaskStatus.Todo,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            // Debug logging
            Console.WriteLine($"Creating TodoTask: Title={todoTask.Title}, UserId={todoTask.UserId}");

            _context.TodoTasks.Add(todoTask);
            await _context.SaveChangesAsync();

            Console.WriteLine($"Saved TodoTask with ID: {todoTask.Id}, UserId: {todoTask.UserId}");

            // Load the task with subtasks for proper DTO conversion
            var createdTask = await _context.TodoTasks
                .Include(t => t.Subtasks.OrderBy(s => s.Order))
                .FirstAsync(t => t.Id == todoTask.Id);

            var responseDto = createdTask.ToResponseDto();
            return CreatedAtAction(nameof(GetTodoTask), new { id = todoTask.Id }, responseDto);
        }

        // PUT: api/TodoTasks/5
        [HttpPut("{id}")]
        public async Task<ActionResult<TodoTaskResponseDto>> UpdateTodoTask(int id, UpdateTodoTaskDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var todoTask = await _context.TodoTasks.FindAsync(id);
            if (todoTask == null)
            {
                return NotFound();
            }

            todoTask.Title = updateDto.Title;
            todoTask.Description = updateDto.Description;
            todoTask.Status = updateDto.Status;
            todoTask.Priority = updateDto.Priority;
            todoTask.DueDate = updateDto.DueDate;
            todoTask.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoTaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Reload the task with subtasks to return the complete updated task
            var updatedTask = await _context.TodoTasks
                .Include(t => t.Subtasks.OrderBy(s => s.Order))
                .FirstOrDefaultAsync(t => t.Id == id);
            
            return updatedTask!.ToResponseDto();
        }

        // DELETE: api/TodoTasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoTask(int id)
        {
            var todoTask = await _context.TodoTasks.FindAsync(id);
            if (todoTask == null)
            {
                return NotFound();
            }

            _context.TodoTasks.Remove(todoTask);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/TodoTasks/5/status
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateTaskStatus(int id, [FromBody] TaskStatus status)
        {
            var todoTask = await _context.TodoTasks.FindAsync(id);
            if (todoTask == null)
            {
                return NotFound();
            }

            todoTask.Status = status;
            todoTask.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool TodoTaskExists(int id)
        {
            return _context.TodoTasks.Any(e => e.Id == id);
        }
    }
}
