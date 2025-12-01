'use client';

/**
 * Checkout Page
 * Customer data form and order submission via WhatsApp
 * User Story 3: Checkout y WhatsApp
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckoutForm, CheckoutFormData } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { WhatsAppButton } from '@/components/checkout/WhatsAppButton';
import { HorarioAlert } from '@/components/layout/HorarioAlert';
import { useCartContext } from '@/context/CartContext';
import { useHorario } from '@/lib/hooks/useHorario';
import { sendOrderToWhatsApp, WhatsAppOrderData } from '@/lib/utils/whatsapp';
import { Spinner } from '@/components/ui/Spinner';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, isLoading: cartLoading } = useCartContext();
  const { items, total } = cart;
  const { isOpen } = useHorario();

  const [formData, setFormData] = useState<CheckoutFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [hasCheckedCart, setHasCheckedCart] = useState(false);

  // Redirect to cart if empty (only after cart has finished loading)
  useEffect(() => {
    if (cartLoading) return;

    if (items.length === 0 && hasCheckedCart) {
      router.push('/carrito');
    } else if (!hasCheckedCart) {
      setHasCheckedCart(true);
    }
  }, [items.length, router, cartLoading, hasCheckedCart]);

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
    <div className="bg-slate-50 min-h-screen py-8 md:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Finalizar Compra
            </h1>
          </div>
          <p className="text-base text-slate-600 max-w-md mx-auto">
            Ingresa tus datos de entrega para completar tu pedido
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                Datos de entrega
              </h2>

              <CheckoutForm
                onSubmit={handleFormSubmit}
                isLoading={isSending}
              />
            </div>
          </div>

          {/* Right Column: Order Summary & Submit */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
            {/* Order Summary */}
            <OrderSummary
              items={items}
              deliveryType={formData?.deliveryType || 'pickup'}
              total={total}
            />

            {/* WhatsApp Send Button */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <WhatsAppButton
                onClick={handleWhatsAppSend}
                disabled={!formData || isSending || items.length === 0}
                isLoading={isSending}
              />

              <p className="text-xs text-slate-400 text-center">
                Al enviar, aceptas nuestros términos y condiciones
              </p>
            </div>

            {/* Back to Cart Link */}
            <div className="text-center">
              <button
                onClick={() => router.push('/carrito')}
                disabled={isSending}
                className="text-sm text-slate-500 hover:text-emerald-600 transition-colors inline-flex items-center gap-1 group"
              >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
