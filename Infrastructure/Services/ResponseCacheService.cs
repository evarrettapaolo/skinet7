using System.Text.Json;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Services
{
  public class ResponseCacheService : IResponseCacheService
  {
    private readonly IDatabase  _database;
      public ResponseCacheService(IConnectionMultiplexer redis)
    {
      _database = redis.GetDatabase();
    }

    /// <summary>
    /// Caching response to Redis in JSON format
    /// </summary>
    /// <param name="cacheKey"></param>
    /// <param name="response"></param>
    /// <param name="timeToLive"></param>
    /// <returns></returns>
    public async Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive)
    {
      if(response == null) return;

      //formatting
      var options = new JsonSerializerOptions()
      {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
      };

      var serializedResponse = JsonSerializer.Serialize(response, options);

      //sent params to redis
      await _database.StringSetAsync(cacheKey, serializedResponse, timeToLive);
    }

    /// <summary>
    /// Getting a specific cached response in JSON format
    /// </summary>
    /// <param name="cacheKey"></param>
    /// <returns></returns>
    public async Task<string> GetCachedResponseAsync(string cacheKey)
    {
      var cachedResponse = await _database.StringGetAsync(cacheKey);

      if(cachedResponse.IsNullOrEmpty) return null;

      return cachedResponse;
    }
  }
}