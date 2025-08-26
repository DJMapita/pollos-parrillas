import React from 'react';
import { CheckCircle, MessageCircle, Phone, Home } from 'lucide-react';

interface OrderConfirmationProps {
  orderType: 'local' | 'delivery';
  onStartOver: () => void;
}

export default function OrderConfirmation({ orderType, onStartOver }: OrderConfirmationProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-2xl">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle className="w-16 h-16 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">¡Pedido Enviado!</h1>
          <p className="text-gray-600 leading-relaxed">
            Tu pedido ha sido enviado exitosamente por WhatsApp a nuestra cocina.
          </p>
        </div>

        {/* Order Type Info */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-center space-x-3 mb-3">
            {orderType === 'local' ? (
              <Home className="w-6 h-6 text-orange-500" />
            ) : (
              <Phone className="w-6 h-6 text-orange-500" />
            )}
            <h2 className="font-bold text-lg">
              {orderType === 'local' ? 'Pedido en Local' : 'Pedido Delivery'}
            </h2>
          </div>
          <p className="text-gray-600 text-sm">
            {orderType === 'local' 
              ? 'Te atenderemos en tu mesa lo más pronto posible'
              : 'Nos comunicaremos contigo para confirmar la entrega'
            }
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-orange-50 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <MessageCircle className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-orange-600">¿Alguna duda?</h3>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            Contáctanos directamente:
          </p>
          <div className="space-y-2 text-sm">
            <p><strong>WhatsApp:</strong> +51 927 272 866</p>
            <p><strong>Teléfono:</strong> (51) 927 272 866</p>
          </div>
        </div>

        {/* Time Estimate */}
        <div className="bg-orange-50 rounded-2xl p-4 mb-8">
          <p className="text-sm text-orange-700">
            <strong>Tiempo estimado:</strong> {orderType === 'local' ? '15-20 min' : '30-45 min'}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={onStartOver}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg transition-colors"
          >
            Hacer Nuevo Pedido
          </button>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              ¡Gracias por preferirnos! 🔥
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}