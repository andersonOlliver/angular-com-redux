import { ActionTypes } from '../actions/cart.action';
import { ProductModel } from '../models/product.model';
import { ActionModel } from './../models/action.model';
import { CartModel } from './../models/cart.model';

export const cart = new CartModel();

export function cartReducer(state = cart, action: ActionModel){
  switch(action.type){
    case ActionTypes.Add:
      {
        let {products,total} = state;
        products = [...products, action.payload]
        total = calculateTotal(products);
        state = {products, total};

        console.log(state);
        return state;
      };
    case ActionTypes.Remove: {
        let {products, total} = state;
        const index = products.indexOf(action.payload);
        products = products.filter(p => p!== products[index]);
        total = calculateTotal(products);
        state = {products, total};

        console.log(state);
        return state;
      }
    case ActionTypes.Clear:
      {
        state = new CartModel();
        state.total = calculateTotal(state.products);

        console.log(state);
        return state;
      }

    default:
        return state;
  }
}

export function calculateTotal(products: ProductModel[]){
  return products.length > 0
  ? products.map(p => p.price).reduce((previous, current) => previous + current)
  : 0;
}
