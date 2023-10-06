import { Actions,createEffect,ofType} from "@ngrx/effects";
import { ProductService } from "../services/product.service";
import * as AllActions from './product.action'
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core'

@Injectable()
export class ProductEffects{
    constructor(private actions$:Actions,private service:ProductService){}

    // creating effects which listen to an action and call to backend and then invoke another action
    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(AllActions.getAllProduct),
        switchMap(()=>this.service.getAllProducts().pipe(
            map(products => AllActions.getAllProductSuccess({products})),
            catchError(() => of(AllActions.getAllProductFailure))
        ))
    ))

}