
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AllProduct, AppState } from "src/shared/interfaces";

export const selectFeatureState = createFeatureSelector('productsx');
// export const selectFeatureState = (state: AppState) => state.product

export const allProductSelector = createSelector(
    selectFeatureState,
    (state)=>state['products'][0]
)
export const cartItemsSelector = createSelector(
    selectFeatureState,
    (state)=>state['cartitems']
)
export const userSelector = createSelector(
    selectFeatureState,
    (state) => state['user']
)