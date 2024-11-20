import React, { useState, useEffect } from 'react';
import { ArrowRight, Instagram, Facebook, Twitter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import mockModels from '../DATA/ModelsData';
import { media, Media } from '../DATA/mediaData';
import mockProducts from '../DATA/productsData';
import mockEvents from '../DATA/EventsData';
import { Product } from '../tsthings.ts/Product';

export interface Model {
  id: number;
  name: string;
  age: number;
  height: string;
  specialties: string[];
  images: string[];
  instagram: string;
  facebook: string;
  twitter: string;
  bio: string;
}

interface FashionEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  models: { id: number; name: string; image: string; }[];
  images: string[];
}

const Home: React.FC = () => {
  const [featuredModels, setFeaturedModels] = useState<Model[]>([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [featuredEvents, setFeaturedEvents] = useState<FashionEvent[]>([]);

  useEffect(() => {
    const typedMockModels: Model[] = mockModels as Model[];
    const shuffled = [...typedMockModels].sort(() => 0.5 - Math.random());
    setFeaturedModels(shuffled.slice(0, 3));

    // Select up to 4 random products
    const shuffledProducts = [...mockProducts].sort(() => 0.5 - Math.random());
    setFeaturedProducts(shuffledProducts.slice(0, 4));

    // Select up to 3 random events
    const shuffledEvents = [...mockEvents].sort(() => 0.5 - Math.random());
    setFeaturedEvents(shuffledEvents.slice(0, 3));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const nextMedia = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
  };

  const renderMediaItem = (item: Media) => {
    if (item.type === "photo") {
      return (
        <img
          src={item.url}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      );
    } else if (item.type === "video") {
      return (
        <video
          src={item.url}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        />
      );
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-pink-50 min-h-screen">
      {/* Updated Media Carousel */}
      <div className="relative w-full h-[500px] overflow-hidden shadow-2xl mt-6">
        {media.map((item, index) => (
          <div
            key={item.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentMediaIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {renderMediaItem(item)}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            </div>
          </div>
        ))}
        <button
          onClick={prevMedia}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-300"
        >
          <ChevronLeft className="text-pink-600" size={24} />
        </button>
        <button
          onClick={nextMedia}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-300"
        >
          <ChevronRight className="text-pink-600" size={24} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <section className="text-center mb-15">
          <h1 className="text-5xl md:text-6xl font-extrabold text-pink-950 mb-6 leading-tight">
            ¡Bienvenido a Mesa Enterprise!
          </h1>
          <p className="text-xl text-pink-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          <span className='text-stone-900 font-bold'>Welcome Message by Andrea Mesa:</span>
          " We empower individuals through the seductive art of beauty and fashion. Unleash your unique style and embrace your most confident, irresistible self. "
          🔥 Dare to turn heads? Step into a world where beauty knows no limits. Whether you're craving a fierce makeover or exclusive fashion tips, we’re here to ignite your look for any occasion—from everyday glam to jaw-dropping special events. Don't just fit in—dominate. Your transformation starts now. 💋
          </p>
        </section>

        {/* Featured Models Section */}
        <section className="mb-15">
          <h2 className="text-4xl font-bold text-pink-600 mb-12 text-center">Modelos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredModels.map((model) => (
              <div key={model.id} className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105">
                <img
                  src={model.images[0]}
                  alt={model.name}
                  className="w-full h-72 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-2xl mb-3 text-gray-800">{model.name}</h3>
                  <p className="text-gray-600 mb-4">{model.specialties.join(', ')}</p>
                  <Link 
                    to={`/models`} 
                    className="inline-flex items-center text-pink-500 hover:text-pink-600 transition duration-300"
                  >
                    Ver Perfil <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="mb-15 bg-pink-50 rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-pink-600 mb-12 text-center">Productos Destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2 text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 mb-3">{product.description}</p>
                  <p className="text-pink-500 font-bold text-2xl mb-4">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="mb-15">
          <h2 className="text-4xl font-bold text-pink-600 mb-12 text-center">Próximos Eventos</h2>
          <div className="space-y-8">
            {featuredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center">
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                  <img
                    src={event.images[0]}
                    alt={event.title}
                    className="w-24 h-24 object-cover rounded-full"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-2xl mb-3 text-gray-800">{event.title}</h3>
                  <p className="text-gray-600 mb-2">Fecha: {event.date} a las {event.time}</p>
                  <p className="text-gray-600 mb-4">Ubicación: {event.location}</p>
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  <a href="#" className="inline-flex items-center text-pink-500 hover:text-pink-600 transition duration-300">
                     <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Values Section */}
        <section className="bg-pink-50 rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-pink-600 mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Empoderamiento", description: "Creemos en empoderar a las personas para que expresen su belleza y estilo únicos." },
              { title: "Diversidad", description: "Celebramos la diversidad y la inclusividad en todos los aspectos de nuestra marca." },
              { title: "Innovación", description: "Nos esforzamos constantemente por la innovación en productos y experiencias." }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center transform transition duration-300 hover:scale-105">
                <h3 className="font-semibold text-2xl mb-4 text-pink-500">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 bg-pink-100 rounded-t-3xl overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-pink-600">Mesa Enterprise</h3>
                <p className="text-gray-600">Empoderando tu belleza y estilo único.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-pink-600">Contacto</h4>
                <p className="text-gray-600">Email: info@mesaenterprise.com</p>
                <p className="text-gray-600">Teléfono: +1 (555) 123-4567</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-pink-600">Síguenos</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-pink-500 hover:text-pink-600 transition-colors">
                    <Instagram size={24} />
                  </a>
                  <a href="#" className="text-pink-500 hover:text-pink-600 transition-colors">
                    <Facebook size={24} />
                  </a>
                  <a href="#" className="text-pink-500 hover:text-pink-600 transition-colors">
                    <Twitter size={24} />
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-pink-600">Inspiración</h4>
                <p className="text-gray-600 italic">
                  "La belleza comienza en el momento en que decides ser tú misma."
                </p>
                <p className="text-gray-500">- Coco Chanel</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-pink-200 text-center">
              <p className="text-gray-500">
                © {new Date().getFullYear()} Mesa Enterprise. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;