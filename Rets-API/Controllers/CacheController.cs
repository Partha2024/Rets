using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Rets_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CacheController : ControllerBase
    {
        private readonly ICacheService _cacheService;

        public CacheController(ICacheService cacheService)
        {
            _cacheService = cacheService;
        }

        [HttpDelete("clear")]
        public async Task<IActionResult> ClearCache()
        {
            await _cacheService.ClearAllAsync();
            return Ok(new { message = "Cache cleared successfully." });
        }
    }
}
