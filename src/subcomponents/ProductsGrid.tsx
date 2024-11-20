import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Filter } from 'lucide-react';
import { Product, CartItem } from '../tsthings.ts/Product';
import ProductDetail from './ProductDetail';
import ProductCard from './ProductCard';
import Cart from './Cart';
import mockProducts from '../DATA/productsData';

const ProductsGrid: React.FC = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = ['All', ...new Set(products.map(product => product.category))];

  useEffect(() => {
    // Fetch products from API and update state
    // setProducts(fetchedProducts);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || selectedCategory === 'All' || product.category === selectedCategory)
  );

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-beige-100">
      <div className="mb-12">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-6 text-center">Nuestra Colección</h2>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
          Descubre nuestra exquisita selección de productos de belleza, diseñados para realzar tu belleza natural y elevar tu rutina diaria.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
        <div className="relative flex-grow max-w-md w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-pink-500 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <Filter size={20} />
            </div>
          </div>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full transition duration-300 flex items-center"
          >
            <ShoppingBag size={24} />
            <span className="ml-2 font-semibold">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 bg-white p-6 rounded-lg shadow-md">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart}
            openProductDetail={openProductDetail}
          />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-12">No se encontraron productos que coincidan con su búsqueda.</p>
      )}
      
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          closeProductDetail={closeProductDetail}
          addToCart={addToCart}
        />
      )}
      
      <Cart 
        isOpen={isCartOpen} 
        setIsOpen={setIsCartOpen} 
        cart={cart} 
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default ProductsGrid;