import React, { useState, useEffect } from "react";
import axios from "axios";
import { addToCart, removeFromCart } from './Cart';
import Sidebar from './Sidebar';  



const Products = () => {
  const [products, setProducts] = useState([]);  
  const [filteredProducts, setFilteredProducts] = useState([]);  
  const [search, setSearch] = useState("");  
  const [cartItems, setCartItems] = useState([]);  

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
  };

  const Search = (event) => {
    const item = event.target.value;
    setSearch(item);  
    filterProducts(item);  
  };

  return (
    <div>
    <Sidebar onSelect={filterProducts} />
    <div className="products-page">
      
     
      
      <div className="content">
        <h1 className="text-size">E-Commerce</h1>

        <input
          type="text"
          className="search-input"
          placeholder="Search by productType"
          value={search}
          onChange={Search}
        />

        <div className="grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="card">
                <img
                  src={product.image}
                  alt={product.model}
                  className="card-image"
                />
                <p>
                  <b>Model : </b>
                  {product.model}
                </p>
                <p>
                  <b>Price : </b>
                  {product.price}
                </p>
                <p>
                  <b>Category : </b>
                  {product.category}
                </p>
                <p>
                  <b>Description : </b>
                  {product.description}
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
            <p >No products found for the search .</p>
          )}
        </div>

      
        <div className="cart">
          <h2>Shopping Cart</h2>
          {cartItems.length > 0 ? (
            <div>
              {cartItems.map((item) => (
                <div key={item._id} className="App">
                  <img src={item.image} alt={item.model} className="image" />

                  <p>
                    <b>Model : </b> {item.model}
                  </p>
                  <p>
                    <b>Price : </b> {item.price}
                  </p>
                  <p>
                    <b>Category : </b> {item.category}
                  </p>
                  <p>
                    <b>Description : </b> {item.description}
                  </p>

                  <button className="remove"
                    onClick={() => removeFromCart(item._id, setCartItems)}
                  >
                    Remove Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p >Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Products;
