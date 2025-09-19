using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models
{
    public class Subtask
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public bool IsCompleted { get; set; } = false;

        public int Order { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Foreign key to TodoTask
        [Required]
        public int TodoTaskId { get; set; }
        
        public TodoTask TodoTask { get; set; } = null!;
    }
}
