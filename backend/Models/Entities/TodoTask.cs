using System.ComponentModel.DataAnnotations;

namespace TodoApp.Models.Entities
{
    public class TodoTask
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public TaskStatus Status { get; set; } = TaskStatus.Pending;

        [Required]
        public TaskPriority Priority { get; set; } = TaskPriority.Medium;

        public DateTime? DueDate { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Manual progress (0-100) - used when no subtasks exist
        public int ManualProgress { get; set; } = 0;

        // Foreign key for User relationship
        public int? UserId { get; set; }

        // Navigation property for subtasks
        public ICollection<Subtask> Subtasks { get; set; } = new List<Subtask>();
    }

    public enum TaskStatus
    {
        Pending = 0,
        InProgress = 1,
        Completed = 2
    }

    public enum TaskPriority
    {
        Low = 0,
        Medium = 1,
        High = 2
    }
}
