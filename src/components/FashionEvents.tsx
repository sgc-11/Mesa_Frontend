import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import mockEvents from '../DATA/EventsData';
import { FashionEvent } from '../DATA/EventsData';


const FashionEvents: React.FC = () => {
  const [events] = useState<FashionEvent[]>(mockEvents);

  useEffect(() => {
    // Fetch events from API and update state
    // setEvents(fetchedEvents);
  }, []);

  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-pink-500 hover:bg-pink-600 p-2 rounded-full shadow-lg transition-all duration-300"
        onClick={onClick}
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
    );
  };

  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-pink-500 hover:bg-pink-600 p-2 rounded-full shadow-lg transition-all duration-300"
        onClick={onClick}
      >
        <ChevronRight className="text-white" size={24} />
      </button>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,

  };

  return (
    <div className="bg-gradient-to-b from-pink-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-pink-600 mb-12 text-center">Próximos Eventos de Moda</h1>
        <Slider {...settings}>
          {events.map((event) => (
            <div key={event.id} className="px-4">
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 relative">
                    <img className="h-96 w-full object-cover md:w-96" src={event.images[0]} alt={event.title} />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pink-600 to-transparent p-6">
                      <h2 className="text-3xl font-bold text-white leading-tight">{event.title}</h2>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-4">
                        <Calendar size={20} className="text-pink-500 mr-2" />
                        <span className="text-lg text-gray-700">{event.date}</span>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin size={20} className="text-pink-500 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock size={20} className="text-pink-500 mr-2" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-pink-600 mb-4">Modelos Participantes</h3>
                      <div className="flex flex-wrap -mx-2">
                        {event.models.map((model) => (
                          <div key={model.id} className="px-2 mb-4">
                            <div className="flex items-center bg-pink-50 rounded-full px-4 py-2">
                              <img className="h-10 w-10 rounded-full mr-3 border-2 border-pink-300" src={model.image} alt={model.name} />
                              <span className="text-gray-700 font-medium">{model.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-8 py-6 bg-pink-50">
                  <h3 className="text-2xl font-semibold text-pink-600 mb-4">Galería del Evento</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {event.images.slice(1).map((image, index) => (
                      <img 
                        key={index} 
                        className="h-32 w-full object-cover rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105" 
                        src={image} 
                        alt={`Imagen del evento ${index + 1}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FashionEvents;