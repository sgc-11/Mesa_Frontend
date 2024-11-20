import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../tsthings.ts/Product';

interface ProductDetailProps {
  product: Product;
  closeProductDetail: () => void;
  addToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, closeProductDetail, addToCart }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-stone-700 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <button onClick={closeProductDetail} className="text-gray-300 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="p-4 flex flex-col md:flex-row">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full md:w-1/2 h-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
          />
          <div className="md:w-1/2">
            <p className="text-gray-200 mb-4">{product.description}</p>
            <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;