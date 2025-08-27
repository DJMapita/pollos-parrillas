import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag, Tag, History, User } from 'lucide-react';
import { menuItems, categories } from '../data/menu';
import { getCustomerProfile } from '../utils/storage';

interface MenuProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onViewCart: () => void;
  onViewHistory?: () => void;
}

export default function Menu({ cart, onAddToCart, onUpdateQuantity, onViewCart, onViewHistory }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState('pollos');
  const customerProfile = getCustomerProfile();

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getItemQuantity = (itemId: string) => {
    const cartItem = cart.find(item => item.id === itemId);
    return cartItem?.quantity || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white p-4 sticky top-0 z-40 shadow-lg border-b border-orange-500">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-center">Nuestra Carta</h1>
            <p className="text-center text-gray-300 text-sm">Los mejores sabores de Chorrillos</p>
          </div>
          {customerProfile && customerProfile.orderHistory.length > 0 && onViewHistory && (
            <button
              onClick={onViewHistory}
              className="ml-4 p-2 hover:bg-gray-800 rounded-full transition-colors"
              title="Ver historial"
            >
              <History className="w-6 h-6 text-orange-500" />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white shadow-sm sticky top-16 z-30">
        <div className="overflow-x-auto">
          <div className="flex space-x-1 p-4 min-w-max">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${selectedCategory === category.id
                    ? 'bg-orange-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 pb-24">
        <div className="grid gap-6">
          {filteredItems.map(item => {
            const quantity = getItemQuantity(item.id);
            return (
              <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
  <div className="flex flex-col md:flex-row">
    {/* Imagen primero en móvil */}
    <div className="w-full md:w-[180px] h-[200px] md:h-auto bg-gray-200 relative">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover"
      />
      {item.includesDrink && (
        <img
          src="/bebida.jpg"
          alt="Incluye gaseosa"
          className="absolute top-1 left-1 w-14 h-14 rounded-full shadow-lg"
        />
      )}
      {item.isOffer && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
          %
        </div>
      )}
    </div>

    {/* Contenido */}
    <div className="flex-1 p-6">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
        {item.isOffer && (
          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
            <Tag className="w-3 h-3 mr-1" />
            OFERTA
          </div>
        )}
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.description}</p>

      {/* Precio + botones */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-orange-600">
            S/ {item.price.toFixed(2)}
          </span>
          {item.originalPrice && (
            <span className="text-lg text-gray-400 line-through">
              S/ {item.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Botones cantidad */}
        <div className="flex items-center space-x-3">
          {quantity === 0 ? (
            <button
              onClick={() => onAddToCart(item)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar</span>
            </button>
          ) : (
            <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-3 py-2">
              <button
                onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-lg min-w-[20px] text-center">{quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

            );
          })}
        </div>
      </div>

      {/* Floating Cart Button */}
      {cartItemsCount > 0 && (
        <div className="fixed bottom-4 right-4 left-4 z-50">
          <button
            onClick={onViewCart}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl shadow-lg flex items-center justify-center space-x-3 font-bold text-lg transition-colors"
          >
            <ShoppingBag className="w-6 h-6" />
            <span>Ver Carrito ({cartItemsCount})</span>
            <span>S/ {cartTotal.toFixed(2)}</span>
          </button>
        </div>
      )}
    </div>
  );
}