import { AllProduct, Product } from 'src/shared/interfaces';
import * as AllActions from './product.action';

// gettings items from localstorage if it exist to persist data after refreshing
const cartitems = localStorage.getItem('cartitems');
const user = localStorage.getItem("user");

var initialUser;
var initialcartitem;

if(cartitems){
    const parsedItem = JSON.parse(cartitems);
    initialcartitem = parsedItem
}
else{
    initialcartitem=[]
}
if(user){
    initialUser = JSON.parse(user);
}
else{
    initialUser={}
}

export const initialState:AllProduct={
   products:[],
   cartitems:initialcartitem,
   user:initialUser,
   error:null
}

// Reducer function acts based on the actions
export function productReducer(state=initialState,action:any){

    switch(action.type){
        case AllActions.getAllProduct.type:{
       
            return {...state}
        }
        case AllActions.getAllProductSuccess.type:{
           
            return {
                ...state,
                products:[action.products]
            }
        }
        case AllActions.getAllProductFailure.type:{
          
            return {
                ...state,
                error:action.error
            }
        }

        case AllActions.addToCart.type:{
            const cartitems=[...state.cartitems,action.product]
            localStorage.setItem("cartitems",JSON.stringify(cartitems));
            return{
                ...state,
                cartitems:cartitems
            }
        }

        case AllActions.getCart.type:{
            return {
                ...state.cartitems
            }
        }
        case AllActions.removeFromCart.type:{
            const cartitem =[...state.cartitems];
            const index = cartitem.findIndex(x=>x.id === action.product.id);
            cartitem.splice(index,1);
            localStorage.setItem("cartitems",JSON.stringify(cartitem));

            return {
                ...state,
                cartitems:cartitem
            }
        }

        case AllActions.clearCart.type:{
            localStorage.removeItem("cartitems")
            return {
                ...state,
                cartitems:[]
            }
        }

        case AllActions.postBilling.type:{
            const user = {...state.user,...action.billinginfo}
            localStorage.setItem("user",JSON.stringify(user));
            return {
                ...state,
                user:user
            }
        }
        case AllActions.postDelivery.type:{
            const user = {...state.user,...action.deliveryinfo}
            localStorage.setItem("user",JSON.stringify(user));
            return {
                ...state,
                user:user
            }
        }
        case AllActions.postCard.type:{
            const user = {...state.user,cardno:action.cardno}
            localStorage.setItem("user",JSON.stringify(user));
            return {
                ...state,
                user:user
            }
        }
        default:{
            return state
        }
    }
}