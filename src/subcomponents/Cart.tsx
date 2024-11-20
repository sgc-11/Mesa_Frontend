import React from 'react';
import { X } from 'lucide-react';
import { CartItem } from '../tsthings.ts/Product';

interface CartProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  cart: CartItem[];
  removeFromCart: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, setIsOpen, cart, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-end z-50">
      <div className="bg-stone-800 h-full w-full max-w-md p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold ">Your Cart</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
            <X size={24} />
          </button>
        </div>
        {cart.length === 0 ? (
          <p className="text-gray-300">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-700">
                <div>
                  <h4 className="text-lg font-semibold text-pink-400">{item.name}</h4>
                  <p className="text-gray-300">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="text-gray-300 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
            <div className="mt-6">
              <p className="text-xl font-bold ">Total: ${total.toFixed(2)}</p>
              <button className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded transition duration-300">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;