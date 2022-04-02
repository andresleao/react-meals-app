import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';

import Modal from '../Ui/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState();

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const removeItemHandler = (id) => {
    cartContext.removeItem({ id });
  };

  const addItemHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      'https://meal-app-48ddb-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartContext.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartContext.clearItems();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={removeItemHandler.bind(null, item.id)}
          onAdd={addItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button
          className={classes.button}
          onClick={() => props.onModalCartHandler()}
        >
          Close
        </button>
      </div>
    </>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {isCheckout && (
        <Checkout
          onClose={props.onModalCartHandler}
          onSubmit={submitOrderHandler}
        />
      )}

      {!isCheckout && (
        <div className={classes.actions}>
          <button
            className={classes['button--alt']}
            onClick={() => props.onModalCartHandler()}
          >
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={() => orderHandler()}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  return (
    <Modal onClose={props.onModalCartHandler}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
