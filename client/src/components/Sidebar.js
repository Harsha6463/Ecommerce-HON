import React, { useState } from "react";

const Sidebar = ({ onSelect, cartLength }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebar = () => {
    setIsOpen(!isOpen);
  };

  const cartClass = cartLength > 0 ? 'cart-active' : 'cart-empty';

  return (
    <div>
      <div className={`color ${isOpen ? 'active' : ''}`} onClick={sidebar}></div>

      {!isOpen && (
        <div className="bar" onClick={sidebar}></div> 
      )}

      {isOpen && (
        <div className="sidebar">
          <div className="sidebar-style">
            <h3>Shop Categories</h3>
            <div className="close" onClick={sidebar}>
              &#10005;
            </div>
          </div>
          <ul>
            <li onClick={() => onSelect("all")}>All Products</li>
            <li onClick={() => onSelect("airconditioner")}>Air Conditioner</li>
            <li onClick={() => onSelect("computer")}>Laptops</li>
            <li onClick={() => onSelect("Refrigerator")}>Refrigerator</li>
            <li onClick={() => onSelect("furniture")}>Furniture</li>
            <li onClick={() => onSelect("Kitchen")}>Kitchen</li>
            <li onClick={() => onSelect("Menswear")}>Menswear</li>
            <li onClick={() => onSelect("mobile")}>Mobiles</li>
            <li onClick={() => onSelect("womenswear")}>Womenswear</li>
            <li onClick={() => onSelect("cart")} className={cartClass}>
              Cart Items {cartLength > 0 && `(${cartLength})`}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
