import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { addToCart, removeFromCart } from './Cart';
import Sidebar from './Sidebar';

const Products = () => {
  const [products, setProducts] = useState([]);  
  const [filteredProducts, setFilteredProducts] = useState([]);  
  const [search, setSearch] = useState("");  
  const [cartItems, setCartItems] = useState([]);  
  const [isCartVisible, setIsCartVisible] = useState(false);  

  const productsRef = useRef(null);  

  useEffect(() => {
    getProducts();

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));  
    }
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3053/Data/products/getproducts");
      setProducts(response.data);
      setFilteredProducts(response.data);  
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filterProducts = (category) => {
    if (category === "all") {
      setFilteredProducts(products); 
    } else {
      const filtered = products.filter((product) =>
        product.productType.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredProducts(filtered);  
    }

    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const Search = (event) => {
    const item = event.target.value;
    setSearch(item);  
    filterProducts(item);  
  };

  const cart = () => {
    setIsCartVisible((prevState) => !prevState); 
  };

  return (
    <div>
      <Sidebar onSelect={filterProducts} cartLength={cartItems.length} />

      <div className="products-page">
        <div className="header">
          <h1 style={{color:"black"}} className="text-size">E-Commerce</h1>

          <input
            type="text"
            className="search-input"
            placeholder="Search by productType"
            value={search}
            onChange={Search}
          />

          
         
          <a href="#cart-section" className="cart-link" onClick={cart}>
            Cart ({cartItems.length})
          </a>
        </div>

        <div className="grid" ref={productsRef}> 
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="card">
                <img
                  src={product.image}
                  alt={product.model}
                  className="card-image"
                />
                <p>
                  <b>Model: </b>{product.model}
                </p>
                <p>
                  <b>Price: </b>{product.price}
                </p>
                <p>
                  <b>Category: </b>{product.category}
                </p>

                <button
                  className="add"
                  onClick={() => addToCart(product, setCartItems)}
                >
                  Add Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products found for the search.</p>
          )}
        </div>

        {isCartVisible && (
          <div className="cart" id="cart-section">
            <h2>Shopping Cart</h2>
            <p>Total Items in Cart : {cartItems.length}</p> 
            {cartItems.length > 0 ? (
              <div>
                {cartItems.map((item) => (
                  <div key={item._id} className="App">
                    <img src={item.image} alt={item.model} className="image" />
                    <p><b>Model: </b>{item.model}</p>
                    <p><b>Price: </b>{item.price}</p>
                    <p><b>Category: </b>{item.category}</p>
                    <p><b>Description: </b>{item.description}</p>

                    <button 
                      className="remove" 
                      onClick={() => removeFromCart(item._id, setCartItems)}
                    >
                      Remove Cart
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
