import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Pollos
  {
    id: '1',
    name: 'Pollo Entero a la Brasa',
    description: 'Pollo entero dorado a la perfección, marinado con especias secretas y cocido a la brasa',
    price: 45,
    category: 'pollos',
    image: 'https://images.pexels.com/photos/2374946/pexels-photo-2374946.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    name: '1/2 Pollo a la Brasa',
    description: 'Medio pollo jugoso con nuestra sazón especial, acompañado de papas fritas y ensalada',
    price: 25,
    category: 'pollos',
    image: 'https://images.pexels.com/photos/2773533/pexels-photo-2773533.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    name: '1/4 Pollo a la Brasa',
    description: 'Cuarto de pollo ideal para una persona, incluye papas fritas',
    price: 15,
    category: 'pollos',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    name: 'Combo Familiar',
    description: 'Pollo entero + papas grandes + ensalada + gaseosa familiar',
    price: 65,
    originalPrice: 75,
    isOffer: true,
    category: 'pollos',
    image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  
  // Parrillas
  {
    id: '5',
    name: 'Parrilla Mixta',
    description: 'Anticuchos, chorizo, morcilla y mollejitas. Para compartir (2-3 personas)',
    price: 35,
    category: 'parrillas',
    image: 'https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '6',
    name: 'Anticuchos de Corazón',
    description: '6 anticuchos de corazón de res, marinados y asados a la parrilla',
    price: 18,
    category: 'parrillas',
    image: 'https://images.pexels.com/photos/7218637/pexels-photo-7218637.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '7',
    name: 'Chorizo Criollo',
    description: 'Chorizo artesanal a la parrilla, servido con pan y salsa criolla',
    price: 12,
    category: 'parrillas',
    image: 'https://images.pexels.com/photos/3926124/pexels-photo-3926124.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // Acompañamientos
  {
    id: '8',
    name: 'Papas Fritas Grandes',
    description: 'Papas cortadas a mano y fritas hasta dorar',
    price: 8,
    category: 'acompañamientos',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '9',
    name: 'Ensalada Mixta',
    description: 'Lechuga, tomate, pepino, cebolla roja con vinagreta',
    price: 6,
    category: 'acompañamientos',
    image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '10',
    name: 'Arroz con Frijoles',
    description: 'Arroz blanco con menestras de frijoles canarios',
    price: 10,
    category: 'acompañamientos',
    image: 'https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // Bebidas
  {
    id: '11',
    name: 'Inca Kola 1.5L',
    description: 'La bebida del sabor nacional',
    price: 8,
    category: 'bebidas',
    image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '12',
    name: 'Chicha Morada',
    description: 'Chicha morada natural con piña y canela',
    price: 5,
    category: 'bebidas',
    image: 'https://images.pexels.com/photos/1233319/pexels-photo-1233319.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // Postres
  {
    id: '13',
    name: 'Picarones',
    description: '6 picarones caseros con miel de chancaca',
    price: 8,
    category: 'postres',
    image: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const categories = [
  { id: 'pollos', name: 'Pollos a la Brasa', icon: '🔥' },
  { id: 'parrillas', name: 'Parrillas', icon: '🥩' },
  { id: 'acompañamientos', name: 'Acompañamientos', icon: '🍟' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤' },
  { id: 'postres', name: 'Postres', icon: '🍰' }
];