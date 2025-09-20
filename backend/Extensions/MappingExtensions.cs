using TodoApp.Models.Entities;
using TodoApp.Models.DTOs.Request;
using TodoApp.Models.DTOs.Response;

namespace TodoApp.Extensions
{
    public static class MappingExtensions
    {
        // User Entity to Response DTO
        public static UserResponseDto ToResponseDto(this User user)
        {
            return new UserResponseDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                AvatarUrl = user.AvatarUrl,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                TaskCount = user.Tasks?.Count ?? 0
            };
        }

        // TodoTask Entity to Response DTO
        public static TodoTaskResponseDto ToResponseDto(this TodoTask task)
        {
            return new TodoTaskResponseDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                Status = task.Status,
                Priority = task.Priority,
                DueDate = task.DueDate,
                CreatedAt = task.CreatedAt,
                UpdatedAt = task.UpdatedAt,
                ManualProgress = task.ManualProgress,
                UserId = task.UserId,
                Subtasks = task.Subtasks?.Select(s => s.ToResponseDto()).ToList() ?? new List<SubtaskResponseDto>()
            };
        }

        // Subtask Entity to Response DTO
        public static SubtaskResponseDto ToResponseDto(this Subtask subtask)
        {
            return new SubtaskResponseDto
            {
                Id = subtask.Id,
                Title = subtask.Title,
                IsCompleted = subtask.IsCompleted,
                Order = subtask.Order,
                CreatedAt = subtask.CreatedAt,
                UpdatedAt = subtask.UpdatedAt,
                TodoTaskId = subtask.TodoTaskId
            };
        }

        // CreateUserDto to User Entity
        public static User ToEntity(this CreateUserDto dto)
        {
            return new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                AvatarUrl = dto.AvatarUrl,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
        }

        // Apply UpdateUserDto to User Entity
        public static void ApplyUpdate(this User user, UpdateUserDto dto)
        {
            if (!string.IsNullOrEmpty(dto.Name))
                user.Name = dto.Name;
            
            if (!string.IsNullOrEmpty(dto.Email))
                user.Email = dto.Email;
            
            if (dto.PhoneNumber != null)
                user.PhoneNumber = dto.PhoneNumber;
            
            if (dto.AvatarUrl != null)
                user.AvatarUrl = dto.AvatarUrl;
            
            user.UpdatedAt = DateTime.UtcNow;
        }
    }
}
