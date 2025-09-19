using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;
using TaskStatus = TodoApi.Models.TaskStatus;

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

        // GET: api/TodoTasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoTask>>> GetTodoTasks()
        {
            return await _context.TodoTasks
                .Include(t => t.Subtasks.OrderBy(s => s.Order))
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }

        // GET: api/TodoTasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoTask>> GetTodoTask(int id)
        {
            var todoTask = await _context.TodoTasks
                .Include(t => t.Subtasks.OrderBy(s => s.Order))
                .FirstOrDefaultAsync(t => t.Id == id);

            if (todoTask == null)
            {
                return NotFound();
            }

            return todoTask;
        }

        // POST: api/TodoTasks
        [HttpPost]
        public async Task<ActionResult<TodoTask>> CreateTodoTask(CreateTodoTaskDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var todoTask = new TodoTask
            {
                Title = createDto.Title,
                Description = createDto.Description,
                Priority = createDto.Priority,
                DueDate = createDto.DueDate,
                Status = TaskStatus.Pending,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.TodoTasks.Add(todoTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodoTask), new { id = todoTask.Id }, todoTask);
        }

        // PUT: api/TodoTasks/5
        [HttpPut("{id}")]
        public async Task<ActionResult<TodoTask>> UpdateTodoTask(int id, UpdateTodoTaskDto updateDto)
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
            
            return updatedTask!;
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
