'use client';

/**
 * Footer Component
 * Diseño de 4 columnas basado en el HTML proporcionado
 */

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { STORE_INFO, WHATSAPP_NUMBER } from '@/lib/constants';
import { formatPhoneNumber } from '@/lib/utils/formatters';
import { useAnimation } from '@/lib/hooks/useAnimation';

// Logo SVG consistente con el header
function LogoIcon({ className }: { className?: string }) {
  return (
    <svg 
      fill="currentColor" 
      viewBox="0 0 48 48" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  const { enabled, getTransition } = useAnimation();

  const quickLinks = [
    { href: '/', label: 'Inicio' },
    { href: '#catalogo', label: 'Tienda' },
    { href: '#nosotros', label: 'Sobre Nosotros' },
    { href: '#contacto', label: 'Contacto' },
  ];

  const categories = [
    'Abarrotes',
    'Bebidas',
    'Productos de aseo',
    'Snacks y dulces',
  ];

  return (
    <footer id="contacto" className="bg-gray-100 text-gray-600">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Columna 1: Logo y descripción */}
          <motion.div
            className="md:col-span-1"
            initial={enabled ? { opacity: 0, y: 20 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={getTransition('normal')}
          >
            <div className="flex items-center gap-3 mb-4 text-emerald-600">
              <div className="w-6 h-6">
                <LogoIcon className="w-full h-full" />
              </div>
              <h2 className="text-gray-900 text-xl font-bold">{STORE_INFO.name}</h2>
            </div>
            <p className="text-sm leading-relaxed">
              Calidad y estilo en cada producto. Diseñados para perdurar y definir tu esencia.
            </p>
          </motion.div>

          {/* Columna 2: Enlaces Rápidos */}
          <motion.div
            initial={enabled ? { opacity: 0, y: 20 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...getTransition('normal'), delay: enabled ? 0.1 : 0 }}
          >
            <h3 className="font-bold text-gray-800 mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="hover:text-emerald-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Columna 3: Categorías */}
          <motion.div
            initial={enabled ? { opacity: 0, y: 20 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...getTransition('normal'), delay: enabled ? 0.2 : 0 }}
          >
            <h3 className="font-bold text-gray-800 mb-4">Categorías</h3>
            <ul className="space-y-2 text-sm">
              {categories.map((category) => (
                <li key={category}>
                  <Link 
                    href="#catalogo"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Columna 4: Contacto */}
          <motion.div
            initial={enabled ? { opacity: 0, y: 20 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...getTransition('normal'), delay: enabled ? 0.3 : 0 }}
          >
            <h3 className="font-bold text-gray-800 mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{STORE_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a 
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="hover:text-emerald-600 transition-colors"
                >
                  {formatPhoneNumber(WHATSAPP_NUMBER)}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a 
                  href="mailto:hola@tiendadid.com"
                  className="hover:text-emerald-600 transition-colors"
                >
                  hola@tiendadid.com
                </a>
              </li>
            </ul>

            {/* WhatsApp Button */}
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
              whileHover={enabled ? { scale: 1.02 } : undefined}
              whileTap={enabled ? { scale: 0.98 } : undefined}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Escríbenos
            </motion.a>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-16 border-t border-gray-300 pt-8 text-center text-sm"
          initial={enabled ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...getTransition('normal'), delay: enabled ? 0.4 : 0 }}
        >
          <p>© {new Date().getFullYear()} {STORE_INFO.name}. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </footer>
  );
}
