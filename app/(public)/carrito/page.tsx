'use client';

import { useRouter } from 'next/navigation';
import { useCartContext } from '@/context/CartContext';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeItem, isLoading } = useCartContext();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center">
          <Spinner />
          <p className="mt-4 text-slate-600">Cargando carrito...</p>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-4"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Seguir comprando
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Carrito de compras
        </h1>
        <p className="text-slate-600 mt-2">
          {cart.itemCount} {cart.itemCount === 1 ? 'producto' : 'productos'} en tu carrito
        </p>
      </div>

      {/* Cart content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <CartItem
              key={`${item.productId}-${item.variantId || 'no-variant'}`}
              item={item}
              onUpdateQuantity={(quantity) =>
                updateQuantity({
                  productId: item.productId,
                  variantId: item.variantId,
                  quantity,
                })
              }
              onRemove={() =>
                removeItem({
                  productId: item.productId,
                  variantId: item.variantId,
                })
              }
            />
          ))}

          {/* Continue shopping button - mobile */}
          <div className="lg:hidden pt-4">
            <Link href="/">
              <Button variant="ghost" className="w-full">
                Seguir comprando
              </Button>
            </Link>
          </div>
        </div>

        {/* Cart summary */}
        <div className="lg:col-span-1">
          <CartSummary
            cart={cart}
            onCheckout={handleCheckout}
            showCheckoutButton={true}
          />
        </div>
      </div>
    </div>
  );
}
