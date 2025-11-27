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
import { useCart } from '@/lib/hooks/useCart';
import { useHorario } from '@/lib/hooks/useHorario';
import { sendOrderToWhatsApp, WhatsAppOrderData } from '@/lib/utils/whatsapp';
import { Spinner } from '@/components/ui/Spinner';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, isLoading: cartLoading } = useCart();
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
    <div className="min-h-screen bg-slate-50/50 py-8 md:py-12 animate-fade-in">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8 md:mb-10 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Completar tu compra
          </h1>
          <p className="text-slate-500 text-lg">
            Completa tus datos para enviar tu pedido por WhatsApp
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Datos del cliente
                </h2>
              </div>

              <CheckoutForm
                onSubmit={handleFormSubmit}
                isLoading={isSending}
              />
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
              <h3 className="text-base font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span className="text-xl">ℹ️</span> ¿Cómo funciona?
              </h3>
              <ol className="text-sm text-blue-800 space-y-2.5 ml-1">
                <li className="flex gap-2">
                  <span className="font-bold text-blue-600">1.</span>
                  Completa el formulario con tus datos
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-blue-600">2.</span>
                  Haz clic en "Enviar pedido por WhatsApp"
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-blue-600">3.</span>
                  Se abrirá WhatsApp con tu pedido pre-cargado
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-blue-600">4.</span>
                  Confirma y envía el mensaje a la tienda
                </li>
              </ol>
            </div>
          </div>

          {/* Right Column: Order Summary & Submit */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            {/* Order Summary */}
            <OrderSummary
              items={items}
              deliveryType={formData?.deliveryType || 'pickup'}
              total={total}
            />

            {/* WhatsApp Send Button */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <WhatsAppButton
                onClick={handleWhatsAppSend}
                disabled={!formData || isSending || items.length === 0}
                isLoading={isSending}
              />

              <p className="text-xs text-slate-400 text-center mt-4">
                Al enviar, aceptas nuestros términos y condiciones
              </p>
            </div>

            {/* Back to Cart Link */}
            <div className="text-center pt-2">
              <button
                onClick={() => router.push('/carrito')}
                disabled={isSending}
                className="text-slate-500 hover:text-emerald-600 font-medium text-sm flex items-center justify-center gap-2 mx-auto transition-colors group"
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
