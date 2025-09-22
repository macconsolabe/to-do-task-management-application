using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApp.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Entity Framework
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Data Source=data/ezratask.db";
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseSqlite(connectionString));

// Add AI Service (only if enabled)
var enableAI = builder.Configuration.GetValue<bool>("EnableAI", false);
if (enableAI)
{
    builder.Services.AddScoped<IAIService, AIService>();
    Console.WriteLine("🤖 AI Assistant (Ezra) enabled");
}
else
{
    Console.WriteLine("ℹ️  AI Assistant disabled (set EnableAI=true to enable)");
}

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "http://localhost:5173", "http://localhost:5174")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection(); // Disabled for development
app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

// Ensure database is created
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<TodoContext>();
    context.Database.EnsureCreated();
}

app.Run();
