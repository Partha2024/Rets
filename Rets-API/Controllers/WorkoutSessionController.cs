using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rets_API.Models;
using Rets_API.Dtos;
using Rets_API.Data;
using System.Diagnostics;

namespace Rets_API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class WorkoutSessionController : ControllerBase
  {
    private readonly ApplicationDbContext _context;

    public WorkoutSessionController(ApplicationDbContext context)
    {
      _context = context;
    }

    // [HttpGet]
    // public async Task<IActionResult> GetWorkoutSessions()
    // {
    //   var sessions = await _context.WorkoutSessions
    //       .Include(ws => ws.Split)
    //       .Include(ws => ws.ExerciseLogs)
    //       .ThenInclude(el => el.Exercise)
    //       .OrderByDescending(ws => ws.StartTime)
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
    //   return Ok(result);
    // }

    [HttpGet("all")]
    public async Task<IActionResult> GetWorkoutSessions()
    {
      var sw = Stopwatch.StartNew();

      var sessions = await _context.WorkoutSessions
          .Include(ws => ws.Split)
          .Include(ws => ws.ExerciseLogs)
          .ThenInclude(el => el.Exercise)
          .OrderByDescending(ws => ws.StartTime)
          .ToListAsync();

      sw.Stop();
      Console.WriteLine($"[GetWorkoutSessions] Query Time🚀🚀🚀🚀🚀🚀🚀🚀🚀: {sw.ElapsedMilliseconds}ms");

      sw.Restart();

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

      sw.Stop();
      Console.WriteLine($"[GetWorkoutSessions] Mapping Time🚀🚀🚀🚀🚀🚀🚀: {sw.ElapsedMilliseconds}ms");

      return Ok(result);
    }

    // [HttpGet("last-session/{splitId}")]
    // public async Task<IActionResult> GetLastWorkoutSession(int splitId)
    // {
    //   var lastSession = await _context.WorkoutSessions
    //     .Where(ws => ws.SplitId == splitId)
    //     .OrderByDescending(ws => ws.StartTime)
    //     .Include(ws => ws.ExerciseLogs)
    //     .ThenInclude(el => el.Exercise)
    //     .FirstOrDefaultAsync();

    //   if (lastSession == null)
    //   {
    //     return NotFound(new { message = $"No workout session found for Split ID: {splitId}" });
    //   }

    //   var result = new
    //   {
    //     lastSession.SessionId,
    //     lastSession.SplitId,
    //     lastSession.StartTime,
    //     ExerciseLogs = lastSession.ExerciseLogs.Select(log => new
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

    [HttpGet("last-session/{splitId}")]
    public async Task<IActionResult> GetLastWorkoutSession(int splitId)
    {
      var sw = Stopwatch.StartNew();

      var lastSession = await _context.WorkoutSessions
        .Where(ws => ws.SplitId == splitId)
        .OrderByDescending(ws => ws.StartTime)
        .Include(ws => ws.ExerciseLogs)
        .ThenInclude(el => el.Exercise)
        .FirstOrDefaultAsync();

      sw.Stop();
      Console.WriteLine($"[GetLastWorkoutSession] Query Time🚀🚀🚀🚀🚀🚀🚀🚀🚀: {sw.ElapsedMilliseconds}ms");

      if (lastSession == null)
      {
        return NotFound(new { message = $"No workout session found for Split ID: {splitId}" });
      }

      sw.Restart();

      var result = new
      {
        lastSession.SessionId,
        lastSession.SplitId,
        lastSession.StartTime,
        ExerciseLogs = lastSession.ExerciseLogs.Select(log => new
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

      sw.Stop();
      Console.WriteLine($"[GetLastWorkoutSession] Mapping Time🚀🚀🚀🚀🚀🚀🚀🚀🚀: {sw.ElapsedMilliseconds}ms");

      return Ok(result);
    }

    [HttpPost]
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

      return Ok(session.SessionId);
    }
  }
}