using Microsoft.Extensions.Caching.Memory;
using StackExchange.Redis;
using System.Text.Json;

public class HybridCacheService : ICacheService
{
    private readonly IMemoryCache _memory;
    private readonly IDatabase _redis;

    public HybridCacheService(IMemoryCache memory, IConnectionMultiplexer redis)
    {
        _memory = memory;
        _redis = redis.GetDatabase();
    }

    public async Task<T?> GetAsync<T>(string key)
    {
        // 🥇 1. Try Memory Cache
        if (_memory.TryGetValue(key, out T memoryValue))
        {
            return memoryValue;
        }

        // 🥈 2. Try Redis
        var redisValue = await _redis.StringGetAsync(key);
        if (!redisValue.IsNullOrEmpty)
        {
            var deserialized = JsonSerializer.Deserialize<T>(redisValue!);

            // populate memory cache
            _memory.Set(key, deserialized, TimeSpan.FromMinutes(5));

            return deserialized;
        }

        return default;
    }

    public async Task SetAsync<T>(string key, T value, TimeSpan? expiry = null)
    {
        var json = JsonSerializer.Serialize(value);

        // set in Redis
        await _redis.StringSetAsync(key, json, (Expiration)expiry);

        // set in Memory
        _memory.Set(key, value, TimeSpan.FromMinutes(5));
    }

    public async Task RemoveAsync(string key)
    {
        await _redis.KeyDeleteAsync(key);
        _memory.Remove(key);
    }
}