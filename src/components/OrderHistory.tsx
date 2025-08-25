import React from 'react';
import { ArrowLeft, Clock, MapPin, Home, DollarSign, CreditCard, Smartphone } from 'lucide-react';
import { OrderData } from '../types';
import { getCustomerProfile } from '../utils/storage';

interface OrderHistoryProps {
  onBack: () => void;
  onReorder: (order: OrderData) => void;
}

export default function OrderHistory({ onBack, onReorder }: OrderHistoryProps) {
  const customerProfile = getCustomerProfile();
  const orders = customerProfile?.orderHistory || [];

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'efectivo': return DollarSign;
      case 'tarjeta': return CreditCard;
      case 'yape': return Smartphone;
      default: return DollarSign;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmado';
      case 'preparing': return 'Preparando';
      case 'ready': return 'Listo';
      case 'delivered': return 'Entregado';
      default: return 'Desconocido';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4 flex items-center">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Historial de Pedidos</h1>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <Clock className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sin pedidos anteriores</h2>
            <p className="text-gray-600 mb-8">Cuando realices tu primer pedido, aparecerá aquí</p>
            <button
              onClick={onBack}
              className="bg-red-500 text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 transition-colors"
            >
              Hacer Pedido
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4 flex items-center shadow-lg">
        <button onClick={onBack} className="mr-4 hover:bg-white/20 p-2 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl font-bold">Historial de Pedidos</h1>
          <p className="text-red-100 text-sm">{orders.length} pedido{orders.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1 p-4 space-y-4">
        {orders.map((order, index) => {
          const PaymentIcon = getPaymentIcon(order.paymentMethod || 'efectivo');
          const orderDate = new Date(order.timestamp || '');
          
          return (
            <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-6">
                {/* Order Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-bold text-lg text-gray-800">
                        Pedido #{order.orderNumber}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status || 'pending')}`}>
                        {getStatusText(order.status || 'pending')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{orderDate.toLocaleDateString('es-PE')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {order.orderType === 'local' ? (
                          <Home className="w-4 h-4" />
                        ) : (
                          <MapPin className="w-4 h-4" />
                        )}
                        <span>
                          {order.orderType === 'local' 
                            ? `Mesa ${order.tableNumber}` 
                            : 'Delivery'
                          }
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <PaymentIcon className="w-4 h-4" />
                        <span className="capitalize">{order.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600">
                      S/ {order.total.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <div className="space-y-2">
                    {order.items.slice(0, 3).map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium text-gray-800">
                          S/ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="text-sm text-gray-500">
                        +{order.items.length - 3} producto{order.items.length - 3 !== 1 ? 's' : ''} más
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => onReorder(order)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition-colors"
                  >
                    Pedir de Nuevo
                  </button>
                  <button className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}