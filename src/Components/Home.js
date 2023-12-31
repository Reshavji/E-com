import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Grid, Card, CardContent, Typography,Slider } from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useStateValue } from '../Context/StateProvider';
import { actionTypes } from '../Context/reducer';
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [{ cart, apiData }, dispatch] = useStateValue();
 const [searchInput, setSearchInput] = useState("");
 const [minPrice, setMinPrice] = useState(0);
 const [maxPrice, setMaxPrice] = useState(5000);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        dispatch({
          type: actionTypes.SET_API_DATA,
          data: data.products, // Use 'data' property instead of 'item'
        });
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [dispatch]);
  
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Filter products based on search input and price range
  const filteredProducts = apiData
    ? apiData.filter(
        (product) =>
          product.title.toLowerCase().includes(searchInput.toLowerCase()) &&
          product.price >= minPrice &&
          product.price <= maxPrice
      )
    : [];
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
        <div className="search">
        <div className='search-bar'>
          <input
            type='text'
            id='search-input'
            placeholder='Search Product...'
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <SearchOutlinedIcon className='search-icon' />
        </div>
        <div className="price-filter">
          <Typography id="range-slider" gutterBottom>
            Price Range
          </Typography>
          <Slider
            value={[minPrice, maxPrice]}
            onChange={(event, newValue) => {
              setMinPrice(newValue[0]);
              setMaxPrice(newValue[1]);
            }}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={5000}
          />
        </div>
        </div>
      
        <Grid container spacing={2} className="product-grid">
          {filteredProducts.map((product) => (
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
