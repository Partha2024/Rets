using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rets_API.Models;
using Rets_API.Dtos;
using Rets_API.Data;
using Microsoft.Extensions.Caching.Memory;

namespace Rets_API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class SplitsController : ControllerBase
  {
    private readonly ApplicationDbContext _context;
    private readonly IMemoryCache _cache;

    public SplitsController(ApplicationDbContext context, IMemoryCache cache)
    {
      _context = context;
      _cache = cache;
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
      if (_cache.TryGetValue("Splits", out var allSplits))
      {
        var warmup = _context.Splits
        .Include(s => s.SplitExercises)
        .ThenInclude(se => se.Exercise)
        .FirstOrDefaultAsync(s => s.SplitId == id);

        Console.WriteLine($"inside All Spilts Cache ✅");
        var cachedSplit = ((IEnumerable<SplitDto>)allSplits).FirstOrDefault(s => s.SplitId == id);
        Console.WriteLine($"[GetSplit] Returned from cache for ID: {id} ✅");
        return Ok(cachedSplit);
      }

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
      if (_cache.TryGetValue("Splits", out var allSplits))
      {
        Console.WriteLine("[All Splits] Returned from cache ✅");
        return Ok(allSplits);
      }

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

      _cache.Set("Splits", dtos, TimeSpan.FromMinutes(10));
      Console.WriteLine("[Splits] Cached result ✅");

      return Ok(dtos);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSplit(int id)
    {
      try
      {
        await _context.Database.ExecuteSqlRawAsync("SELECT 1");
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
        _cache.Remove("Splits");
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