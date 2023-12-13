import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/shared/models/basket';
import { Address } from 'src/app/shared/models/user';
import { NavigationExtras, Router } from '@angular/router';
import { Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';
import { OrderToCreate } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;
  // Stripe related variables
  @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
  @ViewChild('cardCvc') cardCvcElement?: ElementRef;
  stripe: Stripe | null = null;
  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;
  cardNumberComplete = false;
  cardExpiryComplete = false;
  cardCvcComplete = false;
  cardErrors: any;
  loading = false;

  constructor(private basketService: BasketService, private checkoutService: CheckoutService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    // generate stripe payment form elements, on Initialize
    loadStripe('pk_test_51OKpuRElZQ9cxwE9HhDXS9FZwYdz6qcPcOCLMWXHLhzWRiOnFlshq8oLc2vfoPNi9agbaRdxrYM0iBbuLu7smPuF008x3czSZu')
      .then(stripe => {
        this.stripe = stripe;
        const elements = stripe?.elements();

        // create stripe elements
        if (elements) {
          this.cardNumber = elements.create('cardNumber');
          this.cardNumber.mount(this.cardNumberElement?.nativeElement);
          //error feedback
          this.cardNumber.on('change', event => {
            this.cardNumberComplete = event.complete;
            if (event.error) this.cardErrors = event.error.message;
            else this.cardErrors = null;
          })

          this.cardExpiry = elements.create('cardExpiry');
          this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
          //error feedback
          this.cardExpiry.on('change', event => {
            this.cardExpiryComplete = event.complete;
            if (event.error) this.cardErrors = event.error.message;
            else this.cardErrors = null;
          })

          this.cardCvc = elements.create('cardCvc');
          this.cardCvc.mount(this.cardCvcElement?.nativeElement);
          //error feedback
          this.cardCvc.on('change', event => {
            this.cardCvcComplete = event.complete;
            if (event.error) this.cardErrors = event.error.message;
            else this.cardErrors = null;
          })

        }
      })
  }

  get paymentFormComplete() {
    return this.checkoutForm?.get('paymentForm')?.valid 
      && this.cardNumberComplete 
      && this.cardExpiryComplete 
      && this.cardCvcComplete;
  }

  //create an order object and stripe payment request, and clears out basket.
  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();
    if(!basket) throw Error('cannot get basket');
    try {
      //throw error when null
      const createdOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);
      if (paymentResult.paymentIntent) {
        this.basketService.deleteBasket(basket); //delete local and redis
        const navigationExtras: NavigationExtras = { state: createdOrder };
        this.router.navigate(['checkout/success'], navigationExtras);
      } else {
        this.toastr.error(paymentResult.error.message);
      }
    } catch (error: any) {
      console.log(error);
      this.toastr.error(error.message);
    } finally {
      this.loading = false;
    }
  }

  //helper methods

  private async confirmPaymentWithStripe(basket: Basket | null) {
    if (!basket) throw new Error('Basket is null');
    //send a request to stripe
    const result = this.stripe?.confirmCardPayment(basket.clientSecret!, {
      payment_method: {
        card: this.cardNumber!,
        billing_details: {
          name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
        }
      }
    })
    if (!result) throw new Error('Problem attempting payment with stripe');
    return result;
  }

  private async createOrder(basket: Basket | null) {
    if (!basket) throw new Error('Basket is null');
    const orderToCreate = this.getOrderToCreate(basket);
    //return a promise
    return firstValueFrom(this.checkoutService.createOrder(orderToCreate))
  }

  private getOrderToCreate(basket: Basket): OrderToCreate {
    //gather info from form controls
    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shipToAddressId = this.checkoutForm?.get('addressForm')?.value as Address;
    if (!deliveryMethodId || !shipToAddressId) throw new Error('Problem with basket');
    //create an anonymous object with exactly the same properties as OrderToCreate
    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddressId
    }
  }
}
