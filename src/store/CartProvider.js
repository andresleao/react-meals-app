import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

    case 'REMOVE_ITEM':
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const existingItem = state.items[existingItemIndex];
      const updatedTotalAmountDecrease = state.totalAmount - existingItem.price;

      let updatedItemsRemove;
      if (existingItem.amount === 1) {
        updatedItemsRemove = state.items.filter(
          (item) => item.id !== action.payload.id
        );

        return {
          items: updatedItemsRemove,
          totalAmount: updatedTotalAmountDecrease,
        };
      } else {
        const updatedItemRemove = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        console.log(updatedItemRemove);
        updatedItemsRemove = [...state.items];
        updatedItemsRemove[existingItemIndex] = updatedItemRemove;

        return {
          items: updatedItemsRemove,
          totalAmount: updatedTotalAmountDecrease,
        };
      }

    case 'CLEAR_ITEMS':
      return defaultCartState;

    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItem = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearItems = () => {
    dispatchCartAction({ type: 'CLEAR_ITEMS' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem,
    removeItem,
    clearItems,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
