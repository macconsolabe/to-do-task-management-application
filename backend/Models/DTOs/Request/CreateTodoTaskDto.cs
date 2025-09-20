using System.ComponentModel.DataAnnotations;
using TodoApp.Models.Entities;
using TaskStatus = TodoApp.Models.Entities.TaskStatus;

namespace TodoApp.Models.DTOs.Request
{
    public class CreateTodoTaskDto
    {
        [Required]
        [StringLength(200, MinimumLength = 1)]
        public string Title { get; set; } = string.Empty;

        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;

        public TaskPriority Priority { get; set; } = TaskPriority.Medium;

        public DateTime? DueDate { get; set; }

        [Required]
        public int UserId { get; set; }
    }

    public class UpdateTodoTaskDto
    {
        [Required]
        [StringLength(200, MinimumLength = 1)]
        public string Title { get; set; } = string.Empty;

        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public TaskStatus Status { get; set; }

        [Required]
        public TaskPriority Priority { get; set; }

        public DateTime? DueDate { get; set; }
    }
}
