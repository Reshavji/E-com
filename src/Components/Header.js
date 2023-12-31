import React, { useState } from 'react';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { useStateValue } from '../Context/StateProvider';
import { actionTypes } from '../Context/reducer';

import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [{ user }, dispatch] = useStateValue();
  const [showUserOptions, setShowUserOptions] = useState(false);

  const handleLogout = () => {
    dispatch({
      type: actionTypes.SET_USER,
      user: null,
    });
    console.log('Logout successful!');
  };



  const handleAdminClick = () => {
    setShowUserOptions(!showUserOptions);
  };

  const handleUserOptionsMouseEnter = () => {
    if (user) {
      setShowUserOptions(true);
    }
  };

  const handleUserOptionsMouseLeave = () => {
    setShowUserOptions(false);
  };

  return (
    <div className='header-container'>
      <div className='header-one'>
        <div className='navbar-one'></div>
        
        <div className='header-icons'>
          <Link to='/cart'>
            {/* Use Link to navigate to '/cart' route */}
            <ShoppingCartOutlinedIcon className='cart-icon' />
            <span className='header-text'>Cart</span>
          </Link>
          <div
            className='avatar'
            onMouseEnter={handleUserOptionsMouseEnter}
            onMouseLeave={handleUserOptionsMouseLeave}
          >
            {user ? (
              <div className='admin' onClick={handleAdminClick}>
                <PersonOutlineIcon className='cart-icon' />
                <span className='header-text'>{user.firstName || 'Guest'}</span>
              </div>
            ) : (
              <button className='login-btn'>Login</button>
            )}
            {showUserOptions && user && (
              <div className='user-options'>
                <button className='logout-btn' onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
