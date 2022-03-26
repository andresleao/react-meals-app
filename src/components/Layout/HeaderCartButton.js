import React, { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const cartContext = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  // const numberOfCartItems = cartContext.items.reduce((currentNumber, item) => {
  //   return currentNumber + item.amount;
  // }, 0);

  const numberOfCartItems = cartContext.items.length;

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ''
  }`;

  useEffect(() => {
    if (cartContext.items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);

  return (
    <button className={btnClasses} onClick={() => props.onClick()}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
