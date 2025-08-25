import React, { useState } from 'react';
import Landing from './components/Landing';
import Menu from './components/Menu';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import OrderConfirmation from './components/OrderConfirmation';
import OrderHistory from './components/OrderHistory';
import { CartItem, MenuItem, OrderStep } from './types';
import { menuItems } from './data/menu';

function App() {
  const [currentStep, setCurrentStep] = useState<OrderStep>('landing');
  const [orderType, setOrderType] = useState<'local' | 'delivery'>('local');
  const [tableNumber, setTableNumber] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleSelectOrderType = (type: 'local' | 'delivery', table?: string) => {
    setOrderType(type);
    if (table) {
      setTableNumber(table);
    }
    setCurrentStep('menu');
  };

  const handleAddToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      setCart(cart.filter(item => item.id !== itemId));
    } else {
      setCart(cart.map(item => 
        item.id === itemId 
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const handleUpdateInstructions = (itemId: string, instructions: string) => {
    setCart(cart.map(item => 
      item.id === itemId 
        ? { ...item, specialInstructions: instructions }
        : item
    ));
  };

  const handleStartOver = () => {
    setCurrentStep('landing');
    setCart([]);
    setOrderType('local');
    setTableNumber('');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'landing':
        return (
          <Landing 
            onSelectOrderType={handleSelectOrderType}
          />
        );
      
      case 'menu':
        return (
          <Menu 
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onViewCart={() => setCurrentStep('cart')}
          />
        );
      
      case 'cart':
        return (
          <Cart 
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onBackToMenu={() => setCurrentStep('menu')}
            onProceedToForm={() => setCurrentStep('form')}
            onUpdateInstructions={handleUpdateInstructions}
          />
        );
      
      case 'form':
        return (
          <OrderForm 
            cart={cart}
            orderType={orderType}
            tableNumber={tableNumber}
            onBack={() => setCurrentStep('cart')}
            onOrderComplete={() => setCurrentStep('confirmation')}
          />
        );
      
      case 'confirmation':
        return (
          <OrderConfirmation 
            orderType={orderType}
            onStartOver={handleStartOver}
          />
        );
      
      default:
        return <Landing onSelectOrderType={handleSelectOrderType} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentStep()}
    </div>
  );
}

export default App;