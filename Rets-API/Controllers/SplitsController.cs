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

    [HttpPost("create")]
    public async Task<IActionResult> CreateSplit([FromBody] SplitDto splitDto)
    {
      var split = new Split
      {
        SplitName = splitDto.SplitName,
        DefaultDay = splitDto.DefaultDay,
        SplitExercises = splitDto.ExerciseIds.Select(e => new SplitExercise
        {
          ExerciseId = e.ExerciseId,
          SortOrder = e.SortOrder
        }).ToList()
      };
      Console.WriteLine($"[CreateSplit] Split created with name: {split} ✅");
      _context.Splits.Add(split);
      await _context.SaveChangesAsync();

      var response = new SplitDto
      {
        SplitId = split.SplitId,
        SplitName = split.SplitName,
        DefaultDay = split.DefaultDay,
        ExerciseIds = split.SplitExercises
              .OrderBy(se => se.SortOrder)
              .Select(se => new SplitExerciseOrderDto
              {
                ExerciseId = se.ExerciseId,
                SortOrder = se.SortOrder
              }).ToList()
      };
      _cache.Remove("Splits");
      return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSplit(int id)
    {
      if (_cache.TryGetValue("Splits", out var allSplits))
      {
        Console.WriteLine($"[GetSplit] Inside cache ✅");
        var cachedSplit = ((IEnumerable<SplitDto>)allSplits)
            .FirstOrDefault(s => s.SplitId == id);
        if (cachedSplit != null)
        {
          Console.WriteLine($"[GetSplit] Returned from cache for ID: {id} ✅");
          return Ok(cachedSplit);
        }
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
        ExerciseIds  = split.SplitExercises
              .OrderBy(se => se.SortOrder) // Keep exercises in correct order
              .Select(se => new SplitExerciseOrderDto
              {
                ExerciseId = se.ExerciseId, // int to int — no mismatch
                SortOrder = se.SortOrder
              }).ToList()
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
          .ThenInclude(se => se.Exercise)
          .ToListAsync();

      var dtos = splits.Select(split => new SplitDto
      {
        SplitId = split.SplitId,
        SplitName = split.SplitName,
        DefaultDay = split.DefaultDay,
        ExerciseIds = split.SplitExercises
              .OrderBy(se => se.SortOrder) // keep order consistent
              .Select(se => new SplitExerciseOrderDto
              {
                ExerciseId = se.ExerciseId,
                SortOrder = se.SortOrder
              }).ToList()
      }).ToList();

      _cache.Set("Splits", dtos, TimeSpan.FromMinutes(10));
      Console.WriteLine("[Splits] Cached result ✅");

      return Ok(dtos);
    }

    [HttpDelete("delete/{id}")]
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
        await _context.SaveChangesAsync();
        _cache.Remove("Splits");
        return Ok(new { message = $"Split with ID {id} deleted successfully." });
      }
      catch (Exception ex)
      {
        Console.WriteLine($"DeleteSplit exception: {ex.Message}");
        return StatusCode(500, new { error = ex.Message });
      }
    }

    [HttpPost("update/{split_id}")]
    public async Task<IActionResult> UpdateSplit([FromBody] SplitDto splitDto, int split_id)
    {
      var existingSplit = await _context.Splits
          .Include(s => s.SplitExercises)
          .FirstOrDefaultAsync(s => s.SplitId == split_id);

      if (existingSplit == null)
      {
        return NotFound($"Split with ID {split_id} not found.");
      }

      existingSplit.SplitName = splitDto.SplitName;
      existingSplit.DefaultDay = splitDto.DefaultDay;

      _context.SplitExercises.RemoveRange(existingSplit.SplitExercises);

      existingSplit.SplitExercises = splitDto.ExerciseIds.Select(e => new SplitExercise
      {
        SplitId = split_id,
        ExerciseId = e.ExerciseId,
        SortOrder = e.SortOrder
      }).ToList();

      await _context.SaveChangesAsync();
      _cache.Remove("Splits");

      var response = new SplitDto
      {
        SplitId = existingSplit.SplitId,
        SplitName = existingSplit.SplitName,
        DefaultDay = existingSplit.DefaultDay,
        ExerciseIds = existingSplit.SplitExercises
              .OrderBy(se => se.SortOrder)
              .Select(se => new SplitExerciseOrderDto
              {
                ExerciseId = se.ExerciseId,
                SortOrder = se.SortOrder
              }).ToList()
      };
      return Ok(response);
    }
  }
}