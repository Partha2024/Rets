namespace Rets_API.Dtos
{
  public class SplitDto
  {
    public int SplitId { get; set; }
    public required string SplitName { get; set; }
    public required string DefaultDay { get; set; }
    public required List<SplitExerciseOrderDto> ExerciseIds { get; set; }
  }
}