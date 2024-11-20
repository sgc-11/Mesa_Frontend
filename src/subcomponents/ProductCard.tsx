import React from 'react';
import { Product } from '../tsthings.ts/Product';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
  openProductDetail: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, openProductDetail }) => {
  return (
    <div className="bg-pink-100 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg">

      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-pink-500 mb-2">{product.name}</h3>
        <p className="text-gray-700 mb-4">${product.price.toFixed(2)}</p>
        <div className="flex justify-between">
          <button 
            onClick={() => addToCart(product)}
            className="bg-pink-500 hover:bg-pink-700 text-white py-2 px-4 rounded transition duration-300"
          >
            Add to Cart
          </button>
          <button 
            onClick={() => openProductDetail(product)}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;