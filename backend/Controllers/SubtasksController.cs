using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApp.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace TodoApi.Controllers
{
    public class CreateSubtaskDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public int TodoTaskId { get; set; }
        [Required]
        public int Order { get; set; }
    }

    public class UpdateSubtaskDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
    }

    [ApiController]
    [Route("api/[controller]")]
    public class SubtasksController : ControllerBase
    {
        private readonly TodoContext _context;

        public SubtasksController(TodoContext context)
        {
            _context = context;
        }

        // PATCH: api/Subtasks/5/toggle
        [HttpPatch("{id}/toggle")]
        public async Task<IActionResult> ToggleSubtask(int id)
        {
            var subtask = await _context.Subtasks.FindAsync(id);
            if (subtask == null)
            {
                return NotFound();
            }

            subtask.IsCompleted = !subtask.IsCompleted;
            subtask.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // POST: api/Subtasks
        [HttpPost]
        public async Task<ActionResult<Subtask>> CreateSubtask([FromBody] CreateSubtaskDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var subtask = new Subtask
            {
                Title = createDto.Title,
                TodoTaskId = createDto.TodoTaskId,
                Order = createDto.Order,
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Subtasks.Add(subtask);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSubtask), new { id = subtask.Id }, subtask);
        }

        // GET: api/Subtasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Subtask>> GetSubtask(int id)
        {
            var subtask = await _context.Subtasks.FindAsync(id);
            if (subtask == null)
            {
                return NotFound();
            }
            return subtask;
        }

        // PUT: api/Subtasks/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Subtask>> UpdateSubtask(int id, UpdateSubtaskDto updateDto)
        {
            var subtask = await _context.Subtasks.FindAsync(id);
            if (subtask == null)
            {
                return NotFound();
            }

            subtask.Title = updateDto.Title;
            subtask.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubtaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return subtask;
        }

        // DELETE: api/Subtasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubtask(int id)
        {
            var subtask = await _context.Subtasks.FindAsync(id);
            if (subtask == null)
            {
                return NotFound();
            }

            _context.Subtasks.Remove(subtask);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubtaskExists(int id)
        {
            return _context.Subtasks.Any(e => e.Id == id);
        }
    }
}
