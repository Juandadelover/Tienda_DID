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
    <div className="py-8 md:py-12 lg:py-16 animate-fade-in">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors mb-6 group"
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

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Carrito de compras
            </h1>
            <span className="text-lg text-slate-500">
              ({cart.itemCount} {cart.itemCount === 1 ? 'producto' : 'productos'})
            </span>
          </div>
        </div>

        {/* Cart content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-5">
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
