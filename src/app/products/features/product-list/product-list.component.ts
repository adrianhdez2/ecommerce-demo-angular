import { Component, inject } from '@angular/core';
import { ProductStateService } from '../../data-access/products-state.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { Product } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styles: ``,
  providers: [ProductStateService]
})
export default class ProductListComponent {

  productState = inject(ProductStateService)
  cardState = inject(CartStateService).state;

  changePage() {
    const page = this.productState.state.page() + 1
    this.productState.changePages.next(page)
  }

  addToCart(product: Product) {
    this.cardState.add({
      product,
      quantity: 1
    })
  }
}
