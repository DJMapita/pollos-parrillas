import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, Trash2, MessageSquare } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onBackToMenu: () => void;
  onProceedToForm: () => void;
  onUpdateInstructions: (itemId: string, instructions: string) => void;
}

export default function Cart({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onBackToMenu,
  onProceedToForm,
  onUpdateInstructions
}: CartProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-black text-white p-4 flex items-center shadow-lg border-b border-orange-500">
          <button onClick={onBackToMenu} className="mr-4 hover:bg-gray-800 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Mi Carrito</h1>
            <p className="text-gray-300 text-sm">{itemCount} producto{itemCount !== 1 ? 's' : ''}</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <MessageSquare className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-8">Agrega algunos deliciosos platos para comenzar</p>
            <button
              onClick={onBackToMenu}
              className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors"
            >
              Ver Menú
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-black text-white p-4 flex items-center shadow-lg border-b border-orange-500">
        <button onClick={onBackToMenu} className="mr-4 hover:bg-gray-800 p-2 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl font-bold">Mi Carrito</h1>
          <p className="text-gray-300 text-sm">{itemCount} producto{itemCount !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 p-4 space-y-4 pb-32">
        {cart.map(item => (
          <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-orange-600 font-bold text-xl mb-3">S/ {item.price.toFixed(2)}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-3 py-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-lg min-w-[20px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-orange-500 hover:bg-orange-50 p-2 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mt-3 text-right">
                    <span className="text-gray-800 font-bold">
                      Subtotal: S/ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                  className="text-orange-500 text-sm font-medium flex items-center space-x-2 hover:text-orange-600 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Agregar instrucciones especiales</span>
                </button>

                {expandedItem === item.id && (
                  <div className="mt-3">
                    <textarea
                      placeholder="Ej: Sin cebolla, punto medio, salsa aparte..."
                      value={item.specialInstructions || ''}
                      onChange={(e) => onUpdateInstructions(item.id, e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl resize-none text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-700">Total:</span>
            <span className="text-2xl font-bold text-orange-600">S/ {total.toFixed(2)}</span>
          </div>

          <button
            onClick={onProceedToForm}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg transition-colors shadow-lg"
          >
            Continuar con el Pedido
          </button>
        </div>
      </div>
    </div>
  );
}