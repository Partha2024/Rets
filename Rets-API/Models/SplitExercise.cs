using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Rets_API.Models
{
  public class SplitExercise
  {
    [Key]
    public int Id { get; set; }
    [ForeignKey("Split")]
    public int SplitId { get; set; }
    public Split? Split { get; set; }
    [ForeignKey("Exercise")]
    public required string ExerciseId { get; set; }
    public Exercise? Exercise { get; set; }
  }
}