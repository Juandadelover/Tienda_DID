---
description: "Task list for Mejoras de Diseño y Responsividad"
---

# Tasks: Mejoras de Diseño y Responsividad

**Feature Branch**: `003-improve-ui-responsiveness`  
**Input**: Design documents from `/specs/003-improve-ui-responsiveness/`  
**Prerequisites**: plan.md (✓), spec.md (✓)

**Organization**: Tasks are grouped by user story (P1, P2, P3) to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and design system configuration

- [X] T001 Update `tailwind.config.ts` with comprehensive responsive breakpoints (xs:320px, sm:640px, md:768px, lg:1024px, xl:1280px)
- [X] T002 [P] Add CSS variables for motion timings in `app/globals.css` (150ms micro, 200ms short, 300ms medium, 500ms long)
- [X] T003 [P] Add `prefers-reduced-motion` media query utilities in `app/globals.css` for motion respect
- [X] T004 [P] Create Motion Frame animation utilities in `tailwind.config.ts` (spring, ease-in-out, ease-out easing functions)
- [X] T005 [P] Configure touch target minimum sizes (44x44px) verification in component structure
- [X] T006 Validate color palette contrast ratios (4.5:1 for AA, 7:1 for AAA) in `tailwind.config.ts` color scheme - See `color-contrast-audit.md` for detailed report

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core design patterns and responsive infrastructure that MUST be complete before feature components are enhanced

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 [P] Update `components/ui/Button.tsx` with responsive padding, 44x44px touch targets, and hover animation (200ms)
- [X] T008 [P] Update `components/ui/Input.tsx` with responsive font sizes, focus states, and validation feedback animation
- [X] T009 [P] Update `components/ui/Card.tsx` with responsive padding/margins and hover scale animation (150ms)
- [X] T010 [P] Update `components/ui/Modal.tsx` with responsive sizing (mobile full-screen, tablet/desktop centered) and open/close animation (300ms)
- [X] T011 [P] Update `components/ui/Badge.tsx` with responsive sizing and touch-friendly padding
- [X] T012 [P] Update `components/ui/Spinner.tsx` with optimized CSS animation (reduce motion support)
- [X] T013 [P] Update `components/ui/CartNotification.tsx` with toast positioning responsive to viewport (mobile bottom, desktop top-right)
- [X] T014 Update `app/globals.css` with responsive typography scale (mobile-first fluid typography)
- [X] T015 Update `app/layout.tsx` with meta viewport settings for mobile optimization and responsive wrapper classes
- [X] T016 Create responsive utility classes documentation in `app/globals.css` for consistent component patterns

**Checkpoint**: Foundation ready - all base components have responsive + animation patterns established

---

## Phase 3: User Story 1 - Mobile Responsiveness Foundation (Priority: P1) 🎯 MVP

**Goal**: Ensure entire interface adapts correctly on mobile 320px without horizontal scroll, making all functionality accessible on small phones.

**Independent Test**: 
1. Open app on 320px viewport (Chrome DevTools)
2. Navigate all pages (home, cart, checkout, login, admin)
3. Verify: No horizontal scroll, all tap targets ≥44x44px, text readable without zoom
4. Test rotation: portrait ↔ landscape adaptation
5. Manual accessibility: Keyboard navigation complete, screen reader announces all elements

### Implementation for User Story 1

- [X] T017 [P] [US1] Update `components/layout/Header.tsx` with mobile hamburger menu and responsive nav (320px collapse, 768px expand)
- [X] T018 [P] [US1] Update `components/layout/Footer.tsx` with responsive stacking (single column mobile, multi-column tablet+)
- [X] T019 [P] [US1] Update `components/catalog/ProductGrid.tsx` with responsive columns (1 col xs, 2 cols sm, 3 cols md, 4 cols lg)
- [X] T020 [P] [US1] Update `components/catalog/ProductCard.tsx` with responsive image aspect ratio and mobile-friendly tap zones
- [X] T021 [P] [US1] Update `components/cart/CartItem.tsx` with responsive layout (mobile stacked, desktop row) and touch controls
- [X] T022 [P] [US1] Update `components/cart/CartSummary.tsx` to use sticky footer on mobile (320px safe area)
- [X] T023 [P] [US1] Update `app/(public)/page.tsx` with mobile-first responsive layout sections
- [X] T024 [P] [US1] Update `app/(public)/carrito/page.tsx` with responsive cart layout and mobile gesture support
- [X] T025 [US1] Update `components/catalog/CategoryFilter.tsx` with horizontal scroll chips on mobile, dropdown on desktop
- [X] T026 [US1] Update `app/(public)/checkout/page.tsx` with mobile-optimized form layout and single-column input fields
- [X] T027 [US1] Test on 320px viewport: No horizontal scroll, all interactive elements touch-friendly
- [X] T028 [US1] Fix any layout shifts (CLS) during mobile viewport testing, ensure fluid typography

**Checkpoint**: User Story 1 complete - All pages fully functional on 320px without scroll, ready for mobile users

---

## Phase 4: User Story 2 - Professional Design & Animations (Priority: P2)

**Goal**: Implement subtle microinteractions (hover, validation, transitions) that convey professionalism and improve UX perception without being intrusive.

**Independent Test**:
1. Interact with buttons: Verify hover animation (150-200ms) smooth and not jarring
2. Submit form with errors: Verify validation feedback is visual and fluent
3. Open/close modal: Verify animation is smooth and respects prefers-reduced-motion
4. Lighthouse Best Practices ≥90 (no performance regressions)

### Implementation for User Story 2

- [X] T029 [P] [US2] Add hover/focus animations to `components/ui/Button.tsx` (scale 1.05, shadow increase, 200ms ease-out)
- [X] T030 [P] [US2] Add focus ring animations to `components/ui/Input.tsx` (border color + glow, 150ms)
- [X] T031 [P] [US2] Add validation feedback animation to `components/ui/Input.tsx` (shake + color transition on error, 200ms)
- [X] T032 [P] [US2] Add hover animations to `components/catalog/ProductCard.tsx` (lift effect, image zoom, 200ms)
- [X] T033 [P] [US2] Add click/toggle animations to `components/ui/Modal.tsx` (fade-in content, scale modal, 300ms spring)
- [X] T034 [P] [US2] Add loading state animation to `components/checkout/CheckoutForm.tsx` (spinner + button disable, 200ms)
- [X] T035 [P] [US2] Add cart item interaction animations `components/cart/CartItem.tsx` (add/remove quantity feedback, 150ms)
- [X] T036 [US2] Add page transition animations in `app/(public)/page.tsx` and other main pages (fade-in, 200ms)
- [X] T037 [US2] Test all animations respect `prefers-reduced-motion` and complete with motion enabled
- [X] T038 [US2] Verify Lighthouse Performance remains ≥90 after animation additions

**Checkpoint**: User Stories 1 & 2 complete - Mobile responsive + professional animations without performance impact

---

## Phase 5: User Story 3 - Performance & Accessibility Excellence (Priority: P2)

**Goal**: Achieve Lighthouse Performance ≥90, Accessibility ≥95, Best Practices ≥90, and WCAG AA+ compliance across all pages.

**Independent Test**:
1. Run Lighthouse audit on each main page (home, cart, checkout, admin)
2. Verify: Performance ≥90, Accessibility ≥95, Best Practices ≥90 on mobile
3. Core Web Vitals: FCP ≤2s, LCP ≤4s, CLS ≤0.1
4. axe-core scan: 0 errors, 0 contrast violations
5. Keyboard navigation: Complete on all pages

### Implementation for User Story 3

- [X] T039 [P] [US3] Implement Next.js Image optimization in `components/catalog/ProductCard.tsx` (lazy loading, srcSet, placeholder)
- [X] T040 [P] [US3] Implement Next.js Image optimization in `components/admin/ImageUploader.tsx` (preview optimization)
- [X] T041 [P] [US3] Add ARIA labels and roles to `components/layout/Header.tsx` (nav, button roles, menu aria-label)
- [X] T042 [P] [US3] Add ARIA labels to `components/ui/Button.tsx` (aria-label for icon buttons, aria-pressed for toggles)
- [X] T043 [P] [US3] Add ARIA labels to `components/ui/Modal.tsx` (role="dialog", aria-labelledby, aria-describedby)
- [X] T044 [P] [US3] Add semantic HTML and keyboard navigation to `components/catalog/CategoryFilter.tsx` (proper focus management)
- [X] T045 [P] [US3] Add aria-live regions to `components/ui/CartNotification.tsx` (aria-live="polite" for toast notifications)
- [X] T046 [P] [US3] Add keyboard support to `components/cart/CartItem.tsx` (delete/quantity via keyboard)
- [X] T047 [US3] Verify color contrast in `tailwind.config.ts` color scheme meets WCAG AA (4.5:1) for all text
- [X] T048 [US3] Add skip-to-content link in `app/layout.tsx` for keyboard accessibility
- [X] T049 [US3] Implement dynamic imports for non-critical components to reduce bundle size (code splitting)
- [ ] T050 [US3] Run Lighthouse audit on all main pages and document scores in spec
- [ ] T051 [US3] Run axe-core accessibility scan and fix all violations
- [ ] T052 [US3] Test keyboard-only navigation on all pages (Tab, Enter, Escape)
- [ ] T053 [US3] Test with screen reader (NVDA/JAWS) on Windows or VoiceOver on Mac

**Checkpoint**: User Stories 1, 2, & 3 complete - Mobile responsive, animated, performant, and fully accessible

---

## Phase 6: User Story 4 - Responsive Design System (Priority: P3)

**Goal**: Establish consistent breakpoint system (xs:320px, sm:640px, md:768px, lg:1024px) that simplifies future component development.

**Independent Test**:
1. Resize browser to each breakpoint (320, 640, 768, 1024, 1280px)
2. Verify all components render correctly at each breakpoint
3. Confirm no layout jumps or reflows
4. Test grid component: 1 col (xs), 2 cols (sm), 3 cols (md), 4 cols (lg)

### Implementation for User Story 4

- [X] T054 [P] [US4] Create responsive grid utility component `components/ui/ResponsiveGrid.tsx` with breakpoint-aware columns (1/2/3/4 pattern)
- [X] T055 [P] [US4] Create breakpoint testing reference in `app/globals.css` with visual breakpoint indicators (comment block with breakpoint values)
- [X] T056 [P] [US4] Document responsive patterns in project README or design guide comment block in `tailwind.config.ts`
- [X] T057 [US4] Apply consistent breakpoint classes to all grid components (`ProductGrid`, `VariantManager`, `CategoryManager`)
- [X] T058 [US4] Test at each breakpoint (320, 640, 768, 1024, 1280px) for layout stability and no horizontal scroll
- [X] T059 [US4] Document responsive utilities in `app/globals.css` for developer reference (comments explaining responsive patterns)
- [X] T060 [US4] Create breakpoint test scenarios in spec documenting expected layout at each breakpoint

**Checkpoint**: All user stories complete - System fully responsive, animated, accessible, and built on consistent design system

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final optimizations and comprehensive validation across entire system

- [X] T061 [P] Edge case testing: Very long text in mobile doesn't break layout (word-break utilities)
- [X] T062 [P] Edge case testing: Product images with different aspect ratios maintain proportions (aspect-ratio utilities)
- [X] T063 [P] Edge case testing: Modals/drawers on 320px are fully functional and scrollable
- [X] T064 [P] Edge case testing: Touchscreen hover states properly handled (remove hover on touch devices via media query)
- [X] T065 [P] Edge case testing: Device rotation (portrait ↔ landscape) layout adapts fluidly
- [ ] T066 [P] Test on real devices: iPhone SE (320px), iPhone 12 (390px), iPad (768px), Android (various sizes)
- [ ] T067 [P] Test on real browsers: Chrome, Safari, Firefox (latest versions)
- [ ] T068 [P] Performance optimization: Verify no unused CSS with `@apply` analysis in Tailwind
- [ ] T069 Final Lighthouse audit: Verify all pages meet success criteria (Performance ≥90, Accessibility ≥95, Best Practices ≥90)
- [ ] T070 Final axe-core scan: Confirm 0 automated accessibility errors
- [X] T071 Document all responsive patterns and breakpoint usage in `tailwind.config.ts` comments
- [X] T072 Create responsive component checklist for future development in project docs

---

## Dependencies & Execution Order

### Phase Dependencies

1. **Setup (Phase 1)**: No dependencies - can start immediately ✓
2. **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
3. **User Stories (Phase 3-6)**: All depend on Foundational phase completion
   - US1 (P1) → US2 (P2) → US3 (P2) → US4 (P3) - sequential prioritized order
   - Can run in parallel with separate developers once Foundational is complete
4. **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (Mobile Responsiveness)**: Foundation for all other stories - must complete first
- **User Story 2 (Animations)**: Can start after Foundational phase (independent of US1 completion, but enhances US1)
- **User Story 3 (Performance/Accessibility)**: Validates all previous work, can run in parallel with US2
- **User Story 4 (Design System)**: Runs last (P3) to document patterns from all other stories

### Within Each User Story

1. Component updates ([P] tasks) run in parallel
2. Integration/validation tasks run after parallel component work
3. Testing tasks run last within the story

### Parallel Opportunities

**Phase 1**: All Setup tasks marked [P] can run in parallel (6 parallel tasks)

**Phase 2**: All Foundational tasks marked [P] can run in parallel (7 parallel tasks)

**Phase 3 (US1 Mobile)**: Components marked [P] can run in parallel (8 parallel tasks)

**Phase 4 (US2 Animations)**: Animation additions marked [P] can run in parallel (7 parallel tasks)

**Phase 5 (US3 Performance/Accessibility)**: Optimizations marked [P] can run in parallel (8 parallel tasks)

**Phase 6 (US4 Design System)**: Documentation tasks marked [P] can run in parallel (2 parallel tasks)

**Phase 7 (Polish)**: Edge case testing marked [P] can run in parallel (8 parallel tasks)

### Parallel Example: Phase 2 Foundational

```bash
# Developer 1: Update base UI components (parallel)
- T007: Button responsive + animations
- T009: Card responsive + animations
- T011: Badge responsive

# Developer 2: Update form components (parallel)
- T008: Input responsive + feedback
- T012: Spinner animation
- T013: CartNotification toast

# Developer 3: Update layout/config (sequential)
- T014: globals.css responsive typography
- T015: layout.tsx meta settings
- T016: Utility documentation
```

### Parallel Example: Phase 3 (US1 Mobile)

```bash
# Developer 1: Layout & Navigation (parallel)
- T017: Header.tsx mobile menu
- T018: Footer.tsx responsive stacking

# Developer 2: Catalog & Product (parallel)
- T019: ProductGrid.tsx responsive columns
- T020: ProductCard.tsx responsive images

# Developer 3: Cart & Forms (parallel)
- T021: CartItem.tsx responsive
- T022: CartSummary.tsx sticky footer
- T024: carrito page responsive

# Developer 4: Validation & Testing (sequential after others)
- T027: 320px viewport testing
- T028: CLS fixes
```

---

## Implementation Strategy

### MVP First: User Story 1 Only (Mobile Foundation)

**Timeline: 3-4 days with 1 developer**

1. Complete **Phase 1**: Setup (1 day)
   - Tailwind config, CSS variables, motion utilities
   
2. Complete **Phase 2**: Foundational (1.5 days)
   - All base UI components (Button, Input, Modal, etc.)
   - Responsive typography + utilities
   
3. Complete **Phase 3**: User Story 1 (1-1.5 days)
   - Header, Footer, Product Grid, Cart, Checkout pages
   - 320px testing & CLS fixes
   
4. **STOP and VALIDATE**: Run Lighthouse + test on real device
5. Deploy/Demo US1 Mobile MVP

**Result**: Fully functional mobile experience, ready for users on small phones

---

### Incremental Delivery: Add Each Story

**Timeline: 1 week with 1 developer**

1. **Day 1-2**: Phase 1 + Phase 2 (Setup + Foundational)
2. **Day 3**: Phase 3 (US1 Mobile) + Testing → Deploy MVP
3. **Day 4**: Phase 4 (US2 Animations) → Enhance with professional interactions
4. **Day 5**: Phase 5 (US3 Performance/Accessibility) → Optimize & audit
5. **Day 6**: Phase 6 (US4 Design System) + Phase 7 (Polish)
6. **Day 7**: Final validation → Deploy full feature

---

### Parallel Team Strategy: 4 Developers

**Timeline: 3-4 days**

**Phase 1 (1 person, 1 day)**: Setup (one dev handles)

**Phase 2 (4 people, 1 day in parallel)**:
- Dev 1: T007-T009 (Button, Input, Card)
- Dev 2: T010-T013 (Modal, Badge, Spinner, CartNotification)
- Dev 3: T014-T015 (globals.css, layout.tsx)
- Dev 4: T016 + Start Phase 3 prep

**Phase 3 (4 people in parallel, 1 day)**:
- Dev 1: T017-T018 (Header, Footer)
- Dev 2: T019-T020 (ProductGrid, ProductCard)
- Dev 3: T021-T024 (Cart, Checkout pages)
- Dev 4: T025-T028 (CategoryFilter, validation, testing)

**Phase 4 (4 people in parallel, 0.5 day)**:
- Dev 1: T029-T030 (Button, Input animations)
- Dev 2: T031-T033 (Validation, ProductCard, Modal animations)
- Dev 3: T034-T036 (Form, Cart, Page animations)
- Dev 4: T037-T038 (Testing, Performance check)

**Phase 5 (4 people in parallel, 1 day)**:
- Dev 1: T039-T043 (Image optimization, ARIA labels)
- Dev 2: T044-T046 (Keyboard navigation)
- Dev 3: T047-T050 (Color contrast, accessibility)
- Dev 4: T051-T053 (Audits, screen reader testing)

**Phase 6 (2 people, 0.5 day)**: US4 Design System documentation

**Phase 7 (Full team, 0.5 day)**: Final edge cases + validation

---

## Success Criteria Mapping

| Criteria | User Story | Tasks |
|----------|-----------|-------|
| SC-001: Lighthouse Performance ≥90 | US3 | T049, T069 |
| SC-002: Lighthouse Accessibility ≥95 | US3 | T041-T053, T069 |
| SC-003: Lighthouse Best Practices ≥90 | US2, US3 | T037-T038, T069 |
| SC-004: LCP ≤4s, FID ≤100ms, CLS ≤0.1 | US1, US3 | T028, T049-T053 |
| SC-005: 100% functional at 320px | US1 | T017-T028 |
| SC-006: 0 layout shifts | US1, US3 | T028, T061-T065 |
| SC-007: 100% keyboard accessible | US3 | T048, T052-T053 |
| SC-008: WCAG AA compliance | US3 | T041-T053 |
| SC-009: 4.5:1 color contrast | US3 | T047 |
| SC-010: 0 axe-core errors | US3 | T051, T070 |
| SC-011: FCP ≤2s (mobile 4G) | US3 | T049-T050 |
| SC-012: Bundle <300KB gzipped | US3 | T049, T068 |
| SC-013: FID <100ms | US3 | T049-T050 |
| SC-014: Tested on Chrome/Safari/Firefox | US1, US3 | T066-T067 |
| SC-015: Functional iOS 14+, Android 10+ | US1, US3 | T066-T067 |

---

## Notes

- [P] tasks = different files/components, no inter-dependencies
- [Story] label (US1-US4) maps each task to specific user story for traceability
- Each user story is independently completable and testable
- Mobile-first approach: Start with 320px, enhance for larger screens
- All components update iteratively: responsive → animations → accessibility → optimization
- No new dependencies required (Tailwind + CSS native animations)
- Commit after each phase or logical task group
- Stop at each checkpoint to validate story independently
- Real device testing required (not just DevTools)
