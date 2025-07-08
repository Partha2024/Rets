using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace Rets_API.Models
{
  public class ExerciseLog
  {
    [Key]
    public int LogId { get; set; }
    [ForeignKey("WorkoutSession")]
    public int SessionId { get; set; }
    public WorkoutSession WorkoutSession { get; set; }
    [ForeignKey("Exercise")]
    public string? ExerciseId { get; set; }
    public Exercise Exercise { get; set; }
    public int SetNumber { get; set; }
    public int? Reps { get; set; }
    public float? Weight { get; set; }
    public int? TimeInSeconds { get; set; }
  }

}
