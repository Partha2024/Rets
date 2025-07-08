using System.Collections.Generic;

namespace Rets_API.Dtos
{
  public class SplitDto
  {
    // public required string Split_name { get; set; }
    // public string? Default_day { get; set; } // e.g., "Monday"
    // public List<string> Exercise_ids { get; set; } = new();
    public int SplitId { get; set; }
    public required string SplitName { get; set; }
    public required string DefaultDay { get; set; }
    public required List<string> ExerciseIds { get; set; }
  }
}