'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutStepProps {
  step: number;
  currentStep: number;
  title: string;
  isCompleted: boolean;
  children: ReactNode;
}

/**
 * CheckoutStep
 * Componente para pasos del checkout con transiciones suaves
 * - Slide animation entre pasos (x: 100% → 0%)
 * - Fade animation al cambiar
 * - Badge de paso completado (checkmark)
 * - Accesible: role="region", aria-live="polite"
 */
export function CheckoutStep({
  step,
  currentStep,
  title,
  isCompleted,
  children,
}: CheckoutStepProps) {
  const isActive = step === currentStep;
  const isPassed = step < currentStep;

  return (
    <motion.div
      role="region"
      aria-live="polite"
      aria-label={`Paso ${step}: ${title}`}
      initial={{ x: step > currentStep ? 100 : -100, opacity: 0 }}
      animate={isActive ? { x: 0, opacity: 1 } : { x: step > currentStep ? 100 : -100, opacity: 0 }}
      exit={{ x: step > currentStep ? 100 : -100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="mb-8">
        {/* Step Header */}
        <div className="flex items-center gap-4 mb-6">
          {/* Step Number Badge */}
          <motion.div
            className={`
              flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm
              ${isActive
                ? 'bg-emerald-600 text-white'
                : isPassed
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'bg-slate-200 text-slate-600'
              }
            `}
            animate={isActive ? { scale: 1.1 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {isPassed ? (
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            ) : (
              step
            )}
          </motion.div>

          {/* Step Title */}
          <div>
            <motion.h3
              className={`font-semibold text-lg ${
                isActive ? 'text-emerald-600' : isPassed ? 'text-slate-600' : 'text-slate-400'
              }`}
              animate={{ color: isActive ? '#059669' : isPassed ? '#64748b' : '#a1a5af' }}
            >
              {title}
            </motion.h3>
            {isCompleted && !isActive && (
              <motion.p
                className="text-sm text-emerald-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                ✓ Completado
              </motion.p>
            )}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg border border-slate-200 p-6"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default CheckoutStep;
