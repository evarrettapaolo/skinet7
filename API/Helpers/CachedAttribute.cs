using System.Text;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{
  public class CachedAttribute : Attribute, IAsyncActionFilter
  {
    private readonly int _timeToLiveInSeconds;

    public CachedAttribute(int timeToLiveInSeconds)
    {
      _timeToLiveInSeconds = timeToLiveInSeconds;
    }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
      //create an object of the caching service
      var cacheService = context.HttpContext.RequestServices.GetRequiredService<IResponseCacheService>();

      //generate key
      var cacheKey = GenerateCacheKeyFromRequest(context.HttpContext.Request);
      //try to get if a cached respond is available, using request query
      var cachedResponse = await cacheService.GetCachedResponseAsync(cacheKey);

      //cached response found
      if(!string.IsNullOrEmpty(cachedResponse))
      {
        //intercept the endpoint and send the cached response
        var contentResult = new ContentResult()
        {
          Content = cachedResponse,
          ContentType = "application/json",
          StatusCode = 200
        };

        context.Result = contentResult;

        return;
      }
      
      //no cached response matched with query string signature
      var executedContext = await next(); //move to the controller

      //check if the controller returns an object
      if(executedContext.Result is OkObjectResult okObjectResult)
      {
        //cache the new response from controller, 
        await cacheService.CacheResponseAsync(cacheKey, okObjectResult.Value, TimeSpan.FromSeconds(_timeToLiveInSeconds));
      }

    }

    //helper method
    private string GenerateCacheKeyFromRequest(HttpRequest request)
    {
      var keyBuilder = new StringBuilder();

      //generate key manipulating request query parameters
      keyBuilder.Append($"{request.Path}");

      foreach(var (key , value) in request.Query.OrderBy(x => x.Key))
      {
        keyBuilder.Append($"|{key}-{value}");
      }
      return keyBuilder.ToString();
    }
  }
}