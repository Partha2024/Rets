using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rets_API.Models;
using Rets_API.Dtos;
using Rets_API.Data;  

namespace Rets_API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class SplitsController : ControllerBase
  {
    private readonly ApplicationDbContext _context;

    public SplitsController(ApplicationDbContext context)
    {
      _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateSplit([FromBody] SplitDto splitDto)
    {
      var split = new Split
      {
        SplitName = splitDto.SplitName,
        DefaultDay = splitDto.DefaultDay,
        SplitExercises = splitDto.ExerciseIds.Select(eid => new SplitExercise
        {
          ExerciseId = eid
        }).ToList()
      };

      _context.Splits.Add(split);
      await _context.SaveChangesAsync();

      var response = new SplitDto
      {
        SplitId = split.SplitId,
        SplitName = split.SplitName,
        DefaultDay = split.DefaultDay,
        ExerciseIds = split.SplitExercises.Select(se => se.ExerciseId).ToList()
      };

      return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSplit(int id)
    {
      var split = await _context.Splits
        .Include(s => s.SplitExercises)
        .ThenInclude(se => se.Exercise)
        .FirstOrDefaultAsync(s => s.SplitId == id);

      if (split == null)
      {
        return NotFound(new { message = $"Split with ID: {id} not found." });
      }

      var dto = new SplitDto
      {
        SplitId = split.SplitId,
        SplitName = split.SplitName,
        DefaultDay = split.DefaultDay,
        ExerciseIds = split.SplitExercises.Select(se => se.ExerciseId).ToList()
      };

      return Ok(dto);
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetSplits()
    {
      var sw = System.Diagnostics.Stopwatch.StartNew();

      var splits = await _context.Splits
        .Include(s => s.SplitExercises)
        .ToListAsync();

      var dtos = splits.Select(split => new SplitDto
      {
        SplitId = split.SplitId,
        SplitName = split.SplitName,
        DefaultDay = split.DefaultDay,
        ExerciseIds = split.SplitExercises.Select(se => se.ExerciseId).ToList()
      }); 
      sw.Stop();
      Console.WriteLine($"🚀GetSplits: fetched in {sw.ElapsedMilliseconds} ms");
      return Ok(dtos);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSplit(int id)
    {
      try
      {
        var split = await _context.Splits
          .Include(s => s.SplitExercises)
          .FirstOrDefaultAsync(s => s.SplitId == id);

        if (split == null)
        {
          return NotFound(new { message = $"Split with ID {id} not found." });
        }
        _context.Splits.Remove(split);
        var sw = System.Diagnostics.Stopwatch.StartNew();
        await _context.SaveChangesAsync();
        sw.Stop();

        Console.WriteLine($"SaveChangesAsync took {sw.ElapsedMilliseconds} ms");
        return Ok(new { message = $"Split with ID {id} deleted successfully." });
      }
      catch (Exception ex)
      {
        Console.WriteLine($"DeleteSplit exception: {ex.Message}");
        return StatusCode(500, new { error = ex.Message });
      }
    }
  }
}