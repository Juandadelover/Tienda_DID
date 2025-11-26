# 🎨 Guía Rápida - Sistema de Diseño Tienda DID

## Comenzar Rápidamente

### 1. Usar Colores de la Paleta Tienda DID

```tsx
// ❌ NO hacer - Colores genéricos
<button className="bg-blue-600 text-white">Comprar</button>

// ✅ SÍ hacer - Usar paleta de marca
<button className="bg-primary text-white">Comprar</button>
<button className="bg-secondary text-white">Cancelar</button>
```

### 2. Botones - Siempre Usar Componente

```tsx
import { Button } from '@/components/ui/Button';

// Variante Primaria
<Button variant="primary" size="md">Agregar al carrito</Button>

// Con ícono
<Button icon={<ShoppingCart />} iconPosition="left">
  Comprar
</Button>

// Estado de carga
<Button loading>Procesando...</Button>

// Deshabilitado
<Button disabled>No disponible</Button>
```

### 3. Inputs - Siempre Con Label

```tsx
import { Input, Textarea } from '@/components/ui/Input';

// Input básico
<Input 
  label="Email" 
  placeholder="correo@ejemplo.com"
  required
/>

// Con error
<Input 
  label="Contraseña" 
  type="password"
  error="Mínimo 8 caracteres"
/>

// Con mensaje de ayuda
<Input 
  label="Teléfono" 
  helperText="Formato: +57 3XX XXXXXXX"
/>

// Textarea para textos largos
<Textarea 
  label="Descripción" 
  rows={4}
  placeholder="Cuéntanos más..."
/>
```

### 4. Cards - Contenedores Reutilizables

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';

// Card simple
<Card padding="md">
  <p>Contenido principal</p>
</Card>

// Card completa con estructura
<Card variant="default">
  <CardHeader>
    <CardTitle>Información del Producto</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Detalles del producto aquí</p>
  </CardContent>
  <CardFooter>
    <Button>Comprar ahora</Button>
  </CardFooter>
</Card>

// Card interactiva (con efecto hover)
<Card interactive onClick={handleClick}>
  Click para ver más
</Card>
```

### 5. Badges - Indicadores de Estado

```tsx
import { Badge } from '@/components/ui/Badge';

// Estados de producto
<Badge variant="disponible" size="md">En stock</Badge>
<Badge variant="agotado">Agotado</Badge>
<Badge variant="nuevo">Nuevo</Badge>

// Estados funcionales
<Badge variant="success">Completado</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="warning">Advertencia</Badge>
<Badge variant="info">Información</Badge>
```

---

## 🎯 Sistemas de Espaciado y Tamaños

### Espaciado Consistente
```tsx
// Márgenes y paddings
<div className="p-4 m-2">      {/* 16px padding, 8px margin */}
<div className="gap-6">        {/* 24px gap entre items */}
<div className="mt-8 mb-4">    {/* 32px top, 16px bottom */}
```

### Alturas de Touch Target
```tsx
// Todos los botones e inputs tienen mínimo 44px (WCAG)
<Button size="sm">Texto pequeño</Button>    {/* Aún 44px height */}
<Input placeholder="Campo" />               {/* 44px height */}
```

### Responsive Design
```tsx
// Mobile-first: estilos base + breakpoints
<div className="text-sm md:text-base lg:text-lg">
  Texto responsivo
</div>

// Espaciado responsivo
<div className="px-4 sm:px-6 md:px-8">
  Contenedor con padding responsivo
</div>
```

---

## 🌈 Colores - Referencia Rápida

### Para Usar Directamente

```tsx
// Primario (Emerald)
className="text-primary"                  // Verde marca #059669
className="bg-primary hover:bg-primary-700"
className="border border-primary"

// Secundario (Slate)
className="text-secondary"                // Gris oscuro #0f172a
className="bg-secondary-50"               // Fondo muy claro

// Estados Funcionales
className="text-status-error"             // Rojo
className="bg-status-success/10"          // Verde suave
className="border-status-warning"         // Amarillo
```

### Paleta Completa en Tailwind

```css
/* Primarios */
primary-50 #ecfdf5      primary-500 #10b981
primary (default) #059669    primary-700 #047857

/* Secundarios */
secondary-50 #f8fafc    secondary-300 #cbd5e1
secondary (default) #0f172a  secondary-900 #0f172a

/* Fondos */
background-primary #f8fafc
background-card #ffffff
background-error #fef2f2

/* Textos */
text-primary #0f172a
text-secondary #64748b
text-disabled #cbd5e1
```

---

## ♿ Accesibilidad - Checklist Rápido

```tsx
// ✅ SIEMPRE hacer esto

// 1. Labels para inputs
<label htmlFor="email">Email:</label>
<input id="email" />

// 2. ARIA roles y atributos
<button aria-label="Abrir menú">☰</button>
<div role="alert">Mensaje de error</div>

// 3. Ícones decorativos
<svg aria-hidden="true">...</svg>

// 4. Imágenes con alt
<Image alt="Descripción clara de la imagen" />

// 5. Botones con contraste
<Button variant="primary">Texto claro y legible</Button>

// 6. Navegación con teclado
onKeyDown={(e) => {
  if (e.key === 'Enter') handleClick();
}}
```

---

## 🚀 Animaciones Disponibles

### Clases Predefinidas

```tsx
// Fade animations
<div className="animate-fade-in">Aparece suave</div>
<div className="animate-fade-in-up">Entra desde abajo</div>
<div className="animate-fade-in-scale">Entra con zoom</div>

// Slide animations
<div className="animate-slide-in-left">Entra desde izq</div>
<div className="animate-slide-out">Sale a la derecha</div>

// Pulse animations
<div className="animate-pulse-soft">Pulso suave</div>
<div className="animate-pulse-scale">Pulso con escala</div>

// Utilidad
<div className="stagger-1">Retraso 1 (50ms)</div>
<div className="stagger-2">Retraso 2 (100ms)</div>
```

### Respeta Preferencias de Usuario
```tsx
// Si el usuario prefiere movimiento reducido:
// - Las animaciones se desactivan automáticamente
// - Los estilos base se mantienen
// - No requiere código especial
```

---

## 📱 Responsive Design - Breakpoints

```tsx
// Breakpoints disponibles
// xs: 320px   (móviles muy pequeños)
// sm: 640px   (móviles)
// md: 768px   (tablets)
// lg: 1024px  (laptops)
// xl: 1280px  (escritorios)
// 2xl: 1536px (escritorios grandes)

// Usar así:
<div className="
  text-sm           // Base: 14px
  sm:text-base      // Móvil: 16px
  md:text-lg        // Tablet: 18px
  lg:text-xl        // Desktop: 20px
">
  Texto responsivo
</div>

// Ocultar/Mostrar por breakpoint
<div className="hidden md:block">
  Solo en tablets y arriba
</div>

<div className="md:hidden">
  Solo en móvil
</div>
```

---

## 🔧 Utilities Útiles

### Centering y Flex
```tsx
<div className="flex items-center justify-between">
  Items centrados horizontalmente
</div>

<div className="flex flex-col gap-4">
  Items en columna con 16px gap
</div>
```

### Truncar Texto
```tsx
<p className="truncate">Texto muy largo...</p>
<p className="line-clamp-2">Máximo 2 líneas</p>
```

### Sombras
```tsx
<div className="shadow-sm">Sombra sutil</div>
<div className="shadow-md">Sombra mediana</div>
<div className="shadow-lg">Sombra grande</div>
<div className="shadow-modal">Sombra de modal</div>
```

### Transiciones
```tsx
<button className="transition-all duration-200 hover:shadow-md">
  Con transición suave
</button>
```

---

## ❌ Anti-Patterns - NO Hacer

```tsx
// ❌ NO: Colores genéricos
className="bg-blue-600 text-red-500"

// ✅ SÍ: Usar paleta
className="bg-primary text-text-error"

// ❌ NO: Botones sin Button component
<button className="px-4 py-2">Click</button>

// ✅ SÍ: Componente Button
<Button>Click</Button>

// ❌ NO: Inputs sin label
<input placeholder="Email" />

// ✅ SÍ: Con label accesible
<Input label="Email" placeholder="ejemplo@mail.com" />

// ❌ NO: Hardcodear espaciado
<div style={{ marginTop: '24px' }}>

// ✅ SÍ: Usar clases Tailwind
<div className="mt-6">

// ❌ NO: Z-index aleatorio
<div style={{ zIndex: 9999 }}>

// ✅ SÍ: Usar z-index definido
<div className="z-modal">
```

---

## 📖 Documentación Completa

Para ver la documentación detallada:
- `specs/002-ui-ux-improvements/REFACTOR_SUMMARY.md` - Resumen completo
- `specs/002-ui-ux-improvements/data-model.md` - Especificaciones técnicas
- `contex/paleta-colores-tienda-did.md` - Paleta de colores oficial

---

## 🆘 Troubleshooting

### Problema: "Color no se aplica correctamente"
**Solución:** Usar `className` en lugar de `style`, y asegurar que sea un color válido de Tailwind.

### Problema: "El input se ve muy pequeño en móvil"
**Solución:** Inputs siempre tienen 44px de altura (WCAG). Si parece pequeño, verificar zoom del navegador.

### Problema: "Animación demasiado rápida"
**Solución:** Cambiar duración con `duration-500` (valores: 400, 500, 600, 700).

### Problema: "El botón no es clickeable"
**Solución:** Asegurar que `disabled` no esté activo y que `onClick` esté conectado correctamente.

---

**Última actualización:** Noviembre 2025  
**Para preguntas:** Ver `REFACTOR_SUMMARY.md`
