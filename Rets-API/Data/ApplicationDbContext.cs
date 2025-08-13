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
    public DbSet<SplitExercise> SplitExercises { get; set; }

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

      // Always order exercises in a split by 'Order'
      modelBuilder.Entity<Split>()
        .Navigation(s => s.SplitExercises)
        .UsePropertyAccessMode(PropertyAccessMode.Property);

      // Optionally configure default value for 'Order'
      modelBuilder.Entity<SplitExercise>()
        .Property(se => se.SortOrder)
        .HasDefaultValue(0);
    }
  }
}
