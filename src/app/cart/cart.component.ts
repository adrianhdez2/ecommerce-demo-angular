import { Component, inject } from '@angular/core';
import { CarItemComponent } from './ui/car-item/car-item.component';
import { CartStateService } from '../shared/data-access/cart-state.service';
import { ProductItemCart } from '../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CarItemComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
  styles: ``
})
export default class CartComponent {
  state = inject(CartStateService).state;

  onRemove(id: number) {
    this.state.remove(id)
  }

  onIncrease(product: ProductItemCart) {
    this.state.update({
      ...product,
      quantity: product.quantity < 10 ? product.quantity + 1 : product.quantity
    })
  }

  onDecrease(product: ProductItemCart) {
    this.state.update({
      ...product,
      quantity: product.quantity <= 1 ? product.quantity : product.quantity - 1
    })
  }
}
