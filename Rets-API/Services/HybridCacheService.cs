using Microsoft.Extensions.Caching.Memory;
using StackExchange.Redis;
using System.Text.Json;

public class HybridCacheService : ICacheService
{
  private readonly IMemoryCache _memory;
  private readonly IDatabase _redis;

  private const string _registryKey = "cache_registry";
  private static readonly TimeSpan _memoryTtl = TimeSpan.FromMinutes(5);

  private static readonly JsonSerializerOptions _readOptions = new()
  {
    PropertyNameCaseInsensitive = true
  };

  private static readonly JsonSerializerOptions _writeOptions = new()
  {
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
  };

  public HybridCacheService(IMemoryCache memory, IConnectionMultiplexer redis)
  {
    _memory = memory;
    _redis = redis.GetDatabase();
  }

  // Fetch: Memory → Redis → (caller handles DB fallback)
  public async Task<T?> GetAsync<T>(string key)
  {
    if (_memory.TryGetValue(key, out T? memoryValue))
    {
      // Console.WriteLine("💾 Found in RAM");
      return memoryValue;
    }

    var redisValue = await _redis.StringGetAsync(key);
    if (!redisValue.IsNullOrEmpty)
    {
      // Console.WriteLine("💽 Found in Redis");
      var deserialized = JsonSerializer.Deserialize<T>(redisValue!, _readOptions);

      _memory.Set(key, deserialized, _memoryTtl);
      return deserialized;
    }

    return default;
  }

  public async Task SetAsync<T>(string key, T value, TimeSpan expiry)
  {
    var json = JsonSerializer.Serialize(value, _writeOptions);

    await _redis.StringSetAsync(key, json, expiry);
    await _redis.SetAddAsync(_registryKey, key);
    _memory.Set(key, value, _memoryTtl);
  }

  public async Task RemoveAsync(string key)
  {
    await _redis.KeyDeleteAsync(key);
    await _redis.SetRemoveAsync(_registryKey, key);
    _memory.Remove(key);
  }

  public async Task ClearAllAsync()
  {
    // Console.WriteLine("Clearing all cache entries...");
    var members = await _redis.SetMembersAsync(_registryKey);

    if (members.Length > 0)
    {
      var stringKeys = members
          .Select(m => (string?)m)
          .Where(k => k is not null)
          .Select(k => k!)
          .ToArray();

      var keysToDelete = stringKeys
          .Select(k => (RedisKey)k)
          .Append(_registryKey)
          .ToArray();

      await _redis.KeyDeleteAsync(keysToDelete);

      foreach (var key in stringKeys)
      {
        _memory.Remove(key);
      }
    }
  }
}