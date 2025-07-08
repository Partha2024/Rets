using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rets_API.Data;
using Rets_API.Models;

namespace Rets_API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ExerciseController : ControllerBase
  {
    private readonly ApplicationDbContext _context;

    public ExerciseController(ApplicationDbContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Exercise>>> GetExercises()
    {
      var exercises = await _context.Exercises.ToListAsync();
      return Ok(exercises);
    }
    
    [HttpGet("{Exercise_id}")]
      public async Task<ActionResult<Exercise>> GetExercise(string Exercise_id)
      {
          var exercise = await _context.Exercises.FindAsync(Exercise_id);

          if (exercise == null)
              return NotFound();

          return Ok(exercise);
      }

  }

}