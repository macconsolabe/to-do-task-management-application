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
        public TaskStatus Status { get; set; } = TaskStatus.Todo;

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
        Todo = 0,        // Will be stored as "Todo" in database
        InProgress = 1,  // Will be stored as "InProgress" in database
        Completed = 2    // Will be stored as "Completed" in database
    }

    public enum TaskPriority
    {
        Low = 0,         // Will be stored as "Low" in database
        Medium = 1,      // Will be stored as "Medium" in database
        High = 2         // Will be stored as "High" in database
    }
}
