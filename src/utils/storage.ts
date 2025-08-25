// Utilidades para manejar el almacenamiento local
import { CustomerProfile, SavedAddress, OrderData } from '../types';

const STORAGE_KEYS = {
  CUSTOMER_PROFILE: 'polleria_customer_profile',
  ORDER_HISTORY: 'polleria_order_history'
};

export function getCustomerProfile(): CustomerProfile | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CUSTOMER_PROFILE);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading customer profile:', error);
    return null;
  }
}

export function saveCustomerProfile(profile: CustomerProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOMER_PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error('Error saving customer profile:', error);
  }
}

export function addOrderToHistory(order: OrderData): void {
  try {
    const profile = getCustomerProfile();
    if (profile) {
      profile.orderHistory.unshift(order);
      // Mantener solo los últimos 20 pedidos
      profile.orderHistory = profile.orderHistory.slice(0, 20);
      saveCustomerProfile(profile);
    }
  } catch (error) {
    console.error('Error adding order to history:', error);
  }
}

export function saveAddress(address: Omit<SavedAddress, 'id'>): void {
  try {
    const profile = getCustomerProfile();
    if (profile) {
      const newAddress: SavedAddress = {
        ...address,
        id: Date.now().toString()
      };
      
      // Si es la primera dirección, marcarla como predeterminada
      if (profile.savedAddresses.length === 0) {
        newAddress.isDefault = true;
      }
      
      profile.savedAddresses.push(newAddress);
      saveCustomerProfile(profile);
    }
  } catch (error) {
    console.error('Error saving address:', error);
  }
}

export function updateDefaultAddress(addressId: string): void {
  try {
    const profile = getCustomerProfile();
    if (profile) {
      profile.savedAddresses.forEach(addr => {
        addr.isDefault = addr.id === addressId;
      });
      saveCustomerProfile(profile);
    }
  } catch (error) {
    console.error('Error updating default address:', error);
  }
}

export function deleteAddress(addressId: string): void {
  try {
    const profile = getCustomerProfile();
    if (profile) {
      profile.savedAddresses = profile.savedAddresses.filter(addr => addr.id !== addressId);
      saveCustomerProfile(profile);
    }
  } catch (error) {
    console.error('Error deleting address:', error);
  }
}

export function initializeCustomerProfile(name: string, phone: string): CustomerProfile {
  const profile: CustomerProfile = {
    name,
    phone,
    savedAddresses: [],
    orderHistory: []
  };
  saveCustomerProfile(profile);
  return profile;
}