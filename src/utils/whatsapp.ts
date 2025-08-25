import { OrderData } from '../types';

export function formatOrderForWhatsApp(orderData: OrderData): string {
  const { items, orderType, tableNumber, customerData, total, specialInstructions, paymentMethod, orderNumber } = orderData;

  let message = `🔥 *NUEVO PEDIDO - POLLERÍA LA BRASA* 🔥\n\n`;
  
  // Número de pedido
  if (orderNumber) {
    message += `📋 *Pedido #${orderNumber}*\n\n`;
  }
  
  // Tipo de pedido
  message += `📍 *Tipo:* ${orderType === 'local' ? `Local - Mesa ${tableNumber}` : 'Delivery'}\n\n`;
  
  // Datos del cliente (solo para delivery)
  if (orderType === 'delivery' && customerData) {
    message += `👤 *DATOS DEL CLIENTE:*\n`;
    message += `• Nombre: ${customerData.name}\n`;
    message += `• Teléfono: ${customerData.phone}\n`;
    message += `• Dirección: ${customerData.address}\n`;
    message += `• Distrito: ${customerData.district}\n`;
    message += `• Referencia: ${customerData.reference}\n\n`;
  }
  
  // Items del pedido
  message += `🍗 *PEDIDO:*\n`;
  items.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   Cantidad: ${item.quantity}\n`;
    message += `   Precio unitario: S/ ${item.price.toFixed(2)}\n`;
    message += `   Subtotal: S/ ${(item.price * item.quantity).toFixed(2)}\n`;
    if (item.specialInstructions) {
      message += `   Observaciones: ${item.specialInstructions}\n`;
    }
    message += `\n`;
  });
  
  // Observaciones generales
  if (specialInstructions) {
    message += `📝 *Observaciones generales:*\n${specialInstructions}\n\n`;
  }
  
  // Forma de pago
  if (paymentMethod) {
    const paymentLabels = {
      efectivo: '💵 Efectivo',
      tarjeta: '💳 Tarjeta',
      yape: '📱 Yape'
    };
    message += `💰 *Forma de pago:* ${paymentLabels[paymentMethod]}\n\n`;
  }
  
  // Total
  message += `💰 *TOTAL: S/ ${total.toFixed(2)}*\n\n`;
  
  message += `⏰ Hora del pedido: ${new Date().toLocaleString('es-PE')}\n\n`;
  message += `¡Gracias por preferirnos! 🙏`;
  
  return message;
}

export function sendOrderToWhatsApp(orderData: OrderData, phoneNumber: string = '51936684281') {
  const message = formatOrderForWhatsApp(orderData);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
}