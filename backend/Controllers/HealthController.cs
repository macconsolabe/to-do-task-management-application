using Microsoft.AspNetCore.Mvc;
using TodoApi.Data;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        private readonly TodoContext _context;

        public HealthController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<object> GetHealth()
        {
            try
            {
                // Test database connection
                var canConnect = _context.Database.CanConnect();
                var taskCount = _context.TodoTasks.Count();

                return Ok(new
                {
                    status = "healthy",
                    timestamp = DateTime.UtcNow,
                    database = new
                    {
                        connected = canConnect,
                        taskCount = taskCount
                    },
                    version = "1.0.0"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    status = "unhealthy",
                    timestamp = DateTime.UtcNow,
                    error = ex.Message
                });
            }
        }
    }
}
