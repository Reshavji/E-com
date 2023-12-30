import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../Context/StateProvider';
import './Cart.css';

const Cart = () => {
  const [{ cart }, dispatch] = useStateValue();
  const [price, setPrice] = useState(0);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.price;
    });
    return totalPrice;
  };

  const handleDecrease = (itemId) => {
    dispatch({ type: 'DECREASE_QUANTITY', id: itemId });
  };

  const handleIncrease = (itemId) => {
    dispatch({ type: 'INCREASE_QUANTITY', id: itemId });
  };

  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    setPrice(totalPrice);
  }, [cart]);

  return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="thumbnail">
                  <img src={item.thumbnail} alt={item.title} />
                </div>
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p>Brand: {item.brand}</p>
                  <p>Price: ₹{item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrease(item.id)}>-</button>
                    <span>Quantity: {}</span>
                    <button onClick={() => handleIncrease(item.id)}>+</button>
                  </div>
                </div>
              </div>
            ))}
            <p className="total-price">Total Price: ₹{price}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
