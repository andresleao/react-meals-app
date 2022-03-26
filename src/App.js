import React, { useState } from 'react';

import CartProvider from './store/CartProvider';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const modalCartHandler = () => {
    setCartIsShown(!cartIsShown);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onModalCartHandler={modalCartHandler} />}
      <Header onModalCartHandler={modalCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
