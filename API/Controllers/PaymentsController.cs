using API.Errors;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Controllers
{
  public class PaymentsController : BaseApiController
  {
    private const string WhSecret = "whsec_20eb8286e2f1563df6e771e01a79adba520bb0e2b6ca96ce2703e025c6e1504c";
    private readonly IPaymentService _paymentService;
    private readonly ILogger<PaymentsController> _logger;

    public PaymentsController(IPaymentService paymentService, ILogger<PaymentsController> logger)
    {
      _paymentService = paymentService;
      _logger = logger;
    }

    [Authorize]
    [HttpPost("{basketId}")]
    public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
    {
      var basket = await _paymentService.CreateOrUpdatePaymentIntent(basketId);

      if (basket == null) return BadRequest(new ApiResponse(400, "Problem with your basket"));

      return basket;
    }

    [HttpPost("webhook")]
    public async Task<ActionResult> StripeWebhook()
    {
      //create a json out of request body
      var json = await new StreamReader(Request.Body).ReadToEndAsync();

      var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], WhSecret);

      PaymentIntent intent; //stripe class
      Order order; //user defined class

      //Determine the returned Stripe event type
      switch (stripeEvent.Type)
      {
        case "payment_intent.succeeded": 
          intent = (PaymentIntent)stripeEvent.Data.Object;
          _logger.LogInformation("Payment succeeded: ", intent.Id);
          order = await _paymentService.UpdateOrderPaymentSucceeded(intent.Id);
          _logger.LogInformation("Order updated to payment received: ", order.Id);
          break;
        case "payment_intent.payment_failed":
          intent = (PaymentIntent)stripeEvent.Data.Object;
          _logger.LogInformation("Payment failed: ", intent.Id);
          order = await _paymentService.UpdateOrderPaymentFailed(intent.Id);
          _logger.LogInformation("Order updated to payment failed: ", order.Id);
          break;
      }

      return new EmptyResult();
    }
  }
}