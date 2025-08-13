using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rets_API.Models;
using Rets_API.Data;
using System.Diagnostics;
using Microsoft.Extensions.Caching.Memory;

namespace Rets_API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class WorkoutSessionController : ControllerBase
  {
    private readonly ApplicationDbContext _context;
    private readonly IMemoryCache _cache;

    public WorkoutSessionController(ApplicationDbContext context, IMemoryCache cache)
    {
      _context = context;
      _cache = cache;
    }

    [HttpGet("getAllWorkoutSessions")]
    public async Task<IActionResult> GetWorkoutSessions()
    {
      if (_cache.TryGetValue("WorkoutSessions", out var cachedSessions))
      {
        Console.WriteLine("[GetWorkoutSessions] Returned from cache ✅");
        return Ok(cachedSessions);
      }

      var sessions = await _context.WorkoutSessions
          .Include(ws => ws.Split)
          .Include(ws => ws.ExerciseLogs)
          .ThenInclude(el => el.Exercise)
          .OrderByDescending(ws => ws.SessionId)
          .ToListAsync();

      var result = sessions.Select(session => new
      {
        SessionId = session.SessionId,
        StartTime = session.StartTime,
        Split = new
        {
          session.Split.SplitId,
          session.Split.SplitName,
          session.Split.DefaultDay
        },
        ExerciseLogs = session.ExerciseLogs.Select(log => new
        {
          log.LogId,
          log.ExerciseId,
          ExerciseName = log.Exercise?.ExerciseName,
          log.SetNumber,
          log.Reps,
          log.Weight,
          log.TimeInSeconds
        })
      });

      _cache.Set("WorkoutSessions", result, TimeSpan.FromMinutes(10));
      Console.WriteLine("[GetWorkoutSessions] Cached result ✅");

      return Ok(result);
    }

    [HttpGet("getLastWorkoutSession/{splitId}")]
    public async Task<IActionResult> GetLastWorkoutSession(int splitId)
    {
      var lastSession = await _context.WorkoutSessions
        .Where(ws => ws.SplitId == splitId)
        .OrderByDescending(ws => ws.StartTime)
        .Include(ws => ws.ExerciseLogs)
          .ThenInclude(el => el.Exercise)
        .FirstOrDefaultAsync();

      if (lastSession == null)
      {
        return Ok(null);
      }

      var orderedLogs = lastSession.ExerciseLogs
        .OrderBy(log =>
            _context.SplitExercises
                .Where(se => se.SplitId == splitId && se.ExerciseId == log.ExerciseId)
                .Select(se => se.SortOrder)
                .FirstOrDefault()
        )
        .ThenBy(log => log.SetNumber) // optional, for within-exercise order
        .ToList();

      var result = new
      {
        lastSession.SessionId,
        lastSession.SplitId,
        lastSession.StartTime,
        ExerciseLogs = lastSession.ExerciseLogs.Select(log => new
        // ExerciseLogs = orderedLogs.Select(log => new
        {
          log.LogId,
          log.ExerciseId,
          log.Exercise.ExerciseName,
          log.SetNumber,
          log.Reps,
          log.Weight,
          log.TimeInSeconds
        }).ToList()
      };
      return Ok(result);
    }

    [HttpPost("createSession")]
    public async Task<IActionResult> CreateWorkout([FromBody] WorkoutSessionDto sessionDto)
    {
      var session = new WorkoutSession
      {
        SplitId = sessionDto.SplitId,
        StartTime = sessionDto.StartTime,
        ExerciseLogs = sessionDto.ExerciseLogs.Select(log => new ExerciseLog
        {
          ExerciseId = log.ExerciseId,
          SetNumber = log.SetNumber,
          Reps = log.Reps,
          Weight = log.Weight,
          TimeInSeconds = log.TimeInSeconds
        }).ToList()
      };

      _context.WorkoutSessions.Add(session);
      await _context.SaveChangesAsync();
      _cache.Remove("WorkoutSessions");

      return Ok(session.SessionId);
    }

    [HttpDelete("deleteWorkoutSession/{sessionId}")]
    public IActionResult DeleteWorkoutSession(int sessionId)
    {
      _ = Task.Run(async () => await DeleteWorkoutSessionAsync(sessionId));
      return Ok(new { message = "Split created successfully!" });
    }
    private async Task DeleteWorkoutSessionAsync(int sessionId)
    {
      try
      {
        var workoutSession = await _context.WorkoutSessions
          .Include(ws => ws.ExerciseLogs)
          .FirstOrDefaultAsync(ws => ws.SessionId == sessionId);

        if (workoutSession == null)
        {
          Console.WriteLine($"Workout Session with ID {sessionId} not found.");
          return;
          // return NotFound(new { message = $"Workout Session with ID {sessionId} not found." });
        }
        _context.ExerciseLogs.RemoveRange(workoutSession.ExerciseLogs);
        _context.WorkoutSessions.Remove(workoutSession);
        _cache.Remove("WorkoutSessions");
        await _context.SaveChangesAsync();
        // return Ok(new { message = $"Workout Session with ID {sessionId} and its logs deleted successfully." });
        Console.WriteLine($"Workout Session with ID {sessionId} and its logs deleted successfully.");
      }
      catch (Exception ex)
      {
        Console.WriteLine($"DeleteWorkoutSession exception: {ex.Message}");
        _cache.Remove("WorkoutSessions");
        // return StatusCode(500, new { error = ex.Message });
      }
    }
  }
}