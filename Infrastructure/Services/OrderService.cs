using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
  public class OrderService : IOrderService
  {
    private readonly IBasketRepository _basketRepo;
    private readonly IUnitOfWork _unitOfWork;
    public OrderService(IBasketRepository basketRepo, IUnitOfWork unitOfWork)
    {
      _unitOfWork = unitOfWork;
      _basketRepo = basketRepo;
    }

    public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
    {
      //get basket form repo
      var basket = await _basketRepo.GetBasketAsync(basketId);

      //get items from product repo
      var items = new List<OrderItem>();
      foreach (var item in basket.Items)
      {
        //get the referred item from Db, not rely on basket product data
        var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
        //snapshot of item ordered
        var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
        var orderItem = new OrderItem(itemOrdered, item.Quantity, productItem.Price);

        //populate the list
        items.Add(orderItem);
      }

      //get delivery method from repo
      var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);

      //calc subtotal
      var subtotal = items.Sum(item => item.Price * item.Quantity);

      //check to see if order exists
      var spec = new OrderByPaymentIntentIdSpecification(basket.PaymentIntentId);
      var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

      if(order != null)  //order object exists
      {
        order.ShipToAddress = shippingAddress;
        order.DeliveryMethod = deliveryMethod;
        order.SubTotal = subtotal;
        _unitOfWork.Repository<Order>().Update(order);
      }
      else
      {
        //create order
        order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal, basket.PaymentIntentId);
        _unitOfWork.Repository<Order>().Add(order);
      }

      //save to db
      var result = await _unitOfWork.Complete(); //fail or successful

      if (result <= 0) return null; //failed

      //return order
      return order;
    }

    public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
    {
      return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
    }

    public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
    {
      var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);

      return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
    }

    public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
    {
      var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);

      return await _unitOfWork.Repository<Order>().ListAsync(spec);
    }
  }
}