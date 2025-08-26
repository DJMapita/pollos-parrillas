import React, { useState } from 'react';
import { ArrowLeft, MapPin, User, Phone, Home, MessageSquare, CreditCard, DollarSign, Smartphone, Plus, Trash2, Star } from 'lucide-react';
import { CartItem, OrderData } from '../types';
import { sendOrderToWhatsApp } from '../utils/whatsapp';
import { getCustomerProfile, saveCustomerProfile, initializeCustomerProfile, saveAddress, updateDefaultAddress, deleteAddress, addOrderToHistory } from '../utils/storage';

interface OrderFormProps {
  cart: CartItem[];
  orderType: 'local' | 'delivery';
  tableNumber?: string;
  onBack: () => void;
  onOrderComplete: () => void;
}

export default function OrderForm({ 
  cart, 
  orderType, 
  tableNumber, 
  onBack, 
  onOrderComplete 
}: OrderFormProps) {
  const [tableInput, setTableInput] = useState(tableNumber || '');
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: '',
    district: '',
    reference: ''
  });
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'tarjeta' | 'yape'>('efectivo');
  const [saveAddressOption, setSaveAddressOption] = useState(false);
  const [showSavedAddresses, setShowSavedAddresses] = useState(false);
  const [customerProfile, setCustomerProfile] = useState(() => getCustomerProfile());
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (customerProfile && orderType === 'delivery') {
      setCustomerData(prev => ({
        ...prev,
        name: customerProfile.name,
        phone: customerProfile.phone
      }));
      
      // Cargar dirección predeterminada si existe
      const defaultAddress = customerProfile.savedAddresses.find(addr => addr.isDefault);
      if (defaultAddress) {
        setCustomerData(prev => ({
          ...prev,
          address: defaultAddress.address,
          district: defaultAddress.district,
          reference: defaultAddress.reference
        }));
      }
    }
  }, [customerProfile, orderType]);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSelectSavedAddress = (address: any) => {
    setCustomerData(prev => ({
      ...prev,
      address: address.address,
      district: address.district,
      reference: address.reference
    }));
    setShowSavedAddresses(false);
  };

  const handleDeleteAddress = (addressId: string) => {
    deleteAddress(addressId);
    setCustomerProfile(getCustomerProfile());
  };

  const handleSetDefaultAddress = (addressId: string) => {
    updateDefaultAddress(addressId);
    setCustomerProfile(getCustomerProfile());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generar número de pedido
    const orderNumber = `PB${Date.now().toString().slice(-6)}`;

    const orderData: OrderData = {
      items: cart,
      orderType,
      tableNumber: orderType === 'local' ? tableInput : undefined,
      customerData: orderType === 'delivery' ? customerData : undefined,
      total,
      specialInstructions: specialInstructions || undefined,
      paymentMethod,
      orderNumber,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    try {
      // Simular un pequeño delay para mejor UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Guardar o actualizar perfil del cliente
      if (orderType === 'delivery') {
        let profile = customerProfile;
        if (!profile) {
          profile = initializeCustomerProfile(customerData.name, customerData.phone);
        } else {
          profile.name = customerData.name;
          profile.phone = customerData.phone;
          saveCustomerProfile(profile);
        }
        
        // Guardar dirección si está marcada la opción
        if (saveAddressOption && customerData.address.trim()) {
          const addressExists = profile.savedAddresses.some(addr => 
            addr.address === customerData.address && addr.district === customerData.district
          );
          
          if (!addressExists) {
            saveAddress({
              name: `${customerData.district} - ${customerData.address.substring(0, 30)}...`,
              address: customerData.address,
              district: customerData.district,
              reference: customerData.reference
            });
          }
        }
        
        // Agregar pedido al historial
        addOrderToHistory(orderData);
      }
      
      sendOrderToWhatsApp(orderData);
      onOrderComplete();
    } catch (error) {
      console.error('Error sending order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    if (orderType === 'local') {
      return tableInput.trim() !== '';
    } else {
      return customerData.name.trim() !== '' &&
             customerData.phone.trim() !== '' &&
             customerData.address.trim() !== '' &&
             customerData.district.trim() !== '';
    }
  };

  const paymentMethods = [
    { id: 'efectivo', name: 'Efectivo', icon: DollarSign, description: 'Pago en efectivo al recibir' },
    { id: 'tarjeta', name: 'Tarjeta', icon: CreditCard, description: 'Visa, Mastercard' },
    { id: 'yape', name: 'Yape', icon: Smartphone, description: 'Pago digital instantáneo' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-black text-white p-4 flex items-center shadow-lg border-b border-orange-500">
        <button 
          onClick={onBack} 
          className="mr-4 hover:bg-white/20 p-2 rounded-full transition-colors"
          disabled={isSubmitting}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl font-bold">Finalizar Pedido</h1>
          <p className="text-red-100 text-sm">
            {orderType === 'local' ? 'Pedido en Local' : 'Pedido Delivery'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 p-4 space-y-6 pb-32">
        {/* Order Type Info */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            {orderType === 'local' ? (
              <MapPin className="w-6 h-6 text-orange-500" />
            ) : (
              <Home className="w-6 h-6 text-orange-500" />
            )}
            <h2 className="text-xl font-bold text-gray-800">
              {orderType === 'local' ? 'Información de Mesa' : 'Datos de Entrega'}
            </h2>
          </div>

          {orderType === 'local' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Mesa *
              </label>
              <input
                type="text"
                value={tableInput}
                onChange={(e) => setTableInput(e.target.value)}
                placeholder="Ej: 15"
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                required
                disabled={isSubmitting}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nombre completo *
                </label>
                <input
                  type="text"
                  autoComplete='name'
                  value={customerData.name}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Tu nombre completo"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Teléfono *
                </label>
                <input
                  type="tel"
                  autoComplete='tel'
                  value={customerData.phone}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="987 654 321"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Home className="w-4 h-4 inline mr-2" />
                  Dirección completa *
                </label>
                <input
                  type="text"
                  autoComplete='address'
                  value={customerData.address}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Ej: Av. Lima 123, Miraflores"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Distrito *
                </label>
                <select
                  value={customerData.district}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, district: e.target.value }))}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Selecciona tu distrito</option>
                  <option value="Chorrillos">Chorrillos</option>
                  <option value="Barranco">Barranco</option>
                  <option value="Surco">Surco</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Referencia adicional
                </label>
                <input
                  type="text"
                  value={customerData.reference}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, reference: e.target.value }))}
                  placeholder="Ej: Casa verde, 2do piso, timbre azul"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          )}
        </div>

        {/* Saved Addresses (only for delivery) */}
        {orderType === 'delivery' && customerProfile && customerProfile.savedAddresses.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Direcciones Guardadas</h2>
              <button
                type="button"
                onClick={() => setShowSavedAddresses(!showSavedAddresses)}
                className="text-orange-500 text-sm font-medium hover:text-orange-600"
              >
                {showSavedAddresses ? 'Ocultar' : 'Ver direcciones'}
              </button>
            </div>
            
            {showSavedAddresses && (
              <div className="space-y-3">
                {customerProfile.savedAddresses.map(address => (
                  <div key={address.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium text-gray-800">{address.name}</h3>
                          {address.isDefault && (
                            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full flex items-center">
                              <Star className="w-3 h-3 mr-1" />
                              Predeterminada
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{address.address}</p>
                        <p className="text-sm text-gray-500">{address.district}</p>
                        {address.reference && (
                          <p className="text-xs text-gray-400 mt-1">{address.reference}</p>
                        )}
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <button
                          type="button"
                          onClick={() => handleSelectSavedAddress(address)}
                          className="text-orange-500 text-sm font-medium hover:text-orange-600"
                        >
                          Usar
                        </button>
                        {!address.isDefault && (
                          <button
                            type="button"
                            onClick={() => handleSetDefaultAddress(address.id)}
                            className="text-gray-500 text-xs hover:text-gray-600"
                          >
                            Predeterminada
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-orange-400 text-xs hover:text-orange-500"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Save Address Option (only for delivery) */}
        {orderType === 'delivery' && (
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={saveAddressOption}
                onChange={(e) => setSaveAddressOption(e.target.checked)}
                className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                disabled={isSubmitting}
              />
              <div>
                <span className="font-medium text-gray-800">Guardar esta dirección</span>
                <p className="text-sm text-gray-600">Para futuros pedidos más rápidos</p>
              </div>
            </label>
          </div>
        )}

        {/* Payment Method */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            <CreditCard className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-800">Forma de Pago</h2>
          </div>
          
          <div className="grid gap-3">
            {paymentMethods.map(method => {
              const IconComponent = method.icon;
              return (
                <label
                  key={method.id}
                  className={`flex items-center space-x-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === method.id
                      ? 'border-orange-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="sr-only"
                    disabled={isSubmitting}
                  />
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    paymentMethod === method.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  {paymentMethod === method.id && (
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {/* Special Instructions */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            <MessageSquare className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-800">Instrucciones Especiales</h2>
          </div>
          <textarea
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Alguna observación adicional para tu pedido..."
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            rows={4}
            disabled={isSubmitting}
          />
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Resumen del Pedido</h2>
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-500 ml-2">x{item.quantity}</span>
                </div>
                <span className="font-bold text-orange-600">
                  S/ {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between items-center text-xl">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-orange-600">S/ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!isFormValid() || isSubmitting}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-lg transition-colors shadow-lg flex items-center justify-center"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span>Enviando Pedido...</span>
            </div>
          ) : (
            `Enviar Pedido por WhatsApp - S/ ${total.toFixed(2)}`
          )}
        </button>
      </div>
    </div>
  );
}