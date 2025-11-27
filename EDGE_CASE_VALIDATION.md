/**
 * Edge Case Testing & Validation Guide
 * Phase 7: Polish & Cross-Cutting Concerns
 * 
 * This document captures edge cases discovered during implementation
 * and validation steps required before production deployment.
 */

# Edge Case Testing & Validation

## Text Overflow & Long Content (T061)

### Issue: Product names and text overflow on mobile
**Solution**: Applied `truncate` and `line-clamp-*` utilities

```tsx
// Single line truncation
<h3 className="truncate">{productName}</h3>

// Multi-line clamping (2 lines max)
<p className="line-clamp-2">{description}</p>

// Word-break for very long words
<div className="break-words">{categoryName}</div>
```

### Test Cases
- [ ] Product name with 50+ characters on 320px
- [ ] Description with long URL on 320px
- [ ] Category name with special characters on 320px
- [ ] Order note with emoji on mobile
- [ ] Address input with long street name on 320px

---

## Image Aspect Ratios (T062)

### Issue: Images with different ratios break layout
**Solution**: Used `aspect-ratio` utilities and `object-cover`

```tsx
// Maintain 1:1 aspect ratio for product images
<div className="aspect-square">
  <Image
    src={url}
    alt={name}
    fill
    className="object-cover"
  />
</div>

// 16:9 for hero images
<div className="aspect-video">
  <Image src={url} fill className="object-cover" />
</div>
```

### Test Cases
- [ ] Square images (1:1) on all breakpoints
- [ ] Landscape images (16:9) on all breakpoints
- [ ] Portrait images (3:4) on all breakpoints
- [ ] Images with different DPI (retina vs standard)
- [ ] SVG logos maintain proper sizing

---

## Modal/Drawer on Mobile (T063)

### Issue: Modals and drawers not fully scrollable on 320px
**Solution**: Applied proper max-height and scrolling classes

```tsx
// Mobile full-screen modal with scrollable content
<div className="fixed inset-0 sm:relative sm:inset-auto 
                h-full sm:h-auto sm:max-h-[90vh] 
                overflow-y-auto overflow-x-hidden">
```

### Test Cases
- [ ] Scroll inside modal on 320px (doesn't scroll body)
- [ ] Long checkout form in modal on mobile
- [ ] Product detail modal with many variants on 320px
- [ ] Keyboard focus stays within modal
- [ ] Close button accessible when scrolled down in modal

---

## Touch Device Hover States (T064)

### Issue: Hover states remain active on touch devices
**Solution**: Used `@media (hover: hover)` CSS to disable hover on touchscreen

```css
@media (hover: hover) {
  button:hover {
    background-color: hsl(from var(--primary-color) h s calc(l - 5%));
  }
}

/* or with Tailwind */
@apply md:hover:scale-105 /* Only on desktop */
```

### Test Cases
- [ ] Buttons don't change color on touch (stays normal until tap)
- [ ] Hover animations don't trigger on iOS/Android
- [ ] Desktop hover effects work on laptop/mouse
- [ ] Tap feedback visible on touch devices (active state)

---

## Orientation Changes (T065)

### Issue: Layout shifts when rotating device (portrait ↔ landscape)
**Solution**: Used proper responsive classes and viewport meta tag

```tsx
// Already set in layout.tsx:
// maximumScale: 5, userScalable: true

// Flexible layouts
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

// Images with fixed aspect ratios
<div className="aspect-square">
```

### Test Cases
- [ ] Portrait to landscape: no layout shifts
- [ ] Landscape to portrait: smooth transition
- [ ] Keyboard doesn't appear unexpectedly (iOS)
- [ ] Fixed footers don't overlap content
- [ ] Modal/drawer orientation adaptation

---

## Real Device Testing (T066)

### Devices to Test
- **iPhones**: SE (2020), 12, 13, 14
- **Android**: Pixel 4a, 5, 6, Samsung S21
- **Tablets**: iPad (7th gen), iPad Pro, Samsung Tab

### Test Scenarios

#### On iPhone SE (320px)
- [ ] No horizontal scroll on any page
- [ ] Hamburger menu opens/closes
- [ ] Cart items display properly
- [ ] Checkout form fits without scroll
- [ ] All buttons tap-able (44px min)

#### On iPhone 12/13 (390px+)
- [ ] 2-column product grid on larger phone
- [ ] Full header visible
- [ ] Desktop-like experience where appropriate

#### On iPad (768px+)
- [ ] 2-column product grid
- [ ] Sidebar navigation visible (if applicable)
- [ ] Forms use 2-column layout
- [ ] Modals centered, not full-screen

#### On Android Devices
- [ ] Chrome, Firefox, Samsung Internet browsers work
- [ ] Touch targets properly sized
- [ ] Animations smooth (not laggy)
- [ ] Back button doesn't conflict with modals

---

## Browser Compatibility (T067)

### Browsers to Test
- **Chrome**: 120+ (Windows, Mac, Android)
- **Safari**: 17+ (Mac, iPad, iPhone)
- **Firefox**: 120+ (Windows, Mac, Android)
- **Samsung Internet**: Latest
- **Edge**: Latest

### Feature Support Checklist
- [ ] CSS Grid (`grid-cols-*`)
- [ ] Flexbox (`flex`, `gap`)
- [ ] CSS Variables (`var()`)
- [ ] `aspect-ratio` CSS property
- [ ] `clamp()` for fluid typography
- [ ] `prefers-reduced-motion` media query
- [ ] `dynamic` imports (Next.js)
- [ ] `next/image` optimization

---

## CSS Unused & Optimization (T068)

### Check Unused CSS

```bash
# Using Tailwind's purge analysis
npx tailwindcss -i app/globals.css -o build.css --content "./app/**/*.{tsx,ts,jsx,js}"

# Check output size
wc -c build.css  # Should be <50KB uncompressed
```

### Bundle Size Target: <300KB gzipped

```bash
# Check production build
npm run build
# Check .next/static/chunks size in output
```

### CSS Optimization Done
- [x] Removed unused Tailwind utilities
- [x] Used CSS variables instead of inline styles
- [x] Minified global styles
- [x] Applied tree-shaking for motion library imports

---

## Final Lighthouse Audit (T069)

### Requirements
- **Performance**: ≥90
- **Accessibility**: ≥95
- **Best Practices**: ≥90
- **SEO**: ≥90

### Core Web Vitals Target
- **FCP** (First Contentful Paint): ≤2s
- **LCP** (Largest Contentful Paint): ≤4s
- **CLS** (Cumulative Layout Shift): ≤0.1
- **FID** (First Input Delay): <100ms

### Audit Pages
- [ ] Home/Catalog (/)
- [ ] Cart (/carrito)
- [ ] Checkout (/checkout)
- [ ] Product Detail (modal)
- [ ] Admin Dashboard (/admin)

---

## Axe-Core Accessibility Scan (T070)

### Target: 0 Automated Errors

```bash
# Using axe DevTools browser extension
# or axe-core CLI

npm install --save-dev @axe-core/cli
npx axe https://localhost:3000
```

### Issues to Check
- [ ] Contrast violations
- [ ] Missing alt text on images
- [ ] Missing form labels
- [ ] Keyboard navigation gaps
- [ ] ARIA misuse
- [ ] Heading hierarchy (h1 → h2 → h3)

---

## Documentation & Process (T071-T072)

### Responsive Pattern Documentation
- [x] `RESPONSIVE_DESIGN_GUIDE.md` created
- [x] `tailwind.config.ts` comments updated
- [x] `app/globals.css` responsive patterns documented
- [x] `components/ui/ResponsiveGrid.tsx` created with examples

### Future Component Checklist
Created in `RESPONSIVE_DESIGN_GUIDE.md`:
- [ ] Breakpoint strategy defined
- [ ] Touch targets ≥44x44px
- [ ] Color contrast ≥4.5:1
- [ ] Animation respects `prefers-reduced-motion`
- [ ] ARIA labels present
- [ ] Keyboard navigation tested
- [ ] Mobile 320px tested
- [ ] Focus visible styles present
- [ ] Images optimized with Next.js Image

---

## Validation Checklist Before Production

### Functional Testing
- [ ] All pages load without errors
- [ ] Navigation works on all devices
- [ ] Cart persists across page reloads
- [ ] Checkout form validates properly
- [ ] WhatsApp integration works
- [ ] Product images load correctly

### Performance
- [ ] Lighthouse Performance ≥90
- [ ] Bundle size <300KB gzipped
- [ ] First paint <2s on 4G
- [ ] No CLS on any page

### Accessibility
- [ ] Lighthouse Accessibility ≥95
- [ ] Keyboard-only navigation works
- [ ] Screen reader reads all content
- [ ] Color contrast ≥4.5:1 everywhere
- [ ] axe-core scan: 0 errors

### Responsive
- [ ] 320px: No horizontal scroll
- [ ] 640px: Mobile optimized
- [ ] 768px: Tablet layout
- [ ] 1024px+: Desktop layout
- [ ] Orientation changes smooth

### Browser Compatibility
- [ ] Chrome latest
- [ ] Safari latest
- [ ] Firefox latest
- [ ] Mobile browsers (iOS Safari, Chrome Android)

### Real Device Testing
- [ ] iPhone SE (320px)
- [ ] iPhone 12+ (390px)
- [ ] iPad (768px+)
- [ ] Android phone
- [ ] Android tablet
