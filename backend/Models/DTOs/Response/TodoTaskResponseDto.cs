using TodoApp.Models.Entities;
using TaskStatus = TodoApp.Models.Entities.TaskStatus;

namespace TodoApp.Models.DTOs.Response
{
    public class TodoTaskResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public TaskStatus Status { get; set; }
        public TaskPriority Priority { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int ManualProgress { get; set; }
        public int? UserId { get; set; }
        
        // Include subtasks as response DTOs
        public List<SubtaskResponseDto> Subtasks { get; set; } = new List<SubtaskResponseDto>();
    }

    public class SubtaskResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
        public int Order { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int TodoTaskId { get; set; }
    }
}
