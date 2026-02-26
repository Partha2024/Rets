using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

namespace Rets_API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class TestController : ControllerBase
  {
    private readonly IConnectionMultiplexer _redis;
    public TestController(IConnectionMultiplexer redis)
    {
        _redis = redis;
    }

    [HttpGet("test-redis")]
    public async Task<IActionResult> TestRedis()
    {
        var db = _redis.GetDatabase();

        await db.StringSetAsync("test-key", "hello bro 😎");
        var value = await db.StringGetAsync("test-key");

        return Ok(value.ToString());
    }
  }
}