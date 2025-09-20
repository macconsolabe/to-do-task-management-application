using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApp.Models.Entities;
using TodoApp.Models.DTOs.Request;
using TodoApp.Models.DTOs.Response;
using TodoApp.Extensions;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly TodoContext _context;

        public UsersController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserResponseDto>>> GetUsers()
        {
            var users = await _context.Users.Include(u => u.Tasks).ToListAsync();
            return users.Select(u => u.ToResponseDto()).ToList();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponseDto>> GetUser(int id)
        {
            var user = await _context.Users.Include(u => u.Tasks).FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return user.ToResponseDto();
        }

        // GET: api/Users/current (for getting the current user - simplified for now)
        [HttpGet("current")]
        public async Task<ActionResult<UserResponseDto>> GetCurrentUser()
        {
            // For now, return the first user or null
            // In a real app, this would be based on authentication
            var user = await _context.Users.Include(u => u.Tasks).FirstOrDefaultAsync();
            
            if (user == null)
            {
                return NotFound(new { message = "No user found. Please complete onboarding." });
            }

            return user.ToResponseDto();
        }

        // GET: api/Users/by-email/{email}
        [HttpGet("by-email/{email}")]
        public async Task<ActionResult<UserResponseDto>> GetUserByEmail(string email)
        {
            var user = await _context.Users.Include(u => u.Tasks).FirstOrDefaultAsync(u => u.Email == email);
            
            if (user == null)
            {
                return NotFound(new { message = "User not found with this email." });
            }

            return user.ToResponseDto();
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<UserResponseDto>> CreateUser(CreateUserDto createUserDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if email already exists
            if (await _context.Users.AnyAsync(u => u.Email == createUserDto.Email))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            var user = createUserDto.ToEntity();
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var responseDto = user.ToResponseDto();
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, responseDto);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<ActionResult<UserResponseDto>> UpdateUser(int id, UpdateUserDto updateUserDto)
        {
            var user = await _context.Users.Include(u => u.Tasks).FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            // Check if email already exists for another user
            if (!string.IsNullOrEmpty(updateUserDto.Email) && 
                await _context.Users.AnyAsync(u => u.Email == updateUserDto.Email && u.Id != id))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            // Apply updates using extension method
            user.ApplyUpdate(updateUserDto);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return user.ToResponseDto();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
