using System.ComponentModel.DataAnnotations;

namespace Rets_API.Models
{
  public class Exercise
  {
    [Key]
    public required string ExerciseId  { get; set; }
    public required string ExerciseName  { get; set; }
    public required string ExerciseImage { get; set; }
    public required string ExerciseType  { get; set; }
    public required string MuscleGroup  { get; set; }
    public required string PrimaryMuscle { get; set; }
    public required List<SplitExercise> SplitExercises { get; set; }
  }
}
