import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import { useStateValue } from './Context/StateProvider';
import { actionTypes } from './Context/reducer';
import Cart from './Components/Cart/Cart';

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // Check if user data exists in local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      dispatch({
        type: actionTypes.SET_USER,
        user: storedUser,
      });
    }
  }, [dispatch]);

  return (
    <div className="app">
      <div className="app__top"></div>
      <div className="app__container">
        <Switch>
          <Route exact path="/">
            {user ? <Redirect to="/home" /> : <Login />}
          </Route>
          <Route exact path="/home">
            {user ? <Home /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/cart">
            {user ? <Cart /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
