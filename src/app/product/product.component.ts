import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  products = [
    {
      title: 'Lamborghini Aventador',
      subTitle: 'Just some cheap Italian car',
      description: 'Aventador is a mid-engine sports car produced by the Italian automotive manufacturer Lamborghini. In keeping with Lamborghini tradition, the Aventador is named after a fighting bull.',
      price: 18.00,
      image: 'assets/Lambo.jpg',
      priceId: 'price_1Hwth1HH195AltvlZOPvVLII'
    },
    {
      title: 'McLaren 570S',
      subTitle: 'Just some cheap British car',
      description: 'The McLaren 570S is a sports car designed and manufactured by British car manufacturer McLaren Automotive. It was unveiled at the 2015 New York International Auto Show',
      price: 27.00,
      image: 'assets/Mclaren.jpg',
      priceId: 'price_1Hwu1aHH195AltvlkTbHalEX'
    },
    {
      title: 'Brabus 800',
      subTitle: 'Just some cheap German car',
      description: 'High-performance at its finest: The BRABUS 800 based on the Mercedes E 63 S 4MATIC+ is the ultimate sports car in the guise of a sedan. With a peak power output of 588 kW / 800 hp and 1,000 Nm peak torque.The all-wheel-drive four-door car sprints from rest to 100 km/h in just 3.0 seconds.The top speed is electronically limited to a breathtaking 300 km/h.',
      price: 34.55,
      image: 'assets/Brabus.jpg',
      priceId: 'price_1Hwu29HH195AltvlVCQm5c7q'
    }
  ];
  quantity = 1;
  stripePromise = loadStripe(environment.stripe_key);

  async checkout(product) {
    const stripe = await this.stripePromise;
    const { error } = await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems: [{ price: product.priceId, quantity: this.quantity }],
      successUrl: `${window.location.href}/success`,
      cancelUrl: `${window.location.href}/failure`,
    });
    if (error) {
      console.log(error);
    }

  }
}
