# 📋 Documento de Análisis de Requerimientos
## Sistema de Ventas en Línea - Tienda DID

---

## 1. INFORMACIÓN GENERAL DEL PROYECTO

### 1.1 Cliente
- **Nombre del negocio:** Tienda DID
- **Tipo de negocio:** Tienda de barrio (venta al detal)
- **Ubicación:** Sector 1 Manzana D-1, Barrio Villa Consuelo, Bosconia - Cesar, Colombia
- **Teléfono/WhatsApp:** 3235725922

### 1.2 Objetivo del Proyecto
Desarrollar un sistema web de catálogo de productos que permita a los clientes visualizar productos, armar su pedido y enviarlo directamente a WhatsApp de la tienda para coordinar pago y entrega.

### 1.3 Alcance
- Catálogo de productos con imágenes y precios
- Carrito de compras
- Integración con WhatsApp para envío de pedidos
- Panel de administración para gestión de productos
- Opción de domicilio o recogida en tienda

---

## 2. REQUERIMIENTOS FUNCIONALES

### 2.1 Módulo de Catálogo (Cliente)

#### RF-01: Visualización de Productos
- El sistema debe mostrar un catálogo de productos de tienda de barrio colombiana
- Cada producto debe mostrar:
  - Imagen del producto
  - Nombre del producto
  - Precio
  - Unidad de medida (unidad/peso según aplique)
  - Estado (Disponible/Agotado)

#### RF-02: Categorización de Productos
- Los productos deben estar organizados por categorías:
  - Abarrotes
  - Bebidas
  - Productos de aseo
  - Snacks y dulces
  - Lácteos y refrigerados
  - Otros

#### RF-03: Búsqueda de Productos
- El cliente debe poder buscar productos por nombre
- La búsqueda debe ser en tiempo real (mientras escribe)

#### RF-04: Gestión de Variantes
- Los productos pueden tener variantes (ej: Coca-Cola 250ml, 400ml, 1.5L)
- Cada variante debe tener su propio precio
- El cliente debe poder seleccionar la variante deseada

#### RF-05: Control de Disponibilidad
- Los productos agotados deben mostrarse claramente
- No se pueden agregar productos agotados al carrito

### 2.2 Módulo de Carrito de Compras

#### RF-06: Agregar al Carrito
- El cliente puede agregar productos al carrito
- Debe poder seleccionar la cantidad deseada
- El sistema debe validar que el producto esté disponible

#### RF-07: Gestión del Carrito
- Ver lista de productos agregados con cantidades y precios
- Modificar cantidades de productos en el carrito
- Eliminar productos del carrito
- Ver subtotal por producto
- Ver total general del pedido

#### RF-08: Resumen del Pedido
- Mostrar resumen completo antes de enviar
- Mostrar total a pagar
- Permitir revisar y editar antes de confirmar

### 2.3 Módulo de Pedido y Envío

#### RF-09: Selección de Tipo de Entrega
- El cliente debe elegir entre:
  - **Recoger en tienda:** Sector 1 Manzana D-1, Barrio Villa Consuelo
  - **Domicilio gratis:** Debe ingresar dirección de entrega

#### RF-10: Captura de Datos del Cliente
- Nombre del cliente (obligatorio)
- Teléfono de contacto (obligatorio)
- Dirección de entrega (obligatorio solo si es domicilio)
- Notas adicionales (opcional)

#### RF-11: Integración con WhatsApp
- El sistema debe generar un mensaje formateado con:
  - Nombre del cliente
  - Teléfono
  - Lista de productos (nombre, cantidad, precio unitario, subtotal)
  - Total del pedido
  - Tipo de entrega (recogida en tienda o domicilio)
  - Dirección (si es domicilio)
  - Notas adicionales
- Al hacer clic en "Enviar Pedido", debe abrir WhatsApp Web/App con el mensaje pre-cargado dirigido al número 3235725922
- El cliente confirma y envía desde WhatsApp

#### RF-12: Horario de Atención
- Mostrar horario de atención: Abierto hasta las 10:00 PM
- Mostrar mensaje si el usuario intenta hacer pedido fuera del horario
- Permitir ver el catálogo fuera de horario pero deshabilitar el envío de pedidos

### 2.4 Módulo de Administración

#### RF-13: Autenticación
- Panel de administración protegido con usuario y contraseña
- Solo un usuario administrador
- Sesión persistente con cierre de sesión manual

#### RF-14: Gestión de Productos - CRUD Completo

**Crear Producto:**
- Agregar nombre del producto
- Subir imagen (o definir URL de imagen)
- Asignar categoría
- Definir unidad de medida (unidad/peso)
- Establecer precio
- Agregar variantes si aplica (cada variante con su precio)
- Estado inicial: Disponible

**Editar Producto:**
- Modificar cualquier campo del producto
- Cambiar imagen
- Actualizar precios
- Agregar/eliminar variantes
- Cambiar estado (Disponible/Agotado)

**Eliminar Producto:**
- Confirmación antes de eliminar
- Eliminación permanente de la base de datos

**Activar/Desactivar:**
- Cambiar estado entre Disponible y Agotado sin eliminar el producto

#### RF-15: Gestión de Categorías
- Crear nuevas categorías
- Editar nombres de categorías existentes
- Eliminar categorías (validar que no tengan productos asociados)

#### RF-16: Gestión de Imágenes
- El administrador puede:
  - Subir imágenes directamente desde el panel
  - O el desarrollador puede agregar imágenes directamente en el código
- Formato de imágenes: JPG, PNG, WebP
- Tamaño recomendado: optimizado para web

---

## 3. REQUERIMIENTOS NO FUNCIONALES

### 3.1 Tecnología

#### RNF-01: Stack Tecnológico
- **Frontend:** React con Next.js
- **Base de datos:** Supabase
- **Autenticación:** Supabase Auth
- **Almacenamiento de imágenes:** Supabase Storage
- **Hosting:** Vercel (recomendado para Next.js)

#### RNF-02: Arquitectura
- Aplicación web responsiva
- Server-Side Rendering (SSR) con Next.js para mejor SEO
- API Routes de Next.js para operaciones del backend

### 3.2 Rendimiento

#### RNF-03: Velocidad
- Tiempo de carga inicial menor a 3 segundos
- Búsqueda de productos en tiempo real (< 500ms)
- Optimización de imágenes (lazy loading, compresión)

#### RNF-04: Capacidad
- Soportar más de 50 productos simultáneamente
- Catálogo escalable a 200+ productos
- Múltiples usuarios navegando simultáneamente

### 3.3 Usabilidad

#### RNF-05: Diseño Responsive
- Diseño mobile-first (mayoría de usuarios desde celular)
- Adaptable a tablets y desktop
- Interfaz intuitiva para usuarios de tienda de barrio

#### RNF-06: Accesibilidad
- Textos legibles (tamaño de fuente apropiado)
- Contraste adecuado
- Botones táctiles grandes para móviles

### 3.4 Seguridad

#### RNF-07: Protección del Panel Admin
- Autenticación robusta
- Sesiones seguras
- Protección contra inyección SQL
- Validación de datos en servidor

#### RNF-08: Privacidad
- No requiere registro de clientes
- Datos del pedido solo se envían a WhatsApp
- No se almacenan datos personales de clientes

### 3.5 Mantenibilidad

#### RNF-09: Código
- Código limpio y documentado
- Componentes reutilizables
- Buenas prácticas de React/Next.js

---

## 4. MODELO DE DATOS (Supabase)

### 4.1 Tabla: categories
```sql
- id: UUID (PK)
- name: VARCHAR(100)
- slug: VARCHAR(100) UNIQUE
- created_at: TIMESTAMP
```

### 4.2 Tabla: products
```sql
- id: UUID (PK)
- name: VARCHAR(200)
- description: TEXT (opcional)
- category_id: UUID (FK -> categories)
- image_url: TEXT
- unit_type: ENUM('unit', 'weight')
- is_available: BOOLEAN
- has_variants: BOOLEAN
- base_price: DECIMAL(10,2) (si no tiene variantes)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 4.3 Tabla: product_variants
```sql
- id: UUID (PK)
- product_id: UUID (FK -> products)
- variant_name: VARCHAR(100) (ej: "250ml", "1kg")
- price: DECIMAL(10,2)
- is_available: BOOLEAN
- created_at: TIMESTAMP
```

### 4.4 Tabla: settings
```sql
- id: UUID (PK)
- key: VARCHAR(100) UNIQUE
- value: TEXT
- updated_at: TIMESTAMP
```
(Para almacenar configuraciones como horario de atención, número de WhatsApp, etc.)

---

## 5. FLUJO DE USUARIO

### 5.1 Flujo del Cliente

```
1. Ingresa a la página web de Tienda DID
2. Ve el catálogo de productos por categorías
3. Puede buscar productos específicos
4. Agrega productos al carrito (seleccionando variantes si aplica)
5. Revisa el carrito y ajusta cantidades
6. Hace clic en "Realizar Pedido"
7. Selecciona tipo de entrega (Recoger/Domicilio)
8. Ingresa sus datos (nombre, teléfono, dirección si es domicilio)
9. Revisa resumen del pedido
10. Hace clic en "Enviar por WhatsApp"
11. Se abre WhatsApp con mensaje pre-cargado
12. Confirma y envía el mensaje a la tienda
13. Coordina pago y entrega por WhatsApp
```

### 5.2 Flujo del Administrador

```
1. Ingresa al panel de administración (/admin)
2. Inicia sesión con credenciales
3. Ve dashboard con lista de productos
4. Puede:
   - Crear nuevo producto
   - Editar producto existente
   - Cambiar estado (Disponible/Agotado)
   - Eliminar producto
   - Gestionar categorías
   - Subir/cambiar imágenes
5. Los cambios se reflejan inmediatamente en el catálogo público
```

---

## 6. PANTALLAS PRINCIPALES

### 6.1 Vista Cliente

1. **Página de Inicio/Catálogo**
   - Header con logo y carrito
   - Barra de búsqueda
   - Filtro por categorías
   - Grid de productos
   - Footer con información de la tienda

2. **Detalle de Producto** (Modal o página)
   - Imagen grande
   - Descripción
   - Selector de variantes
   - Selector de cantidad
   - Botón "Agregar al carrito"

3. **Carrito de Compras**
   - Lista de productos agregados
   - Control de cantidades
   - Total
   - Botón "Realizar Pedido"

4. **Formulario de Pedido**
   - Selección de tipo de entrega
   - Campos de datos del cliente
   - Resumen del pedido
   - Botón "Enviar por WhatsApp"

### 6.2 Vista Administrador

1. **Login**
   - Campo de usuario
   - Campo de contraseña
   - Botón de ingreso

2. **Dashboard**
   - Lista de productos con acciones rápidas
   - Botón "Agregar Producto"
   - Filtros y búsqueda

3. **Formulario de Producto**
   - Campos para todos los datos del producto
   - Subida de imagen
   - Gestión de variantes
   - Botones Guardar/Cancelar

4. **Gestión de Categorías**
   - Lista de categorías
   - CRUD de categorías

---

## 7. MENSAJE DE WHATSAPP (Formato)

```
🛒 *NUEVO PEDIDO - TIENDA DID*

👤 *Cliente:* [Nombre]
📱 *Teléfono:* [Teléfono]

📦 *PRODUCTOS:*
• [Cantidad]x [Nombre Producto] ([Variante]) - $[Precio c/u]
  Subtotal: $[Subtotal]
• [Cantidad]x [Nombre Producto] - $[Precio c/u]
  Subtotal: $[Subtotal]

💰 *TOTAL: $[Total]*

🚚 *Entrega:* [Recoger en tienda / Domicilio]
📍 *Dirección:* [Dirección si es domicilio]

📝 *Notas:* [Notas adicionales si hay]

---
_Pedido realizado desde tiendadid.com_
```

---

## 8. CONSIDERACIONES ADICIONALES

### 8.1 Fuera de Alcance (Versión 1.0)
- Sistema de pagos en línea integrado
- Registro de usuarios con historial
- Sistema de puntos o fidelización
- Reportes de ventas y estadísticas
- Gestión de inventario con stock
- Notificaciones automáticas
- Múltiples administradores

### 8.2 Mejoras Futuras (Backlog)
- Integración con pasarelas de pago (Nequi, Daviplata)
- Sistema de cupones y descuentos
- Historial de pedidos
- Dashboard con estadísticas de ventas
- Sistema de notificaciones push
- Modo oscuro
- Programa de puntos

### 8.3 Supuestos
- El cliente maneja la coordinación de pago y entrega por WhatsApp
- Los precios incluyen IVA si aplica
- El administrador es responsable de mantener actualizado el catálogo
- La tienda coordina los domicilios internamente

---

## 9. CRONOGRAMA ESTIMADO

### Fase 1: Setup y Base de Datos (3-5 días)
- Configuración de Next.js
- Configuración de Supabase
- Diseño y creación de tablas
- Autenticación básica

### Fase 2: Panel de Administración (5-7 días)
- Login de administrador
- CRUD de productos
- CRUD de categorías
- Gestión de imágenes

### Fase 3: Catálogo Cliente (5-7 días)
- Diseño y maquetación responsiva
- Listado de productos
- Búsqueda y filtros
- Detalle de producto

### Fase 4: Carrito y Pedido (4-6 días)
- Funcionalidad de carrito
- Formulario de pedido
- Integración con WhatsApp
- Validaciones

### Fase 5: Testing y Ajustes (3-5 días)
- Pruebas funcionales
- Optimización de rendimiento
- Ajustes de diseño
- Corrección de bugs

**Total Estimado: 20-30 días hábiles**

---

## 10. CRITERIOS DE ACEPTACIÓN

### El proyecto se considerará completado cuando:

✅ El catálogo muestre todos los productos con imágenes y precios
✅ El administrador pueda crear, editar y eliminar productos sin problemas
✅ El carrito funcione correctamente en móvil y desktop
✅ El pedido se envíe correctamente formateado a WhatsApp
✅ El formulario valide todos los campos requeridos
✅ El sistema sea responsive en todos los dispositivos
✅ El horario de atención se respete
✅ No existan errores críticos en ninguna funcionalidad
✅ El rendimiento sea óptimo (carga rápida)
✅ El código esté documentado y sea mantenible

---

## 11. RIESGOS Y MITIGACIONES

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Problemas con integración de WhatsApp | Media | Alto | Probar en múltiples dispositivos y navegadores desde el inicio |
| Sobrecarga de imágenes pesadas | Alta | Medio | Implementar optimización automática y lazy loading |
| Cambios frecuentes en productos | Alta | Bajo | Panel admin intuitivo y fácil de usar |
| Pérdida de conexión durante pedido | Media | Medio | Guardar carrito en localStorage |

---

**Documento elaborado por:** Líder de Proyecto Senior
**Fecha:** 25 de Noviembre de 2025
**Versión:** 1.0

---

## ✅ SIGUIENTE PASO
Con este documento aprobado, procederemos a:
1. Crear el diseño UI/UX (wireframes y mockups)
2. Configurar el ambiente de desarrollo
3. Iniciar el desarrollo según el cronograma establecido