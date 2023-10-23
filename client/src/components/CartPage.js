import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './common/NavBar';
import CartCard from './common/CartCard';
import { addToCart, removeFromCart } from '../slices/cartSlice';

function CartPage() {
  const dispatch = useDispatch();

  const { cartItems, itemsPrice } = useSelector((state) => state.cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // Add functionality when available
  const checkoutHandler = () => {};

  return (
    <div className='bg-white h-screen flex flex-col'>
      {/* Navbar */}
      <NavBar />

      <section className='container mx-auto flex flex-col mt-8'>
        <h3 className='text-3xl font-semibold text-black mb-6'>
          Your Shopping Cart
        </h3>
        <div className='grid grid-cols-1 gap-6'>
          {cartItems &&
            cartItems.map((robot) => (
              <CartCard
                key={robot._id}
                robot={robot}
                removeFromCart={removeFromCartHandler}
                addToCart={addToCartHandler}
              />
            ))}
        </div>
        <div className='grid grid-cols-1 justify-end justify-items-end'>
          <h3 className='text-3xl font-semibold text-black mb-3'>
            Total: {itemsPrice}
          </h3>
          <button
            className='bg-blue-500 w-min hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full disabled:bg-blue-300'
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Checkout
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className='py-4 text-center text-gray-700'>
        &copy; {new Date().getFullYear()} BotBazaar. All rights reserved.
      </footer>
    </div>
  );
}

export default CartPage;
