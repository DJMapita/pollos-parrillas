import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Pollos
  {
    id: '1',
    name: 'POLLO A LA BRASA & 1/4',
    description: 'Pollo & 1/4 + papas fritas + ensalada. Ideal para 4-5 personas',
    price: 76,
    category: 'pollos',
    image: 'pollo/pollo_cuarto.png'
  },
  {
    id: '2',
    name: 'POLLO A LA BRASA & 1/4 + Gaseosa 1.5L',
    description: 'Pollo & 1/4 + papas fritas + ensalada + gaseosa 1.5L . Ideal para 4-5 personas',
    price: 85,
    category: 'pollos',
    image: 'pollo/pollo_cuarto.png',
    includesDrink: true 
  },
  {
    id: '3',
    name: 'POLLO A LA BRASA + Gaseosa 1.5L',
    description: 'Pollo + papas fritas + ensalada + Gaseosa 1.5L. Ideal para 3-4 personas',
    price: 74,
    category: 'pollos',
    image: 'pollo/pollo.png',
    includesDrink: true 
  },
  {
    id: '4',
    name: 'POLLO A LA BRASA',
    description: 'Pollo + papas fritas + ensalada. Ideal para 3-4 personas',
    price: 76,
    category: 'pollos',
    image: 'pollo/pollo.png'
  },
  
  // Parrillas
  {
    id: '5',
    name: 'CHURRASCO DE 250 GR.',
    description: '6 Mollejas + 1 Chorizo + Papas fritas + Ensalada',
    price: 30,
    category: 'parrillas',
    image: 'parrilla/churrasco.png'
  },
  {
    id: '6',
    name: 'PECHUGA A LA PARRILLA DE 250 GR.',
    description: '6 mollejas + 1 chorizo parrillero + papas fritas + ensalada',
    price: 25,
    category: 'parrillas',
    image: 'parrilla/pechuga.png'
  },
  {
    id: '7',
    name: 'CHULETA DE 250 GR.',
    description: 'Chorizo artesanal a la parrilla, servido con pan y salsa criolla',
    price: 28,
    category: 'parrillas',
    image: 'parrilla/chuleta.png'
  },
  {
    id: '8',
    name: 'BRASA PARRILLA',
    description: '1/4 de pollo + 2 palitos anticuchos + 1 chorizo + papas fritas + ensalada',
    price: 30,
    category: 'parrillas',
    image: 'parrilla/brasa.png'
  },

  // Acompañamientos
  {
    id: '9',
    name: 'Papas Fritas Grandes',
    description: 'Papas cortadas a mano y fritas hasta dorar',
    price: 8,
    category: 'acompañamientos',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '10',
    name: 'Ensalada Mixta',
    description: 'Lechuga, tomate, pepino, cebolla roja con vinagreta',
    price: 6,
    category: 'acompañamientos',
    image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '11',
    name: 'Arroz con Frijoles',
    description: 'Arroz blanco con menestras de frijoles canarios',
    price: 10,
    category: 'acompañamientos',
    image: 'https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // Bebidas
  {
    id: '12',
    name: 'Inca Kola 1.5L',
    description: 'La bebida del sabor nacional',
    price: 8,
    category: 'bebidas',
    image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '13',
    name: 'Chicha Morada',
    description: 'Chicha morada natural con piña y canela',
    price: 5,
    category: 'bebidas',
    image: 'https://images.pexels.com/photos/1233319/pexels-photo-1233319.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // Postres
  {
    id: '14',
    name: 'Picarones',
    description: '6 picarones caseros con miel de chancaca',
    price: 8,
    category: 'postres',
    image: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  //Broaster
  {
    id: '15',
    name: '1/4 DE BROASTER',
    description: 'papas fritas + ensalada',
    price: 20,
    category: 'broaster',
    image: '/broaster/broaster.webp'
  },
  {
    id: '16',
    name: '1/4 DE BROASTER CON CHAUFA',
    description: 'papas fritas + ensalada',
    price: 22,
    category: 'broaster',
    image: '/broaster/broaster_chaufa.png'
  },
  {
    id: '17',
    name: '1/8 DE BROASTER + CHAUFA',
    description: 'CHAUFA + papas fritas + ensalada',
    price: 13,
    category: 'broaster',
    image: '/broaster/broaster_chaufa.png'
  },
  {
    id: '18',
    name: '1/8 DE BROASTER + CHAUFA + GASEOSA DE 355ML',
    description: 'CHAUFA + papas fritas + ensalada + gaseosa de 355ml',
    price: 14,
    category: 'broaster',
    image: '/broaster/broaster_chaufa.png'
  },
  {
    id: '19',
    name: '1/8 DE BROASTER A LO POBRE',
    description: 'papas fritas + platano + huevo frito +  ensalada',
    price: 18,
    category: 'broaster',
    image: 'broaster/broaster_mas_pobre.png'
  },
  {
    id: '20',
    name: 'BROASTER FAMILIAR',
    description: '10 piezas de pollo broaster + papas fritas + ensalada',
    price: 75,
    category: 'broaster',
    image: '/broaster/broaster.webp'
  },
  {
    id: '21',
    name: 'BROASTER MEDIANO',
    description: '5 piezas de pollo broaster + papas fritas + ensalada',
    price: 45,
    category: 'broaster',
    image: '/broaster/broaster.webp'
  },
  {
    id: '22',
    name: '1/4 DE BROASTER A LO POBRE',
    description: 'papas fritas + platano + huevo frito +  ensalada',
    price: 24,
    category: 'broaster',
    image: '/broaster/broaster_pobre.png'
  }
];

export const categories = [
  { id: 'pollos', name: 'Pollos a la Brasa', icon: '🔥' },
  { id: 'parrillas', name: 'Parrillas', icon: '🥩' },
  { id: 'broaster', name: 'Broaster', icon: '🍗' },
  { id: 'acompañamientos', name: 'Acompañamientos', icon: '🍟' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤' },
  { id: 'postres', name: 'Postres', icon: '🍰' }
];