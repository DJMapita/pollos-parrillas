import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, ArrowRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Tecnología LED de Vanguardia',
    subtitle: 'Iluminación profesional para minería',
    description: 'Descubre nuestras lámparas mineras con la más avanzada tecnología LED, diseñadas para ofrecer máxima luminosidad y durabilidad en las condiciones más extremas.',
    buttonText: 'Ver Productos',
    buttonLink: '#productos'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Carga Inalámbrica Inteligente',
    subtitle: 'Innovación en cada detalle',
    description: 'Experimenta la comodidad de la carga inalámbrica con nuestros sistemas de última generación. Tecnología que simplifica tu trabajo diario.',
    buttonText: 'Conocer Más',
    buttonLink: '#nosotros'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Certificación Internacional',
    subtitle: 'Calidad garantizada mundialmente',
    description: 'Todos nuestros productos cuentan con certificaciones ATEX, IECEx y MSHA, garantizando los más altos estándares de seguridad y calidad.',
    buttonText: 'Ver Certificaciones',
    buttonLink: '#contacto'
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Soporte Técnico Especializado',
    subtitle: 'Acompañamiento integral',
    description: 'Contamos con un equipo de especialistas listos para brindarte el mejor soporte técnico y asesoramiento personalizado para tu proyecto.',
    buttonText: 'Contactar',
    buttonLink: '#contacto'
  }
];

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[600px] overflow-hidden bg-gray-900">
      {/* Banner Images */}
      <div className="relative h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`transition-all duration-700 ${
                  index === currentSlide
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-8'
                }`}
                style={{ display: index === currentSlide ? 'block' : 'none' }}
              >
                <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-2 mb-6 border border-white/20">
                  <span className="text-sm font-medium text-orange-200">
                    {banner.subtitle}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {banner.title}
                </h1>
                
                <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
                  {banner.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={banner.buttonLink}
                    className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-glow transform hover:scale-105"
                  >
                    {banner.buttonText}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                  
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="group glass-effect text-white hover:bg-white/20 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center transform hover:scale-105"
                  >
                    <Play className={`w-5 h-5 mr-2 transition-transform duration-300 ${isAutoPlaying ? 'rotate-0' : 'rotate-90'}`} />
                    {isAutoPlaying ? 'Pausar' : 'Reproducir'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-orange-500 scale-125 shadow-lg'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300"
          style={{
            width: `${((currentSlide + 1) / banners.length) * 100}%`
          }}
        />
      </div>
    </section>
  );
};

export default BannerCarousel;