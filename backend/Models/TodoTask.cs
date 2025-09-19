using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models
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
