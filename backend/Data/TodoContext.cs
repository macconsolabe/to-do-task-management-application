using Microsoft.EntityFrameworkCore;
using TodoApp.Models.Entities;

namespace TodoApi.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {
        }

        public DbSet<TodoTask> TodoTasks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Subtask> Subtasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure TodoTask entity
            modelBuilder.Entity<TodoTask>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                
                // Store enums as strings in the database for better readability
                entity.Property(e => e.Status)
                      .IsRequired()
                      .HasConversion<string>();
                      
                entity.Property(e => e.Priority)
                      .IsRequired()
                      .HasConversion<string>();
                      
                entity.Property(e => e.ManualProgress).HasDefaultValue(0);
                entity.Property(e => e.CreatedAt).IsRequired();
                entity.Property(e => e.UpdatedAt).IsRequired();

                // Configure relationship with Subtasks
                entity.HasMany(e => e.Subtasks)
                      .WithOne()
                      .HasForeignKey(s => s.TodoTaskId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Configure User entity
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
                entity.Property(e => e.PhoneNumber).HasMaxLength(20);
                entity.Property(e => e.AvatarUrl).HasMaxLength(255);
                entity.Property(e => e.CreatedAt).IsRequired();
                entity.Property(e => e.UpdatedAt).IsRequired();
                entity.HasIndex(e => e.Email).IsUnique();

                // Configure relationship with TodoTasks
                entity.HasMany(e => e.Tasks)
                      .WithOne()
                      .HasForeignKey(t => t.UserId)
                      .OnDelete(DeleteBehavior.SetNull);
            });

            // Configure Subtask entity
            modelBuilder.Entity<Subtask>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.IsCompleted).IsRequired();
                entity.Property(e => e.Order).IsRequired();
                entity.Property(e => e.CreatedAt).IsRequired();
                entity.Property(e => e.UpdatedAt).IsRequired();
                entity.Property(e => e.TodoTaskId).IsRequired();

                // Configure relationship with TodoTask
                entity.HasOne(e => e.TodoTask)
                      .WithMany(t => t.Subtasks)
                      .HasForeignKey(e => e.TodoTaskId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
