import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './subcomponents/Navbar';
import Home from './components/Home';
import ModelsManagement from './components/ModelsManagement';
import ProductsGrid from './subcomponents/ProductsGrid';

import FashionEvents from './components/FashionEvents';
import PhotoSales from './components/PhotoSales';
import ExclusiveMemberships from './components/ExclusiveMemberships';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/models" element={<ModelsManagement />} />
            <Route path="/products" element={<ProductsGrid />} />
            <Route path="/events" element={<FashionEvents />} />
            <Route path="/photos" element={<PhotoSales />} />
            <Route path="/memberships" element={<ExclusiveMemberships />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;