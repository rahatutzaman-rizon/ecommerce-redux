import React from 'react';
import { useCart } from "../context/CartContext";
import { Trash2, ShoppingCart, Plus, Minus, CheckCircle } from 'lucide-react';

const CartPage: React.FC = () => {
  const { state, dispatch } = useCart();

  const totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5 flex items-center">
            <ShoppingCart className="mr-4 text-white" size={32} strokeWidth={2} />
            <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
          </div>

          {/* Empty Cart State */}
          {state.items.length === 0 ? (
            <div className="text-center py-16 px-6">
              <ShoppingCart 
                className="mx-auto mb-6 text-gray-300" 
                size={96} 
                strokeWidth={1} 
              />
              <p className="text-2xl text-gray-500 mb-6">
                Your cart feels a little light
              </p>
              <button 
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full 
                           hover:from-blue-700 hover:to-purple-700 transition-all duration-300 
                           transform hover:scale-105 shadow-lg"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div>
              {/* Cart Items */}
              <div className="divide-y divide-gray-100">
                {state.items.map(item => (
                  <div 
                    key={item.id} 
                    className="p-6 flex items-center space-x-6 hover:bg-blue-50 transition duration-200"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover rounded-xl shadow-md" 
                    />
                    
                    <div className="flex-grow">
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h2>
                      <p className="text-blue-600 font-bold">${item.price.toFixed(2)}</p>
                    </div>
                    
                    {/* Quantity Control */}
                    <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                      <button 
                        onClick={() => dispatch({ 
                          type: "UPDATE_QUANTITY", 
                          payload: { id: item.id, quantity: Math.max(1, item.quantity - 1) } 
                        })}
                        className="p-2 hover:bg-gray-200 transition"
                      >
                        <Minus size={20} className="text-gray-600" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: +e.target.value } })
                        }
                        className="w-16 text-center bg-transparent focus:outline-none"
                      />
                      <button 
                        onClick={() => dispatch({ 
                          type: "UPDATE_QUANTITY", 
                          payload: { id: item.id, quantity: item.quantity + 1 } 
                        })}
                        className="p-2 hover:bg-gray-200 transition"
                      >
                        <Plus size={20} className="text-gray-600" />
                      </button>
                    </div>
                    
                    {/* Remove Item */}
                    <button
                      onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Total and Checkout */}
              <div className="bg-gray-50 p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-semibold text-gray-700">Total</span>
                  <span className="text-3xl font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
                </div>
                
                <button 
                  className="w-full flex items-center justify-center space-x-3 
                             bg-gradient-to-r from-green-500 to-blue-600 text-white 
                             py-4 rounded-full hover:from-green-600 hover:to-blue-700 
                             transition duration-300 transform hover:scale-105 shadow-xl"
                >
                  <CheckCircle size={24} />
                  <span className="text-lg font-semibold">Proceed to Checkout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;