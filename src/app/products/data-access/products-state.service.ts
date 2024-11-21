import { Injectable, inject } from "@angular/core";
import { Product } from "../../shared/interfaces/product.interface";
import { signalSlice } from 'ngxtension/signal-slice'
import { ProductsService } from "./products.service";
import { Subject, catchError, map, of, startWith, switchMap } from "rxjs";

interface State {
    products: Product[];
    status: "loading" | "success" | "error"
    page: number;
}

@Injectable()
export class ProductStateService {

    private productService = inject(ProductsService)

    private initialState: State = {
        products: [],
        status: "loading" as const,
        page: 1
    };

    changePages = new Subject<number>();

    loadProducts = this.changePages.pipe(
        startWith(1),
        switchMap((page) => this.productService.getProducts(page)),
        map((products) => ({ products, status: 'success' as const })),
        catchError(() => {
            return of({
                products: [],
                status: 'error' as const
            })
        })
    );

    state = signalSlice({
        initialState: this.initialState,
        sources: [
            this.changePages
                .pipe(map((page) => ({ page, status: 'loading' as const }))),
            this.loadProducts
        ]
    })
}