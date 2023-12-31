import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../Context/StateProvider';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './Cart.css';

const Cart = () => {
  const [{ cart },dispatch] = useStateValue();
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let calculatedQuantities = {};
    let totalPrice = 0;

    cart.forEach(item => {
      calculatedQuantities[item.id] = 1; // Set initial quantity as 1 for each item
      totalPrice += item.price; // Calculate initial total price based on the item prices
    });

    setQuantities(calculatedQuantities);
    setTotalPrice(totalPrice);
  }, [cart]);

  const handleDecrease = (itemId) => {
    const updatedQuantities = { ...quantities };

    if (updatedQuantities[itemId] > 1) {
      updatedQuantities[itemId] -= 1;
      setQuantities(updatedQuantities);
      recalculateTotal(updatedQuantities);
    }
  };

  const handleIncrease = (itemId) => {
    const updatedQuantities = { ...quantities };

    updatedQuantities[itemId] = (updatedQuantities[itemId] || 1) + 1;
    setQuantities(updatedQuantities);
    recalculateTotal(updatedQuantities);
  };

  const recalculateTotal = (updatedQuantities) => {
    let totalPrice = 0;

    cart.forEach(item => {
      const quantity = updatedQuantities[item.id] || 1; // Get the updated quantity

      totalPrice += item.price * quantity; // Calculate price based on updated quantity
    });

    setTotalPrice(totalPrice);
  };
  const handleRemoveFromCart = (itemId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      id: itemId,
    });
  };
  return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className='cart-data'>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="remove-button" onClick={() => handleRemoveFromCart(item.id)}>
                    <DeleteForeverIcon />
                  </div>
                <div className="thumbnail">
                  <img src={item.thumbnail} alt={item.title} />
                </div>
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p>Brand: {item.brand}</p>
                  <p>Price: ₹{item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrease(item.id)}>-</button>
                    <span>Quantity: {quantities[item.id] || 1}</span>
                    <button onClick={() => handleIncrease(item.id)}>+</button>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        )}
      </div>
      <p className="total-price">Total Price: ₹{totalPrice}</p>
    </div>
  );
};

export default Cart;
