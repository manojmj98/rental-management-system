import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import NavBar from './common/NavBar';
import Card from './common/Card';
import { Link } from 'react-router-dom';
import CartCard from './common/CartCard';
import { addToCart, removeFromCart } from '../slices/cartSlice';

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className='bg-white h-screen flex flex-col'>
      {/* Navbar */}
      <NavBar className='bg-white' />

      {/* Robot Listing Section */}
      <section className='container mx-auto flex flex-col items-center mt-8'>
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
      </section>

      {/* Footer Section */}
      <footer className='py-4 text-center text-gray-700'>
        &copy; {new Date().getFullYear()} BotBazaar. All rights reserved.
      </footer>
    </div>
  );
}

export default CartPage;
