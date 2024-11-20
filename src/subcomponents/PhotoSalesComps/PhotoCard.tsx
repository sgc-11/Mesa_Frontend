import React, { useState } from 'react';
import { Button } from './Button';
import { Download, ShoppingBag } from 'lucide-react';
import { Card, CardContent } from './simpleCard';

interface Photo {
  id: number;
  src: string;
  alt: string;
  price: number;
}

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img src={photo.src} alt={photo.alt} className="w-full h-64 object-cover" />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
            <div className="text-white text-center">
              <h3 className="text-xl font-semibold mb-2">{photo.alt}</h3>
              <p className="text-lg font-bold mb-4">${photo.price}</p>
              <div className="flex space-x-2 justify-center">
                <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-white">
                  <Download className="mr-2 h-4 w-4" /> Digital
                </Button>
                <Button size="sm" variant="outline" className="bg-white text-pink-500 hover:bg-pink-50">
                  <ShoppingBag className="mr-2 h-4 w-4" /> Print
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-pink-800 mb-1">{photo.alt}</h3>
        <p className="text-pink-600 font-bold">${photo.price}</p>
      </CardContent>
    </Card>
  );
};

export default PhotoCard;