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
      <div className="py-16">
        <div className="flex flex-col items-center justify-center">
          <Spinner />
          <p className="mt-4 text-slate-600">Cargando carrito...</p>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="py-12 md:py-16">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-slate-500 hover:text-emerald-600 transition-colors mb-4 group"
          >
            <svg
              className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Seguir comprando
          </Link>

          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Tu Carrito
            </h1>
            <span className="text-sm text-slate-500">
              ({cart.itemCount} {cart.itemCount === 1 ? 'producto' : 'productos'})
            </span>
          </div>
        </div>

        {/* Cart content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
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
