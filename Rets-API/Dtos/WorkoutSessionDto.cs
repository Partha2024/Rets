public class WorkoutSessionDto {
    public int SplitId { get; set; }
    public DateTime StartTime { get; set; }
    public List<ExerciseLogDto> ExerciseLogs { get; set; }
}