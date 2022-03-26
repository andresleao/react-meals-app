import React from 'react';

import meals from '../../assets/meals.jpg';
import classes from './Header.module.css';

import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onModalCartHandler} />
      </header>
      <div className={classes['main-image']}>
        <img src={meals} alt="A table full of food!" />
      </div>
    </>
  );
};

export default Header;
