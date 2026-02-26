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
    private readonly ICacheService _cacheService;

    public WorkoutSessionController(ApplicationDbContext context, IMemoryCache cache, ICacheService cacheService)
    {
      _context = context;
      _cache = cache;
      _cacheService = cacheService;
    }

    // [HttpGet("getAllWorkoutSessions")]
    // public async Task<IActionResult> GetWorkoutSessions()
    // {
    //   if (_cache.TryGetValue("WorkoutSessions", out var cachedSessions))
    //   {
    //     Console.WriteLine("[GetWorkoutSessions] Returned from cache ✅");
    //     return Ok(cachedSessions);
    //   }
    //   var sessions = await _context.WorkoutSessions
    //       .Include(ws => ws.Split)
    //       .Include(ws => ws.ExerciseLogs)
    //       .ThenInclude(el => el.Exercise)
    //       .OrderByDescending(ws => ws.SessionId)
    //       .ToListAsync();
    //   var result = sessions.Select(session => new
    //   {
    //     SessionId = session.SessionId,
    //     StartTime = session.StartTime,
    //     Split = new
    //     {
    //       session.Split.SplitId,
    //       session.Split.SplitName,
    //       session.Split.DefaultDay
    //     },
    //     ExerciseLogs = session.ExerciseLogs.Select(log => new
    //     {
    //       log.LogId,
    //       log.ExerciseId,
    //       ExerciseName = log.Exercise?.ExerciseName,
    //       log.SetNumber,
    //       log.Reps,
    //       log.Weight,
    //       log.TimeInSeconds
    //     })
    //   });
    //   _cache.Set("WorkoutSessions", result, TimeSpan.FromMinutes(10));
    //   Console.WriteLine("[GetWorkoutSessions] Cached result ✅");
    //   return Ok(result);
    // }

    [HttpGet("getAllWorkoutSessions")]
    public async Task<IActionResult> GetWorkoutSessions()
    {
        string key = "WorkoutSessions";
        var cached = await _cacheService.GetAsync<object>(key);
        if (cached != null)
        {
            _ = Task.Run(async () =>
            {
                var fresh = await GetWorkoutSessionsFromDb();
                await _cacheService.SetAsync(key, fresh, TimeSpan.FromDays(2));
            });
            return Ok(cached);
        }

        var data = await GetWorkoutSessionsFromDb();
        await _cacheService.SetAsync(key, data, TimeSpan.FromDays(2));

        return Ok(data);
    }

    private async Task<object> GetWorkoutSessionsFromDb()
    {
      return await _context.WorkoutSessions
      .OrderByDescending(ws => ws.SessionId)
      .Select(session => new
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
              ExerciseName = log.Exercise.ExerciseName,
              log.SetNumber,
              log.Reps,
              log.Weight,
              log.TimeInSeconds
          }).ToList()
      })
      .ToListAsync();
    }

    // [HttpGet("getLastWorkoutSession/{splitId}")]
    // public async Task<IActionResult> GetLastWorkoutSession(int splitId)
    // {
    //   var lastSession = await _context.WorkoutSessions
    //     .Where(ws => ws.SplitId == splitId)
    //     .OrderByDescending(ws => ws.StartTime)
    //     .Include(ws => ws.ExerciseLogs)
    //       .ThenInclude(el => el.Exercise)
    //     .FirstOrDefaultAsync();
    //   if (lastSession == null)
    //   {
    //     return Ok(null);
    //   }
    //   var orderedLogs = lastSession.ExerciseLogs
    //     .OrderBy(log =>
    //         _context.SplitExercises
    //             .Where(se => se.SplitId == splitId && se.ExerciseId == log.ExerciseId)
    //             .Select(se => se.SortOrder)
    //             .FirstOrDefault()
    //     )
    //     .ThenBy(log => log.SetNumber) // optional, for within-exercise order
    //     .ToList();
    //   var result = new
    //   {
    //     lastSession.SessionId,
    //     lastSession.SplitId,
    //     lastSession.StartTime,
    //     ExerciseLogs = lastSession.ExerciseLogs.Select(log => new
    //     // ExerciseLogs = orderedLogs.Select(log => new
    //     {
    //       log.LogId,
    //       log.ExerciseId,
    //       log.Exercise.ExerciseName,
    //       log.SetNumber,
    //       log.Reps,
    //       log.Weight,
    //       log.TimeInSeconds
    //     }).ToList()
    //   };
    //   return Ok(result);
    // }

    [HttpGet("getLastWorkoutSession/{splitId}")]
    public async Task<IActionResult> GetLastWorkoutSession(int splitId)
    {
      string key = $"LastWorkoutSession_{splitId}";
      var cached = await _cacheService.GetAsync<object>(key);
      if (cached != null)
      {
          return Ok(cached);
      }
      var result = await GetLastSessionFromDb(splitId);
      await _cacheService.SetAsync(key, result, TimeSpan.FromDays(2));
      return Ok(result);
    }

    private async Task<object?> GetLastSessionFromDb(int splitId)
    {
        return await _context.WorkoutSessions
          .Where(ws => ws.SplitId == splitId)
          .OrderByDescending(ws => ws.StartTime)
          .Select(ws => new
          {
              ws.SessionId,
              ws.SplitId,
              ws.StartTime,

              ExerciseLogs = ws.ExerciseLogs
              .Select(log => new
              {
                  log.LogId,
                  log.ExerciseId,
                  log.Exercise.ExerciseName,
                  log.SetNumber,
                  log.Reps,
                  log.Weight,
                  log.TimeInSeconds,

                  SortOrder = _context.SplitExercises
                      .Where(se => se.SplitId == splitId && se.ExerciseId == log.ExerciseId)
                      .Select(se => se.SortOrder)
                      .FirstOrDefault()
              })
              .OrderBy(x => x.SortOrder)
              .ThenBy(x => x.SetNumber)
              .Select(x => new
              {
                  x.LogId,
                  x.ExerciseId,
                  x.ExerciseName,
                  x.SetNumber,
                  x.Reps,
                  x.Weight,
                  x.TimeInSeconds
              })
              .ToList()
          }).FirstOrDefaultAsync();
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
      await _cacheService.RemoveAsync("WorkoutSessions");
      return Ok(session.SessionId);
    }

    [HttpDelete("deleteWorkoutSession/{sessionId}")]
    public async Task<IActionResult> DeleteWorkoutSession(int sessionId)
    {
      try
      {
        var workoutSession = await _context.WorkoutSessions
            .Include(ws => ws.ExerciseLogs)
            .FirstOrDefaultAsync(ws => ws.SessionId == sessionId);

        if (workoutSession == null)
        {
          return NotFound(new { message = $"Workout Session with ID {sessionId} not found." });
        }

        _context.ExerciseLogs.RemoveRange(workoutSession.ExerciseLogs);
        _context.WorkoutSessions.Remove(workoutSession);
        await _context.SaveChangesAsync();

        await _cacheService.RemoveAsync("WorkoutSessions");

        return Ok(new { message = $"Workout Session with ID {sessionId} and its logs deleted successfully." });
      }
      catch (Exception ex)
      {
        // Log ex
        await _cacheService.RemoveAsync("WorkoutSessions");
        return StatusCode(500, new { error = ex.Message });
      }
    }
  }
}