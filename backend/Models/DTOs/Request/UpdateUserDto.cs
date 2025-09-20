using System.ComponentModel.DataAnnotations;

namespace TodoApp.Models.DTOs.Request
{
    public class UpdateUserDto
    {
        [StringLength(100, ErrorMessage = "Name must be less than 100 characters")]
        public string? Name { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email format")]
        [StringLength(255, ErrorMessage = "Email must be less than 255 characters")]
        public string? Email { get; set; }

        [StringLength(20, ErrorMessage = "Phone number must be less than 20 characters")]
        public string? PhoneNumber { get; set; }

        [StringLength(255, ErrorMessage = "Avatar URL must be less than 255 characters")]
        public string? AvatarUrl { get; set; }
    }
}
