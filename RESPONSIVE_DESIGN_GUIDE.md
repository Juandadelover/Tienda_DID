# Responsive Design System - Tienda DID

## Overview

This document outlines the responsive design system implemented for Tienda DID e-commerce platform. The system ensures consistency, accessibility, and optimal user experience across all device sizes (mobile, tablet, desktop).

---

## Breakpoint System

### Tailwind Breakpoints (Mobile-First)

| Breakpoint | CSS Width | Device | Usage |
|------------|-----------|--------|-------|
| **xs** | 320px | Small phones (iPhone SE) | Base/default styles |
| **sm** | 640px | Large phones (iPhone 12+) | Enhanced mobile layouts |
| **md** | 768px | Tablets (iPad) | Transitional layouts |
| **lg** | 1024px | Desktops (Laptops) | Full desktop experience |
| **xl** | 1280px | Large screens (4K) | Wide desktop optimization |

### Usage Pattern

```jsx
// Mobile-first: start with xs, enhance for larger screens
<div className="text-sm sm:text-base md:text-lg lg:text-xl">
  Responsive Text
</div>

// Grid example: 1 col → 2 cols → 3 cols → 4 cols
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

---

## Responsive Grid Patterns

### Pattern Library

| Component | xs | sm | md | lg | Usage |
|-----------|----|----|----|----|-------|
| **ProductGrid** | 1 | 2 | 3 | 4 | Catalog, product listings |
| **CardGrid** | 1 | 2 | 2 | 3 | Category cards, admin summaries |
| **VariantGrid** | 1 | 2 | 3 | 3 | Product variants, admin forms |
| **Modal** | Full | Full | 90% | max-lg | Modals, popups |
| **Form** | Stacked | Stacked | 2 cols | 2 cols | Checkout, admin forms |

### Examples

#### Product Grid
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
  {products.map(product => <ProductCard key={product.id} {...product} />)}
</div>
```

#### Card Grid
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {categories.map(cat => <CategoryCard key={cat.id} {...cat} />)}
</div>
```

#### Sticky Footer (Mobile)
```jsx
<div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto 
                bg-white border-t p-4 safe-area-bottom">
  {/* Cart summary or action buttons */}
</div>
```

---

## Touch Target Standards (WCAG AA+)

### Minimum Size: 44x44px

All interactive elements must meet or exceed 44x44 pixels:

```jsx
<button className="min-h-[44px] min-w-[44px] px-4 py-3 rounded-lg">
  Click me
</button>
```

### Spacing Between Targets

Maintain minimum 8px spacing between adjacent tap targets to prevent accidental clicks:

```jsx
<div className="flex gap-2">
  <button className="min-h-[44px] flex-1">OK</button>
  <button className="min-h-[44px] flex-1">Cancel</button>
</div>
```

---

## Motion Frame Animation System

### Animation Timings

| Duration | Timing | Use Case |
|----------|--------|----------|
| **150ms** | Micro | Hover states, focus rings, quick feedback |
| **200ms** | Short | Button clicks, toggles, form validation |
| **300ms** | Medium | Modal open/close, drawer animations |
| **500ms** | Long | Page transitions, complex animations |

### Easing Functions

```css
/* ease-out: Object entrance, content appearing */
transition: all 200ms cubic-bezier(0, 0, 0.2, 1);

/* ease-spring: Interactive feedback, bouncy feel */
transition: all 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

/* ease-in-out: Smooth, balanced motion */
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Animation Examples

```jsx
// Hover animation (button)
<button className="transition-all duration-200 ease-out hover:scale-105 hover:shadow-lg">

// Loading spinner
<div className="animate-spin h-8 w-8"></div>

// Modal fade-in (spring animation)
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3, type: 'spring', stiffness: 400 }}
>
```

### Respecting User Preferences

Always include `prefers-reduced-motion` support (implemented in `app/globals.css`):

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Typography Scale (Fluid)

Uses CSS `clamp()` for automatic scaling between breakpoints:

```css
/* Scales smoothly from 14px → 16px based on viewport width */
font-size: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
```

### Pre-defined Scale

| Level | clamp() | Min Size | Preferred | Max Size |
|-------|---------|----------|-----------|----------|
| **tiny** | clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem) | 12px | Responsive | 14px |
| **small** | clamp(0.875rem, 0.8rem + 0.375vw, 1rem) | 14px | Responsive | 16px |
| **base** | clamp(1rem, 0.95rem + 0.25vw, 1.125rem) | 16px | Responsive | 18px |
| **large** | clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem) | 18px | Responsive | 20px |
| **xl** | clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem) | 20px | Responsive | 24px |
| **2xl** | clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem) | 24px | Responsive | 30px |

---

## Color Palette & Contrast

### Primary Colors

| Role | Color | Hex Code | Usage |
|------|-------|----------|-------|
| **Primary** | Emerald-600 | #059669 | Action buttons, links, interactive elements |
| **Primary Hover** | Emerald-700 | #047857 | Button hover state |
| **Primary Light** | Emerald-500 | #10b981 | Secondary actions, highlights |
| **Secondary** | Slate-900 | #0f172a | Body text, headings, dark backgrounds |

### Functional Colors

| Role | Color | Hex Code | Contrast |
|------|-------|----------|----------|
| **Success** | #22c55e | Green | 4.6:1 (AA ✓) |
| **Error** | #ef4444 | Red | 5.1:1 (AA ✓) |
| **Warning** | #facc15 | Yellow | 5.2:1 (AA ✓) |
| **Info** | #3b82f6 | Blue | 7.3:1 (AAA ✓) |

**All colors meet WCAG AA minimum contrast ratio of 4.5:1**

---

## Component Responsive Guidelines

### Header
- **xs**: Hamburger menu + logo only
- **md**: Full nav bar visible + cart button
- **lg**: Desktop nav with all links

### Cart Summary
- **xs**: Sticky footer with total + checkout button
- **sm**: Same sticky footer
- **md**: Sidebar position, no longer sticky

### Forms
- **xs/sm**: Single column (stacked inputs)
- **md+**: Two-column layout for optimal form scanning

### Modals
- **xs**: Full screen (no padding, edge-to-edge)
- **sm**: Full screen with padding
- **md+**: Centered modal (max-width: max-content)

### Tables
- **xs**: Card view (each row as a card)
- **md**: Horizontal scroll table
- **lg**: Full table with all columns visible

---

## Accessibility Features

### Keyboard Navigation
- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons, links
- **Escape**: Close modals, dismiss dropdowns
- **Arrow Keys**: Navigate menus, tabs (when implemented)

### Screen Readers
- **ARIA Labels**: All buttons have descriptive labels (`aria-label`)
- **ARIA Roles**: Modals have `role="dialog"`, navigation has `role="navigation"`
- **Live Regions**: Notifications use `aria-live="polite"`
- **Skip Link**: "Skip to main content" link for quick nav

### Visual Accessibility
- **Focus Visible**: All interactive elements show 2px green outline on focus
- **Color Contrast**: 4.5:1 minimum for all text (WCAG AA)
- **Large Touch Targets**: 44x44px minimum for all interactive elements
- **Motion Respect**: Animations disabled for users with `prefers-reduced-motion`

---

## Implementation Checklist

When creating new components, ensure:

- [ ] Breakpoint strategy defined (xs, sm, md, lg)
- [ ] Touch targets ≥44x44px
- [ ] Color contrast ≥4.5:1 (WCAG AA)
- [ ] Animation respects `prefers-reduced-motion`
- [ ] ARIA labels on all interactive elements
- [ ] Keyboard navigation tested (Tab, Enter, Escape)
- [ ] Mobile layout tested at 320px (no horizontal scroll)
- [ ] Responsive grid pattern applied (if applicable)
- [ ] Focus visible styles present
- [ ] Images optimized with Next.js Image component

---

## Testing

### Responsive Testing
1. Test at each breakpoint: 320px, 640px, 768px, 1024px, 1280px
2. Verify no horizontal scroll at 320px
3. Check layout shifts (CLS ≤0.1)
4. Test rotation: portrait ↔ landscape

### Accessibility Testing
1. Lighthouse Accessibility score ≥95
2. axe-core scan: 0 errors
3. Keyboard navigation: Tab through all elements
4. Screen reader: Test with NVDA (Windows) or VoiceOver (Mac)
5. Color contrast: Verify with WebAIM Contrast Checker

### Performance Testing
1. Lighthouse Performance score ≥90
2. LCP ≤4s, FCP ≤2s, CLS ≤0.1
3. Bundle size <300KB gzipped
4. Test on real 4G mobile connection

---

## Resources

- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Motion UI Guidelines](https://www.nngroup.com/articles/animation-usability/)
- [Mobile-First Design](https://www.nngroup.com/articles/mobile-first-design/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
