import { toast } from "react-toastify";



    
export const addToCart = (product, setCartItems) => {
  setCartItems((prevItems) => {
    const updatedItems = [...prevItems, product];
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    return updatedItems;
  });

 
  toast.success(`${product.model} has been added to your cart!`);
};

  
  export const removeFromCart = (productId, setCartItems) => {
    setCartItems((Items) => {
      const products = Items.filter(item => item._id !== productId);
      localStorage.setItem('cart', JSON.stringify(products));  
      return products;
    });
    toast.success("Item removed from cart");
  };
  
  
