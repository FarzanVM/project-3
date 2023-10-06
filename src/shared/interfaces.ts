export interface Product{
    id:number;
    imgsrc:string;
    type:string;
    name:string;
    price:number;
    rating:string;
    addedtocart:boolean;
    addedtowishlist:boolean;
}
export interface Address{
    name:string,
    email:string,
    phone:string,
    country:string,
    city:string,
    state:string,
    zip:string,
    address:string,
}
export interface Delivery{
    deliverytype:string,
    deliverydate:string,
}
export interface User{
    name:string,
    email:string,
    phone:string,
    country:string,
    city:string,
    state:string,
    zip:string,
    address:string,
    deliverytype:string,
    deliverydate:string,
    cardno:string
}
export interface AllProduct{
    products:Product[],
    cartitems:Product[],
    user:User,
    error:string|null
}
export interface CartItems{
    cartitems:Product[],
    error:string|null
}
export interface AppState{
    product:AllProduct
    cartitems:CartItems
}