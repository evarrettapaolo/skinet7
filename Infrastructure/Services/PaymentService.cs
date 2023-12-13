using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.Extensions.Configuration;
using Stripe;
using Product = Core.Entities.Product;

namespace Infrastructure.Services
{
  public class PaymentService : IPaymentService
  {
    private readonly IBasketRepository _basketRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IConfiguration _config;

    public PaymentService(
        IBasketRepository basketRepository,
        IUnitOfWork unitOfWork,
        IConfiguration config
    )
    {
      _basketRepository = basketRepository;
      _unitOfWork = unitOfWork;
      _config = config;
    }

    public async Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId)
    {
      //variables for stripe key, redis basket, shipping from Db
      StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

      var basket = await _basketRepository.GetBasketAsync(basketId);

      if (basket == null) return null;

      var shippingPrice = 0m;

      //get the delivery method price, using Db
      if (basket.DeliveryMethodId.HasValue)
      {
        var deliveryMethod = await _unitOfWork
            .Repository<DeliveryMethod>()
            .GetByIdAsync((int)basket.DeliveryMethodId);

        shippingPrice = deliveryMethod.Price;
      }

      //verify client data validity, using Db
      foreach (var item in basket.Items)
      {
        //get the product data from Db
        var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);

        //don't trust client (redis data) data, override
        if (item.Price != productItem.Price)
        {
          item.Price = productItem.Price;
        }
      }

      //stripe classes, create
      var service = new PaymentIntentService();
      PaymentIntent intent;

      //creating a payment intent, stripe
      if (string.IsNullOrEmpty(basket.PaymentIntentId))
      {
        var options = new PaymentIntentCreateOptions()
        {
          //multiply to 100 to convert to long, stripe doesn't take decimals
          Amount = (long)basket.Items.Sum(i => i.Quantity * (i.Price * 100)) + (long)shippingPrice * 100,
          Currency = "usd",
          PaymentMethodTypes = new List<string>() { "card" }
        };
        intent = await service.CreateAsync(options);
        basket.PaymentIntentId = intent.Id;
        basket.ClientSecret = intent.ClientSecret;
      }
      else //updating a payment intent
      {
        var options = new PaymentIntentUpdateOptions
        {
          Amount = (long)basket.Items.Sum(i => i.Quantity * (i.Price * 100) + (long)shippingPrice * 100)
        };
        await service.UpdateAsync(basket.PaymentIntentId, options);
      }

      await _basketRepository.UpdateBasketAsync(basket);

      return basket;

    }

    public async Task<Order> UpdateOrderPaymentFailed(string paymentIntentId)
    {
      var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
      var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

      if (order == null) return null;

      order.Status = OrderStatus.PaymentFailed;
      await _unitOfWork.Complete();

      return order;
    }

    public async Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId)
    {
      var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
      var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

      if (order == null) return null;

      order.Status = OrderStatus.PaymentReceived;
      await _unitOfWork.Complete();

      return order;
    }
  }
}
