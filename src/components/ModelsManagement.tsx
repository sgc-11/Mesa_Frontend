import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Instagram, Facebook, Twitter } from 'lucide-react';
import mockModels from '../DATA/ModelsData';

const ModelsManagement = () => {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [models] = useState(mockModels);

  useEffect(() => {
    // Fetch models from API and update state
    // setModels(fetchedModels);
  }, []);

  const currentModel = models[currentModelIndex];

  const nextModel = () => {
    setCurrentModelIndex((prevIndex) => (prevIndex + 1) % models.length);
    setCurrentImageIndex(0);
  };

  const prevModel = () => {
    setCurrentModelIndex((prevIndex) => (prevIndex - 1 + models.length) % models.length);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % currentModel.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + currentModel.images.length) % currentModel.images.length);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-2 sm:px-4 lg:px-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Our Models</h2>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Model Image Carousel */}
          <div className="relative w-full lg:w-2/3">
            <img
              src={currentModel.images[currentImageIndex]}
              alt={currentModel.name}
              className="w-full h-[400px] object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{currentModel.name}</h3>
              <div className="flex flex-wrap gap-2">
                {currentModel.specialties.map((specialty, index) => (
                  <span key={index} className="bg-pink-500 text-white px-2 py-1 rounded-full text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute top-1/2 left-4 right-4 transform -translate-y-1/2 flex justify-between">
              <button onClick={prevImage} className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2">
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button onClick={nextImage} className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2">
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Model Info */}
          <div className="w-full lg:w-1/3 p-6 bg-gray-50 flex flex-col justify-between">
            <div>
              <div className="space-y-3 text-gray-600 text-sm">
                <p><span className="font-semibold text-pink-600">Age:</span> {currentModel.age} years</p>
                <p><span className="font-semibold text-pink-600">Height:</span> {currentModel.height}</p>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Biography</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {currentModel.bio}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-center space-x-4 mb-4">
                <a href={currentModel.instagram} className="text-pink-600 hover:text-pink-700 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href={currentModel.facebook} className="text-pink-600 hover:text-pink-700 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href={currentModel.twitter} className="text-pink-600 hover:text-pink-700 transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-full text-sm font-semibold transition duration-300 transform hover:scale-105">
                Book This Model
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <button onClick={prevModel} className="bg-white text-pink-600 border border-pink-600 hover:bg-pink-50 px-4 py-2 rounded-full text-sm">
          Previous Model
        </button>
        <button onClick={nextModel} className="bg-white text-pink-600 border border-pink-600 hover:bg-pink-50 px-4 py-2 rounded-full text-sm">
          Next Model
        </button>
      </div>
    </div>
  );
};

export default ModelsManagement;
