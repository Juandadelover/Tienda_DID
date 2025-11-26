# Tienda DID 🛒

**Tu tienda de barrio en línea** - Sistema de e-commerce para Tienda DID en Bosconia, Cesar.

## 📋 Descripción

Tienda DID es una aplicación web móvil-first que permite a los clientes:
- Explorar productos organizados por categorías
- Buscar productos en tiempo real
- Agregar productos al carrito con persistencia local
- Realizar pedidos vía WhatsApp con entrega a domicilio o recogida en tienda

El panel de administración permite gestionar productos y categorías de forma sencilla.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) con App Router
- **React**: 19.2.0
- **TypeScript**: 5.x (modo estricto)
- **Estilos**: [TailwindCSS 4.x](https://tailwindcss.com/)
- **Base de datos**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Almacenamiento**: Supabase Storage (imágenes de productos)
- **Validación**: Zod

## 📂 Estructura del Proyecto

```
tiendadid/
├── app/
│   ├── (public)/           # Rutas públicas (catálogo, carrito, checkout)
│   ├── (admin)/            # Panel de administración (protegido)
│   ├── api/                # API Routes (products, categories, variants)
│   └── layout.tsx          # Layout raíz
├── components/
│   ├── admin/              # Componentes del panel admin
│   ├── cart/               # Componentes del carrito
│   ├── catalog/            # Componentes del catálogo
│   ├── checkout/           # Componentes del checkout
│   ├── layout/             # Header, Footer, AdminNav
│   └── ui/                 # Componentes UI reutilizables
├── context/                # React Context (Cart)
├── lib/
│   ├── auth/               # Helpers de autenticación
│   ├── hooks/              # Custom hooks
│   ├── supabase/           # Cliente Supabase
│   └── utils/              # Utilidades (formatters, validators, whatsapp)
├── types/                  # TypeScript interfaces
└── supabase/               # Migrations y seed SQL
```

## 🛠️ Instalación

### Prerrequisitos

- Node.js 18.x o superior
- npm, yarn, o pnpm
- Cuenta en Supabase

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tiendadid.git
cd tiendadid
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia `.env.example` a `.env.local` y configura las variables:

```bash
cp .env.example .env.local
```

Edita `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### 4. Configurar Supabase

1. Crea un nuevo proyecto en [Supabase](https://supabase.com/)
2. Ejecuta las migraciones en orden:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_rls_policies.sql`
   - `supabase/migrations/003_storage_setup.sql`
3. Ejecuta el seed: `supabase/seed.sql`
4. Crea un usuario admin en Supabase Auth

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📱 Características

### Catálogo Público
- Vista de productos por categoría
- Búsqueda en tiempo real (<500ms)
- Imágenes optimizadas con lazy loading
- Variantes de productos con precios diferentes
- Indicadores de disponibilidad (Disponible/Agotado/Nuevo)

### Carrito de Compras
- Agregar/eliminar productos
- Modificar cantidades
- Persistencia en localStorage
- Cálculo automático de totales

### Checkout
- Formulario de datos del cliente
- Selección de entrega (Domicilio gratis / Recoger en tienda)
- Envío de pedido por WhatsApp
- Validación de horario de atención (cierra a las 10 PM)

### Panel de Administración
- Login seguro con Supabase Auth
- CRUD de productos con imágenes
- Gestión de variantes
- CRUD de categorías con validación de productos asociados
- Toggle de disponibilidad

## 🔒 Seguridad

- Autenticación requerida para rutas admin
- Row Level Security (RLS) en todas las tablas
- Validación de inputs con Zod
- Variables sensibles en `.env.local` (no comiteadas)

## 📦 Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Iniciar producción
npm run lint     # Ejecutar ESLint
```

## 🌐 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a [Vercel](https://vercel.com)
2. Configura las variables de entorno
3. Despliega automáticamente

### Otros

Consulta la [documentación de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para otras opciones.

## 📞 Contacto

**Tienda DID**
- 📍 Bosconia, Cesar, Colombia
- 📱 WhatsApp: [+57 323 572 5922](https://wa.me/573235725922)
- ⏰ Horario: Hasta las 10:00 PM

## 📄 Licencia

Este proyecto es privado. Todos los derechos reservados.
