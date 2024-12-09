import React, { useState } from 'react';
import { useCart } from "../context/CartContext";
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image }) => {
  const { dispatch } = useCart();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden 
                    transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      {/* Wishlist Icon */}
      <button 
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full 
                   transition-all hover:bg-white hover:shadow-md"
      >
        <Heart 
          size={24} 
          className={`transition-colors ${
            isLiked 
              ? 'text-red-500 fill-current' 
              : 'text-gray-400 hover:text-red-300'
          }`} 
        />
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-64 object-cover transition-transform duration-300 
                     group-hover:scale-110"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300"></div>
      </div>

      {/* Product Details */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">{name}</h2>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">${price.toFixed(2)}</span>
          <button
            onClick={() => dispatch({ 
              type: "ADD_TO_CART", 
              payload: { id, name, price, image } 
            })}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 
                       text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 
                       transition-all duration-300 transform hover:scale-105 
                       shadow-md hover:shadow-lg group"
          >
            <ShoppingCart size={20} className="group-hover:animate-bounce" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Subtle hover effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 
                      transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );
};

export default ProductCard;