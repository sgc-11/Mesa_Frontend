import React, { useState } from 'react';
import { Grid, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../subcomponents/PhotoSalesComps/Button';
import PhotoCard from '../subcomponents/PhotoSalesComps/PhotoCard';

export interface Photo {
  id: number;
  src: string;
  alt: string;
  price: number;
}

const photos: Photo[] = [
  { id: 1, src: 'src/assets/imagesell_2.webp', alt: 'Nature landscape', price: 19.99 },
  { id: 2, src: 'src/assets/sellImage_3.jpg', alt: 'City skyline', price: 24.99 },
  { id: 3, src: 'src/assets/imagesell_4.jpg', alt: 'Portrait', price: 29.99 },
  { id: 4, src: 'src/assets/sellimage_5.jpg', alt: 'Abstract art', price: 34.99 },
];

const PhotoSales: React.FC = () => {
  const [currentView, setCurrentView] = useState<'grid' | 'slider'>('grid');
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="bg-white min-h-screen">
      <header className="bg-pink-100 py-6">
        <h1 className="text-4xl font-bold text-pink-800 text-center">Photo Gallery</h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentView('grid')}
              className={currentView === 'grid' ? 'bg-pink-100' : ''}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentView('slider')}
              className={currentView === 'slider' ? 'bg-pink-100' : ''}
            >
              <ChevronLeft className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-pink-800">Showing {photos.length} photos</div>
        </div>
        {currentView === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        ) : (
          <div className="relative">
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {photos.map((photo) => (
                  <div key={photo.id} className="w-full flex-shrink-0">
                    <PhotoCard photo={photo} />
                  </div>
                ))}
              </div>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PhotoSales;