import React, { useEffect, useState } from 'react';
import { Flame, MapPin, Truck, Clock, Star, History } from 'lucide-react';
import { getCustomerProfile } from '../utils/storage';

interface LandingProps {
  onSelectOrderType: (type: 'local' | 'delivery', tableNumber?: string) => void;
  onViewHistory?: () => void;
}

export default function Landing({ onSelectOrderType, onViewHistory }: LandingProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [isFromQR, setIsFromQR] = useState(false);
  const [detectedTable, setDetectedTable] = useState<string | null>(null);
  const customerProfile = getCustomerProfile();

  useEffect(() => {
    // Detectar si viene de QR de mesa
    const urlParams = new URLSearchParams(window.location.search);
    const tableNumber = urlParams.get('mesa');
    
    if (tableNumber) {
      setIsFromQR(true);
      setDetectedTable(tableNumber);
      // Auto-seleccionar local después de 2 segundos
      setTimeout(() => {
        onSelectOrderType('local', tableNumber);
      }, 2000);
    } else {
      // Mostrar opciones después de la animación
      setTimeout(() => setShowOptions(true), 1500);
    }
  }, [onSelectOrderType]);

  if (isFromQR && detectedTable) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-orange-900 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <div className="animate-bounce mb-8">
            <img 
              src="/GranPollonLogo.png" 
              alt="Logo" 
              className="w-24 h-24 mx-auto"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">¡Bienvenido!</h1>
          <p className="text-xl mb-2">Mesa #{detectedTable} detectada</p>
          <p className="text-orange-200">Redirigiendo al menú...</p>
          <div className="flex justify-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-stone-950 to-orange-700 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-orange-400 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-yellow-400 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-red-400 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center pt-12 pb-8">
          <div className="animate-fadeInDown">
            <img 
              src="/RestauranteLogo.png" 
              alt="Logo" 
              className="w-32 h-32 mx-auto"
            />
            <h1 className="text-5xl md:text-7xl font-bold text-orange-600 mb-4">
              Tu restaurante
            </h1>
            <p className="text-xl md:text-2xl text-orange-200 font-light">
              Pollos & Parrillas
            </p>
            <div className="flex justify-center mt-4">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full">
            {!showOptions ? (
              <div className="text-center text-white animate-pulse">
                <Clock className="w-16 h-16 mx-auto mb-4 text-orange-400" />
                <p className="text-2xl">Preparando tu experiencia...</p>
              </div>
            ) : (
              <div className="animate-fadeInUp">
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                  ¿Cómo deseas realizar tu pedido?
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  {/* Opción Local */}
                  <div 
                    onClick={() => onSelectOrderType('local')}
                    className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center cursor-pointer transform hover:scale-105 transition-all duration-300 hover:bg-white/20 border border-white/20"
                  >
                    <div className="mb-6">
                      <MapPin className="w-20 h-20 mx-auto text-orange-400 group-hover:text-orange-300 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Estoy en el Local</h3>
                    <p className="text-orange-100 mb-6 leading-relaxed">
                      Ordena desde tu mesa y disfruta de nuestros pollos a la brasa recién hechos
                    </p>
                    <div className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold group-hover:bg-orange-400 transition-colors">
                      Seleccionar Mesa
                    </div>
                  </div>

                  {/* Opción Delivery */}
                  <div 
                    onClick={() => onSelectOrderType('delivery')}
                    className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center cursor-pointer transform hover:scale-105 transition-all duration-300 hover:bg-white/20 border border-white/20"
                  >
                    <div className="mb-6">
                      <Truck className="w-20 h-20 mx-auto text-orange-400 group-hover:text-orange-300 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Delivery</h3>
                    <p className="text-orange-100 mb-6 leading-relaxed">
                      Recibe nuestros deliciosos pollos directamente en tu hogar
                    </p>
                    <div className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold group-hover:bg-orange-400 transition-colors">
                      Pedir a Domicilio
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8 text-orange-200">
          {/* History Button */}
          {customerProfile && customerProfile.orderHistory.length > 0 && onViewHistory && (
            <div className="mb-6">
              <button
                onClick={onViewHistory}
                className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all flex items-center space-x-2 mx-auto border border-white/20"
              >
                <History className="w-5 h-5" />
                <span>Ver Historial de Pedidos ({customerProfile.orderHistory.length})</span>
              </button>
            </div>
          )}
          <p className="text-sm">📍 Chorrillos, Lima, Perú • 📞 (51) 978 645 312</p>
          <p className="text-xs mt-2">Abierto todos los días de 10:00 AM a 11:00 PM</p>
        </div>
      </div>
    </div>
  );
}