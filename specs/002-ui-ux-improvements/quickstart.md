# Quickstart Guide - Mejoras de UI/UX

**Purpose**: Guía rápida de instalación y configuración de componentes Aceternity  
**Target Audience**: Desarrolladores implementando la feature  
**Created**: 2025-11-25  

## 1. Instalación de Dependencias

### Paso 1: Instalar Framer Motion (Core)

```bash
npm install framer-motion@latest clsx tailwind-merge
```

### Paso 2: Instalar Componentes Aceternity (en orden)

```bash
# Componentes de tarjetas
npx shadcn@latest add https://ui.aceternity.com/registry/focus-cards.json

# Componentes de navegación
npx shadcn@latest add https://ui.aceternity.com/registry/floating-dock.json

# Componentes de entrada
npx shadcn@latest add https://ui.aceternity.com/registry/placeholders-and-vanish-input.json

# Componentes de contenedor
npx shadcn@latest add https://ui.aceternity.com/registry/tabs.json

# Componentes de carga
npx shadcn@latest add https://ui.aceternity.com/registry/loader.json

# Componentes expandibles
npx shadcn@latest add https://ui.aceternity.com/registry/expandable-card-demo-standard.json
npx shadcn@latest add https://ui.aceternity.com/registry/expandable-card-demo-grid.json

# Componentes de formulario
npx shadcn@latest add https://ui.aceternity.com/registry/file-upload.json
npx shadcn@latest add https://ui.aceternity.com/registry/signup-form-demo.json

# Componentes admin
npx shadcn@latest add https://ui.aceternity.com/registry/bento-grid.json
npx shadcn@latest add https://ui.aceternity.com/registry/sidebar.json

# Componentes opcionales
npm install @tabler/icons-react @radix-ui/react-label
```

**Duración estimada**: 5-10 minutos

### Paso 3: Verificar Instalación

```bash
# Listar componentes instalados
ls components/aceternity/
# Debería mostrar: FocusCards.tsx, FloatingDock.tsx, etc.

# Verificar compilación
npm run build
# No debe haber errores de TypeScript o build
```

---

## 2. Configuración de Tema

### Crear archivo de configuración

```bash
# Crear directorio
mkdir -p lib/config

# Crear archivo de tema
touch lib/config/theme.ts
```

### Copiar contenido del tema

Ver `data-model.md` sección "Component Theme Configuration" y copiar:
- `ThemeConfig` interface
- `ColorPalette` interface
- `defaultTheme` export

**Resultado**: `lib/config/theme.ts` con ~200 líneas de configuración

---

## 3. Primeros Componentes - Implementación Rápida

### 3.1 Focus Cards en Página de Catálogo

```bash
# Crear wrapper
touch components/catalog/FocusCardsWrapper.tsx
```

```typescript
// components/catalog/FocusCardsWrapper.tsx
'use client';

import { FocusCards } from '@/components/aceternity/focus-cards';
import type { FocusCard } from '@/specs/002-ui-ux-improvements/contracts/components-api.md';

interface FocusCardsWrapperProps {
  cards: FocusCard[];
  onCardClick?: (cardId: string) => void;
}

export function FocusCardsWrapper({ cards, onCardClick }: FocusCardsWrapperProps) {
  return (
    <FocusCards
      cards={cards}
      onCardHover={undefined}
      onCardClick={onCardClick}
      columns="auto"
      gap="md"
    />
  );
}
```

**Uso en página**:

```typescript
// app/(public)/page.tsx
import { FocusCardsWrapper } from '@/components/catalog/FocusCardsWrapper';

export default function Home() {
  const products = await getProducts();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Catálogo</h1>
      <FocusCardsWrapper 
        cards={products.map(p => ({
          id: p.id,
          title: p.name,
          description: p.description,
          price: formatCurrency(p.price),
          imageUrl: p.image_url,
          imageAlt: p.name,
        }))}
        onCardClick={(id) => console.log('Clicked:', id)}
      />
    </div>
  );
}
```

### 3.2 Floating Dock en Layout

```bash
# Crear wrapper
touch components/layout/FloatingDockWrapper.tsx
```

```typescript
// components/layout/FloatingDockWrapper.tsx
'use client';

import { FloatingDock } from '@/components/aceternity/floating-dock';
import { useRouter } from 'next/navigation';
import { Home, Grid3X3, ShoppingCart, Phone } from 'lucide-react';

export function FloatingDockWrapper() {
  const router = useRouter();
  
  const items = [
    { 
      id: 'home', 
      icon: <Home size={24} />, 
      label: 'Inicio',
      onClick: () => router.push('/'),
    },
    { 
      id: 'categories', 
      icon: <Grid3X3 size={24} />, 
      label: 'Categorías',
      onClick: () => router.push('/?categories=true'),
    },
    { 
      id: 'cart', 
      icon: <ShoppingCart size={24} />, 
      label: 'Carrito',
      onClick: () => router.push('/carrito'),
    },
    { 
      id: 'whatsapp', 
      icon: <Phone size={24} />, 
      label: 'WhatsApp',
      onClick: () => window.open('https://wa.me/573235725922'),
    },
  ];
  
  return (
    <FloatingDock
      items={items}
      position="bottom"
      showOnlyMobile={true}
      hideOnScroll={true}
    />
  );
}
```

**Uso en layout**:

```typescript
// app/(public)/layout.tsx
import { FloatingDockWrapper } from '@/components/layout/FloatingDockWrapper';

export default function PublicLayout({ children }) {
  return (
    <div>
      {children}
      <FloatingDockWrapper />
    </div>
  );
}
```

### 3.3 Placeholder Vanish Input en Búsqueda

```bash
# Reemplazar SearchBar
cp components/catalog/SearchBar.tsx components/catalog/SearchBar.backup.tsx
touch components/catalog/SearchBar.tsx
```

```typescript
// components/catalog/SearchBar.tsx
'use client';

import { PlaceholdersAndVanishInput } from '@/components/aceternity/placeholders-and-vanish-input';
import { useCallback } from 'react';

interface SearchBarProps {
  onSearchChange: (query: string) => void;
}

export function SearchBar({ onSearchChange }: SearchBarProps) {
  const placeholders = [
    'Buscar arroz...',
    'Buscar frijoles...',
    'Buscar azúcar...',
    'Buscar café...',
    'Buscar leche...',
  ];
  
  const handleSubmit = useCallback((value: string) => {
    onSearchChange(value);
  }, [onSearchChange]);
  
  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onSubmit={handleSubmit}
    />
  );
}
```

---

## 4. Testing en Navegador

### Paso 1: Iniciar servidor de desarrollo

```bash
npm run dev
```

### Paso 2: Verificar en móvil (DevTools)

```bash
# Abrir http://localhost:3000 en navegador
# F12 → Device toolbar (móvil 375px ancho)
# Ver Floating Dock en bottom
```

### Paso 3: Verificar Focus Cards

```bash
# Ir a página principal
# Hover sobre tarjeta → debe elevarse + blur effect
# Mobile → no debe haber blur (solo scale)
```

### Paso 4: Verificar Search

```bash
# Click en barra de búsqueda
# Ver placeholder rotativo
# Escribir → placeholder desaparece
# Enter → efecto vanish
```

---

## 5. Estructura de Archivos Esperada

```
components/
├── aceternity/               # 👈 Instalados por shadcn
│   ├── focus-cards.tsx
│   ├── floating-dock.tsx
│   ├── placeholders-and-vanish-input.tsx
│   ├── tabs.tsx
│   ├── loader.tsx
│   ├── bento-grid.tsx
│   ├── sidebar.tsx
│   ├── expandable-cards.tsx
│   └── file-upload.tsx
├── catalog/
│   ├── FocusCardsWrapper.tsx       # 👈 Custom wrapper
│   ├── SearchBar.tsx              # 👈 Mejorado con Aceternity
│   └── ProductCard.tsx            # Existente
├── layout/
│   ├── FloatingDockWrapper.tsx     # 👈 Custom wrapper
│   └── Header.tsx                 # Existente
└── ui/                            # Existente

lib/
├── config/
│   └── theme.ts                   # 👈 Nuevo
└── ... (existente)
```

---

## 6. Troubleshooting Común

### Error: "Module not found: @aceternity/ui"

```bash
# Solución: Los componentes se instalan en components/aceternity/
# Usar path relativo: import { FocusCards } from '@/components/aceternity/focus-cards'
```

### Error: "Framer motion animations not working"

```bash
# Verificar que 'use client' esté en el archivo
# ✅ 'use client' es REQUERIDO para Aceternity components
```

### Animaciones muy lentas en móvil

```bash
# Verificar prefers-reduced-motion en DevTools
# Settings → Rendering → Emulate CSS media feature prefers-reduced-motion: reduce
# Si está activo, las animaciones deben ser instantáneas (0ms)
```

### Estilos de Tailwind no aplican

```bash
# Verificar que tailwind.config.ts tenga:
export const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
};
```

---

## 7. Próximos Pasos

Después de completar este quickstart:

1. ✅ **Completado**: Instalación de dependencias
2. ✅ **Completado**: Configuración de tema
3. ⬜ **Siguiente**: Implementar todos los componentes (ver `plan.md`)
4. ⬜ **Siguiente**: Testing y validación de accesibilidad
5. ⬜ **Siguiente**: Deploy a staging

---

## 8. Recursos Útiles

- **Aceternity UI Docs**: https://ui.aceternity.com/
- **Framer Motion Docs**: https://www.framer.com/motion/
- **Next.js App Router**: https://nextjs.org/docs/app
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Especificación Técnica**: Ver `spec.md` en este directorio

---

**Duración total estimada**: 30-45 minutos (instalación + primeros componentes)

**Status**: ✅ Quickstart ready for implementation
