import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Home, TestTube } from "lucide-react";
import { useCart } from "../context/CartContext";

const Header: React.FC = () => {
  const { state } = useCart();
  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            to="/" 
            className="text-2xl font-extrabold text-white hover:text-blue-200 transition-colors"
          >
            Mini E-Commerce
          </Link>
        </div>
        <nav className="flex items-center space-x-6">
          <Link 
            to="/product" 
            className="text-white hover:text-blue-200 flex items-center space-x-2 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Products</span>
          </Link>

          <Link 
            to="/test" 
            className="text-white hover:text-blue-200 flex items-center space-x-2 transition-colors"
          >
            <TestTube className="w-5 h-5" />
            <span>Test</span>
          </Link>
          <Link 
            to="/cart" 
            className="text-white hover:text-blue-200 flex items-center space-x-2 transition-colors"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <span>Cart</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;