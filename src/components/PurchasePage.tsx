import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../subcomponents/PhotoSalesComps/Button';
import { Card, CardContent } from '../subcomponents/PhotoSalesComps/simpleCard';
import { ChevronLeft, CreditCard } from 'lucide-react';

interface Photo {
  id: number;
  src: string;
  alt: string;
  price: number;
}

interface PurchasePageProps {
  photos: Photo[];
}

const PurchasePage: React.FC<PurchasePageProps> = ({ photos }) => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState('');

  const photo = photos.find(p => p.id === Number(id));
  
  if (!photo || !type) {
    return <div>Photo or type not found</div>;
  }

  // Now TypeScript knows type is defined
  const price = type === 'digital' ? photo.price : photo.price * 1.5;
  const total = price * quantity;
  const capitalizedType = type ? type.charAt(0).toUpperCase() + type.slice(1) : '';

  const handlePurchase = () => {
    alert(`Thank you for your purchase of ${quantity} ${type} ${quantity > 1 ? 'copies' : 'copy'} of "${photo.alt}"!`);
    navigate('/');
  };

  return (
    <div className="bg-white min-h-screen p-8">
      <Button onClick={() => navigate('/')} className="mb-6">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Gallery
      </Button>
      <Card className="max-w-2xl mx-auto">
        <CardContent>
          <h1 className="text-3xl font-bold text-pink-800 mb-6">Purchase {capitalizedType} Photo</h1>
          <div className="flex mb-6">
            <img src={photo.src} alt={photo.alt} className="w-1/2 h-64 object-cover rounded-lg" />
            <div className="ml-6">
              <h2 className="text-xl font-semibold mb-2">{photo.alt}</h2>
              <p className="text-lg font-bold text-pink-600 mb-4">${price.toFixed(2)}</p>
              <div className="flex items-center mb-4">
                <label htmlFor="quantity" className="mr-2">Quantity:</label>
                <input 
                  type="number" 
                  id="quantity" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  className="border rounded px-2 py-1 w-16"
                  min="1"
                />
              </div>
              {type === 'print' && (
                <div className="mb-4">
                  <label htmlFor="shipping" className="block mb-2">Shipping Address:</label>
                  <textarea 
                    id="shipping" 
                    value={shippingAddress} 
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                    rows={3}
                  />
                </div>
              )}
              <p className="text-xl font-bold mb-4">Total: ${total.toFixed(2)}</p>
              <Button onClick={handlePurchase} className="w-full">
                <CreditCard className="mr-2 h-4 w-4" /> Purchase Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchasePage;