// creating actions
import { createAction, props } from "@ngrx/store";
import { Product, User, Address, Delivery } from "src/shared/interfaces"

// Actions for getting data
export const getAllProduct = createAction("[Product] GET PRODUCT");

export const getAllProductSuccess = createAction(
    "[Product] GET PRODUCT SUCCESS",
    props<{ products: Product[] }>())

export const getAllProductFailure = createAction(
    "[Product] GET PRODUCT FAIL",
    props<{ error: string }>()
)
// Actions for adding to cart
export const getCart = createAction("[Cart] GET CARTPRODUCT");

export const addToCart = createAction(
    "[Cart] POST ADD TO CART",
    props< {product: Product}>())

export const removeFromCart = createAction(
    "[Cart] POST REMOVE FROM  CART",
    props<{ product:Product }>()
)

export const clearCart = createAction(
    "[Cart] POST CLEAR CART"
)
// Actions to getting formdata
export const postBilling = createAction(
    "[User] POST BILLING DATA",
    props<{billinginfo:Address}>()
)
export const postDelivery= createAction(
    "[User] POST DELIVERY DATA",
    props<{deliveryinfo:Delivery}>()
)
export const postCard= createAction(
    "[User] POST CARD DATA",
    props<{cardno:string}>()
)



