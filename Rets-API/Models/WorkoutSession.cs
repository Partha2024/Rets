using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Rets_API.Models
{
  public class WorkoutSession
  {
    [Key]
    public int SessionId { get; set; }

    [ForeignKey("Split")]
    public int SplitId { get; set; }

    public Split? Split { get; set; }

    public DateTime StartTime { get; set; }

    public required ICollection<ExerciseLog> ExerciseLogs { get; set; }
  }
}
