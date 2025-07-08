using Microsoft.EntityFrameworkCore;
using Rets_API.Models;

namespace Rets_API.Data
{
  public class ApplicationDbContext : DbContext
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<Exercise> Exercises { get; set; }
    public DbSet<Split> Splits { get; set; }
    public DbSet<WorkoutSession> WorkoutSessions { get; set; }
    public DbSet<ExerciseLog> ExerciseLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<SplitExercise>()
        .HasKey(se => new { se.SplitId, se.ExerciseId });

      modelBuilder.Entity<SplitExercise>()
        .HasOne(se => se.Split)
        .WithMany(s => s.SplitExercises)
        .HasForeignKey(se => se.SplitId);

      modelBuilder.Entity<SplitExercise>()
        .HasOne(se => se.Exercise)
        .WithMany(e => e.SplitExercises)
        .HasForeignKey(se => se.ExerciseId);
        
      // One-to-Many Split ↔ WorkoutSession
      modelBuilder.Entity<WorkoutSession>()
          .HasOne(ws => ws.Split)
          .WithMany()
          .HasForeignKey(ws => ws.SplitId);

      // One-to-Many WorkoutSession ↔ ExerciseLog
      modelBuilder.Entity<ExerciseLog>()
          .HasOne(el => el.WorkoutSession)
          .WithMany(ws => ws.ExerciseLogs)
          .HasForeignKey(el => el.SessionId);

      // One-to-Many Exercise ↔ ExerciseLog
      modelBuilder.Entity<ExerciseLog>()
          .HasOne(el => el.Exercise)
          .WithMany()
          .HasForeignKey(el => el.ExerciseId);
    }
  }
}
