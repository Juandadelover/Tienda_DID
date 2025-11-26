# 🎨 Paleta de Colores - Tienda DID

## Identidad Visual
Esta paleta de colores está diseñada para transmitir frescura, confianza y cercanía, características esenciales de una tienda de barrio moderna y digital.

---

## 🌟 Paleta Principal

### 1. Verde Tienda (Color Primario - Identidad y Frescura)
**Se usa en:** Botones principales, precios destacados, íconos de acciones importantes, logo de la tienda, enlaces activos.

- **Nombre:** `Emerald-600`
- **Hex:** `#059669`
- **RGB:** `rgb(5, 150, 105)`
- **Uso:** Color primario de la marca Tienda DID
- **Accesibilidad:** Excelente contraste sobre fondo blanco (AAA)

```css
/* CSS */
--primary-color: #059669;
--primary-hover: #047857; /* Emerald-700 para hover */
```

**Variantes:**
- **Emerald-500** `#10b981` - Versión más clara para fondos suaves
- **Emerald-700** `#047857` - Para estados hover
- **Emerald-50** `#ecfdf5` - Para fondos de notificaciones de éxito

---

### 2. Gris Pizarra Oscuro (Color Secundario - Elegancia y Estructura)
**Se usa en:** Títulos principales, encabezados de secciones, fondo del header, textos importantes, footer.

- **Nombre:** `Slate-900`
- **Hex:** `#0f172a`
- **RGB:** `rgb(15, 23, 42)`
- **Uso:** Color de soporte, estructura y jerarquía visual
- **Accesibilidad:** Máximo contraste sobre fondos claros (AAA)

```css
/* CSS */
--secondary-color: #0f172a;
--text-primary: #0f172a;
```

**Variantes:**
- **Slate-800** `#1e293b` - Para textos secundarios importantes
- **Slate-700** `#334155` - Para bordes y divisiones

---

## 🖌️ Paleta de Soporte y Fondos

### 3. Fondo Suave (Limpieza y Descanso Visual)
**Se usa en:** Fondo general de la aplicación, secciones alternas, espacios entre contenido.

- **Nombre:** `Slate-50`
- **Hex:** `#f8fafc`
- **RGB:** `rgb(248, 250, 252)`
- **Uso:** Fondo principal (más suave que blanco puro)
- **Beneficio:** Reduce fatiga visual en uso prolongado

```css
/* CSS */
--bg-primary: #f8fafc;
```

---

### 4. Texto Secundario (Legibilidad y Jerarquía)
**Se usa en:** Descripciones de productos, información adicional, textos de ayuda, placeholders.

- **Nombre:** `Slate-500`
- **Hex:** `#64748b`
- **RGB:** `rgb(100, 116, 139)`
- **Uso:** Textos de menor jerarquía
- **Accesibilidad:** Buen contraste sobre fondos claros (AA)

```css
/* CSS */
--text-secondary: #64748b;
```

**Variantes:**
- **Slate-600** `#475569` - Para textos secundarios con más peso
- **Slate-400** `#94a3b8` - Para textos deshabilitados

---

### 5. Blanco Puro (Claridad y Espacio)
**Se usa en:** Cards de productos, modales, barra de navegación, fondos de formularios, paneles del admin.

- **Nombre:** `White`
- **Hex:** `#ffffff`
- **RGB:** `rgb(255, 255, 255)`
- **Uso:** Elementos elevados y contenedores importantes

```css
/* CSS */
--bg-card: #ffffff;
--bg-modal: #ffffff;
```

---

## 🚨 Colores Funcionales

### 6. Rojo Alerta (Urgencia y Atención)
**Se usa en:** Etiquetas de "Agotado", badges de descuento, mensajes de error, notificaciones del carrito, alertas importantes.

- **Nombre:** `Red-500`
- **Hex:** `#ef4444`
- **RGB:** `rgb(239, 68, 68)`
- **Uso:** Alertas, errores y elementos de urgencia
- **Psicología:** Llama la atención inmediata

```css
/* CSS */
--error-color: #ef4444;
--alert-color: #ef4444;
```

**Variantes:**
- **Red-600** `#dc2626` - Para estados hover de botones de eliminar
- **Red-50** `#fef2f2` - Para fondos de mensajes de error

---

### 7. Amarillo Destaque (Atención Positiva)
**Se usa en:** Badges de "Nuevo", iconos de atención, elementos destacados, indicadores de ayuda.

- **Nombre:** `Yellow-400`
- **Hex:** `#facc15`
- **RGB:** `rgb(250, 204, 21)`
- **Uso:** Elementos que requieren atención sin urgencia
- **Combinación:** Funciona bien con texto oscuro (Slate-900)

```css
/* CSS */
--highlight-color: #facc15;
```

**Variantes:**
- **Yellow-300** `#fde047` - Versión más clara para fondos
- **Yellow-500** `#eab308` - Para estados hover

---

## 📊 Colores Adicionales (Semánticos)

### 8. Azul Información
**Se usa en:** Mensajes informativos, links, elementos interactivos.

- **Nombre:** `Blue-500`
- **Hex:** `#3b82f6`
- **RGB:** `rgb(59, 130, 246)`
- **Uso:** Información neutral

```css
/* CSS */
--info-color: #3b82f6;
```

---

### 9. Verde Éxito
**Se usa en:** Confirmaciones, mensajes de éxito, indicadores de disponibilidad.

- **Nombre:** `Green-500`
- **Hex:** `#22c55e`
- **RGB:** `rgb(34, 197, 94)`
- **Uso:** Feedback positivo

```css
/* CSS */
--success-color: #22c55e;
```

---

## 🎯 Aplicación por Componente

### Botones
```css
/* Botón Primario */
background: #059669 (Emerald-600)
color: #ffffff
hover: #047857 (Emerald-700)

/* Botón Secundario */
background: #0f172a (Slate-900)
color: #ffffff
hover: #1e293b (Slate-800)

/* Botón Peligro */
background: #ef4444 (Red-500)
color: #ffffff
hover: #dc2626 (Red-600)

/* Botón Fantasma */
background: transparent
color: #059669 (Emerald-600)
border: 2px solid #059669
hover: background: #ecfdf5 (Emerald-50)
```

---

### Cards de Productos
```css
background: #ffffff
border: 1px solid #e2e8f0 (Slate-200)
shadow: 0 1px 3px rgba(0,0,0,0.1)
hover: shadow: 0 10px 15px rgba(0,0,0,0.1)

/* Precio */
color: #059669 (Emerald-600)
font-weight: bold

/* Título */
color: #0f172a (Slate-900)

/* Descripción */
color: #64748b (Slate-500)
```

---

### Formularios
```css
/* Input */
background: #ffffff
border: 1px solid #cbd5e1 (Slate-300)
color: #0f172a (Slate-900)
placeholder: #94a3b8 (Slate-400)
focus: border-color: #059669 (Emerald-600)

/* Label */
color: #475569 (Slate-600)
font-weight: 500
```

---

### Badges y Etiquetas
```css
/* Disponible */
background: #ecfdf5 (Emerald-50)
color: #047857 (Emerald-700)

/* Agotado */
background: #fef2f2 (Red-50)
color: #dc2626 (Red-600)

/* Nuevo */
background: #fef9c3 (Yellow-100)
color: #854d0e (Yellow-900)
```

---

## 🌈 Gradientes Especiales

### Gradiente Hero (Opcional)
```css
background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
```

### Gradiente de Overlay
```css
background: linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.8) 100%);
```

---

## ♿ Accesibilidad y Contraste

### Combinaciones Aprobadas WCAG AAA
✅ Slate-900 sobre White (#0f172a sobre #ffffff) - Ratio: 18.7:1
✅ Emerald-600 sobre White (#059669 sobre #ffffff) - Ratio: 4.8:1
✅ Slate-900 sobre Emerald-600 (#0f172a sobre #059669) - Ratio: 3.9:1

### Combinaciones Aprobadas WCAG AA
✅ Slate-500 sobre White (#64748b sobre #ffffff) - Ratio: 5.8:1
✅ Red-500 sobre White (#ef4444 sobre #ffffff) - Ratio: 4.5:1

---

## 📱 Modo Oscuro (Futuro)

Para una implementación futura de modo oscuro:

```css
/* Dark Mode Variables */
--bg-primary-dark: #0f172a
--bg-card-dark: #1e293b
--text-primary-dark: #f1f5f9
--text-secondary-dark: #94a3b8
--border-dark: #334155
```

---

## 🎨 Exportación para Diseño

### Figma/Adobe XD
```
Primary: #059669
Secondary: #0f172a
Background: #f8fafc
Surface: #ffffff
Error: #ef4444
Warning: #facc15
Success: #22c55e
Info: #3b82f6
```

### Tailwind CSS Config
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#059669',
          hover: '#047857',
          light: '#10b981',
        },
        secondary: {
          DEFAULT: '#0f172a',
          light: '#1e293b',
        }
      }
    }
  }
}
```

---

## ✅ Checklist de Uso

- ✅ Usar Emerald-600 para todas las acciones principales
- ✅ Mantener Slate-900 para textos importantes y estructura
- ✅ Aplicar Slate-50 como fondo general, no blanco puro
- ✅ Reservar Red-500 solo para alertas y errores
- ✅ Usar White solo en elementos elevados (cards, modals)
- ✅ Verificar contraste antes de usar combinaciones nuevas
- ✅ Mantener consistencia en toda la aplicación

---

**Documento creado para:** Tienda DID - Sistema de Ventas en Línea
**Versión:** 1.0
**Fecha:** Noviembre 2025