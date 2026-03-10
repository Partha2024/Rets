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
        if (_memory.TryGetValue(key, out T? memoryValue))
        {
            Console.WriteLine("Found in RAM");
            return memoryValue;
        }

        // 🥈 2. Try Redis
        var redisValue = await _redis.StringGetAsync(key);
        if (!redisValue.IsNullOrEmpty)
        {
          Console.WriteLine("Found in Redis");
            var deserialized = JsonSerializer.Deserialize<T>(redisValue!, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            // populate memory cache
            _memory.Set(key, deserialized, TimeSpan.FromMinutes(5));

            return deserialized;
        }

        return default;
    }

    public async Task SetAsync<T>(string key, T value, TimeSpan expiry)
    {
        var json = JsonSerializer.Serialize(value, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });
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

    public async Task ClearAllAsync()
    {
        await _redis.KeyDeleteAsync("WorkoutSessions");
        await _redis.KeyDeleteAsync("Splits");
        _memory.Remove("WorkoutSessions");
        _memory.Remove("Splits");
    }
}