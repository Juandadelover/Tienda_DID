'use client';

/**
 * Checkout Page
 * Customer data form and order submission via WhatsApp
 * User Story 3: Checkout y WhatsApp
 * 
 * Features:
 * - Real-time form validation with visual feedback
 * - Animated checkout steps with progress indication
 * - Order summary with smooth price animations
 * - Business hours alert with conditional display
 * - WhatsApp integration with loading state animation
 * - Mobile-responsive layout with proper spacing
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { CheckoutForm, CheckoutFormData } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { WhatsAppButton } from '@/components/checkout/WhatsAppButton';
import { HorarioAlert } from '@/components/layout/HorarioAlert';
import { useCart } from '@/lib/hooks/useCart';
import { useHorario } from '@/lib/hooks/useHorario';
import { sendOrderToWhatsApp, WhatsAppOrderData } from '@/lib/utils/whatsapp';
import { Spinner } from '@/components/ui/Spinner';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { items, total } = cart;
  const { isOpen } = useHorario();
  
  const [formData, setFormData] = useState<CheckoutFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Redirect to cart if empty
  useEffect(() => {
    if (items.length === 0 && !isLoading) {
      router.push('/carrito');
    }
  }, [items.length, router, isLoading]);

  const handleFormSubmit = (data: CheckoutFormData) => {
    setFormData(data);
  };

  const handleWhatsAppSend = () => {
    if (!formData || items.length === 0) {
      return;
    }

    setIsSending(true);

    try {
      // Prepare order data
      const orderData: WhatsAppOrderData = {
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        deliveryType: formData.deliveryType,
        address: formData.address,
        notes: formData.notes,
        items: items,
        total: total,
      };

      // Send to WhatsApp
      sendOrderToWhatsApp(orderData);

      // Clear cart after successful send
      setTimeout(() => {
        clearCart();
        setIsSending(false);
        
        // Redirect to home with success message
        router.push('/?pedido=enviado');
      }, 1500);
    } catch (error) {
      console.error('Error al enviar pedido:', error);
      setIsSending(false);
      alert('Hubo un error al enviar tu pedido. Por favor, intenta nuevamente.');
    }
  };

  // Show loading while checking cart
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header - Animated */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Finalizar pedido
          </h1>
          <p className="text-slate-600">
            Completa tus datos para enviar tu pedido por WhatsApp
          </p>
        </motion.div>

        {/* Business Hours Alert */}
        {!isOpen && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <HorarioAlert />
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Form - Animated */}
          <motion.div
            className="bg-white rounded-lg shadow-sm p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              Datos del cliente
            </h2>
            
            <CheckoutForm 
              onSubmit={handleFormSubmit} 
              isLoading={isSending}
            />
          </motion.div>

          {/* Right Column: Order Summary & Submit - Animated */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Order Summary */}
            <OrderSummary
              items={items}
              deliveryType={formData?.deliveryType || 'pickup'}
              total={total}
            />

            {/* WhatsApp Send Button */}
            <motion.div
              className="bg-white rounded-lg shadow-sm p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <WhatsAppButton
                onClick={handleWhatsAppSend}
                disabled={!formData || isSending || items.length === 0}
                isLoading={isSending}
              />
            </motion.div>

            {/* Additional Info */}
            <motion.div
              className="bg-blue-50 border border-blue-200 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                ℹ️ ¿Cómo funciona?
              </h3>
              <ol className="text-sm text-blue-800 space-y-2">
                <li>1. Completa el formulario con tus datos</li>
                <li>2. Haz clic en "Enviar pedido por WhatsApp"</li>
                <li>3. Se abrirá WhatsApp con tu pedido pre-cargado</li>
                <li>4. Confirma y envía el mensaje a la tienda</li>
                <li>5. Espera la confirmación de tu pedido</li>
              </ol>
            </motion.div>

            {/* Back to Cart Link */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={() => router.push('/carrito')}
                disabled={isSending}
                className="text-emerald-600 hover:text-emerald-700 font-medium text-sm underline disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Volver al carrito
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
