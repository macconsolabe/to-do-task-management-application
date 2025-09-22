using System.ComponentModel.DataAnnotations;

namespace TodoApp.Models.DTOs.AI
{
    public class AIChatRequestDto
    {
        [Required]
        public string Message { get; set; } = string.Empty;
        
        public int? UserId { get; set; }
        
        // For maintaining conversation context
        public List<ChatMessage>? ConversationHistory { get; set; }
    }

    public class AIChatResponseDto
    {
        public string Response { get; set; } = string.Empty;
        
        // If the AI has parsed a task from the conversation
        public ParsedTaskDto? ParsedTask { get; set; }
        
        // Indicates what the AI is waiting for
        public string? WaitingFor { get; set; }
        
        // Indicates if the task is ready to be created
        public bool IsTaskReady { get; set; }
    }

    public class ChatMessage
    {
        public string Role { get; set; } = string.Empty; // "user" or "assistant"
        public string Content { get; set; } = string.Empty;
    }

    public class ParsedTaskDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = "Todo";
        public string Priority { get; set; } = "Medium";
        public DateTime? DueDate { get; set; }
        public List<string> Subtasks { get; set; } = new List<string>();
    }

    public class CreateTaskFromAIDto
    {
        [Required]
        public ParsedTaskDto Task { get; set; } = new ParsedTaskDto();
        
        [Required]
        public int UserId { get; set; }
    }
}
