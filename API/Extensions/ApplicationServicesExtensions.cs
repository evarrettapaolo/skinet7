using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

namespace API.Extensions
{
    //Extension class for storing services
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            //Payment service, related to Stripe
            services.AddScoped<IPaymentService, PaymentService>();

            //Unit of work; for repository stack
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            //Order Service class
            services.AddScoped<IOrderService, OrderService>();

            //DbContext Class
            services.AddDbContext<StoreContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("Default"));
            });

            //Redis, Handles client cart
            services.AddSingleton<IConnectionMultiplexer>(c => {
                var options = ConfigurationOptions.Parse(config.GetConnectionString("Redis"));
                return ConnectionMultiplexer.Connect(options);
            });

            //Basket Repository class
            services.AddScoped<IBasketRepository, BasketRepository>();

            //Product Repository class
            services.AddScoped<IProductRepository, ProductRepository>();

            //Identity & JWT token service
            services.AddScoped<ITokenService, TokenService>();

            //GenericRepository, generic type container 
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            //Type automapper, used in DTO
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            //Override default exception handling feature
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var error = actionContext.ModelState
                        .Where(e => e.Value.Errors.Count > 0)
                        .SelectMany(x => x.Value.Errors)
                        .Select(x => x.ErrorMessage).ToArray();

                    var errorResponse = new ApiValidationErrorResponse
                    {
                        Errors = error
                    };

                    return new BadRequestObjectResult(errorResponse);
                };
            });

            //Cors service
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });

            return services;
        }
    }
}