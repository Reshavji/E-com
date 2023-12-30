import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useStateValue } from '../Context/StateProvider';
import { actionTypes } from '../Context/reducer';
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [{ cart }, dispatch] = useStateValue();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const isInCart = (id) => {
    return cart.some(item => item.id === id);
  };

  const handleToggleCart = (id) => {
    const product = products.find((product) => product.id === id);

    if (isInCart(id)) {
      dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        id: id,
      });
    } else {
      dispatch({
        type: actionTypes.ADD_TO_CART,
        item: product,
      });
    }
  };

  return (
    <div className="home">
      <div className="head">
        <Header />
      </div>
      <div className="body">
        <Grid container spacing={2} className="product-grid">
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="card">
                <Carousel showThumbs={false} infiniteLoop={true}>
                  {product.images.map((img, index) => (
                    <div key={index}>
                      <img src={img} alt={`Product ${index}`} />
                    </div>
                  ))}
                </Carousel>
                <CardContent>
                  <Typography variant="h6">
                    <b>{product.title}</b>
                  </Typography>
                  <Typography variant="subtitle1">
                    <b>Brand:</b> {product.brand}
                  </Typography>
                  <Typography variant="body2">
                    <b>Category:</b> {product.category}
                  </Typography>
                  {/* <Typography variant="body2" className="description">
                    Description: {product.description}
                  </Typography> */}
                  <Typography variant="body2">
                    <b>Price:</b> ₹{product.price}
                  </Typography>
                  <button
                    onClick={() => handleToggleCart(product.id)}
                    className="add-to-cart-button"
                  >
                    {isInCart(product.id) ? "Remove" : "Add to Cart"}
                  </button>
                  {/* Add other product details */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
