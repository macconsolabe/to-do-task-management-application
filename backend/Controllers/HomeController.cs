using Microsoft.AspNetCore.Mvc;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Index()
        {
            var html = @"
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>eTask API - Task Management Backend</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            background: #faf9f7;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            padding: 3rem;
            border-radius: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            text-align: center;
            max-width: 600px;
            margin: 2rem;
            border: 1px solid rgba(244, 196, 48, 0.1);
        }
        h1 {
            color: #333;
            margin-bottom: 1rem;
            font-size: 2.5rem;
            font-weight: 300;
        }
        .subtitle {
            color: #666;
            margin-bottom: 2rem;
            font-size: 1.1rem;
            font-weight: 300;
        }
        .logo {
            width: 60px;
            height: 60px;
            background: #F4C430;
            border-radius: 50%;
            margin: 0 auto 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
        }
        .links {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin: 2rem 0;
        }
        .link-card {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 12px;
            text-decoration: none;
            color: #333;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        .link-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            border-color: #F4C430;
        }
        .link-title {
            font-weight: 500;
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
            color: #F4C430;
        }
        .link-desc {
            font-size: 0.9rem;
            color: #666;
        }
        .status {
            background: rgba(244, 196, 48, 0.1);
            color: #333;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            border: 1px solid #F4C430;
            display: inline-block;
            margin: 1rem 0;
            font-weight: 400;
        }
        .footer {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 0.9rem;
        }
        @media (max-width: 600px) {
            .links {
                grid-template-columns: 1fr;
            }
            .container {
                padding: 2rem;
                margin: 1rem;
            }
            h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='logo'>🔧</div>
        <h1>eTask API</h1>
        <p class='subtitle'>Smart task management API built with .NET Core 8 and Entity Framework</p>
        
        <div class='status'>✅ API is running and healthy</div>
        
        <div class='links'>
            <a href='/swagger' class='link-card'>
                <div class='link-title'>📚 API Documentation</div>
                <div class='link-desc'>Interactive Swagger UI to explore and test all endpoints</div>
            </a>
            
            <a href='/api/health' class='link-card'>
                <div class='link-title'>❤️ Health Check</div>
                <div class='link-desc'>System status and database connectivity information</div>
            </a>
            
            <a href='/api/TodoTasks' class='link-card'>
                <div class='link-title'>📋 Tasks API</div>
                <div class='link-desc'>Direct access to the TodoTasks REST endpoint</div>
            </a>
            
            <a href='http://localhost:3000' class='link-card' target='_blank'>
                <div class='link-title'>🎨 Frontend App</div>
                <div class='link-desc'>React TypeScript frontend application</div>
            </a>
        </div>
        
        <div class='footer'>
            <strong>eTask - Built for Ezra Assessment</strong><br>
            Smart task management with .NET Core backend and React frontend
        </div>
    </div>
</body>
</html>";

            return Content(html, "text/html");
        }
    }
}
