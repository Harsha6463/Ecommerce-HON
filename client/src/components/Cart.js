


    
export const addToCart = (product, setCartItems) => {
    setCartItems((Items) => {
      const products = [...Items, product];
      localStorage.setItem('cart', JSON.stringify(products));  
      return products;
    });
  };
  
  export const removeFromCart = (productId, setCartItems) => {
    setCartItems((Items) => {
      const products = Items.filter(item => item._id !== productId);
      localStorage.setItem('cart', JSON.stringify(products));  
      return products;
    });
  };
  
  
