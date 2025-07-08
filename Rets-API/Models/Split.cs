using System.ComponentModel.DataAnnotations;

namespace Rets_API.Models
{
  public class Split
  {

    [Key]
    public int SplitId { get; set; }
    public required string SplitName { get; set; }
    public string? DefaultDay { get; set; }
    public required List<SplitExercise> SplitExercises { get; set; }
  }
}