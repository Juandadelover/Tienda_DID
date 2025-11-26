<!--
SYNC IMPACT REPORT - Constitution v1.0.0
═══════════════════════════════════════════════════════════════

VERSION CHANGE: Initial constitution (0.0.0 → 1.0.0)

RATIONALE: First formal constitution establishing core principles for Tienda DID
e-commerce platform development. MAJOR version bump as this establishes the
foundational governance framework.

MODIFIED PRINCIPLES:
- All principles created from template

ADDED SECTIONS:
✅ I. Mobile-First Responsive Design
✅ II. User Experience for All Ages
✅ III. Performance & Optimization
✅ IV. Component Modularity & Reusability
✅ V. Security & Data Privacy
✅ Technology Stack Requirements
✅ Development Standards

REMOVED SECTIONS: None (initial version)

TEMPLATES STATUS:
✅ .specify/templates/plan-template.md - Compatible (constitution gates present)
✅ .specify/templates/spec-template.md - Compatible (user story priority format aligned)
✅ .specify/templates/tasks-template.md - Compatible (phase structure aligned)
⚠  Other templates - Review recommended for consistency

FOLLOW-UP TODOs: None

═══════════════════════════════════════════════════════════════
-->

# Tienda DID E-Commerce Platform Constitution

## Core Principles

### I. Mobile-First Responsive Design

**MUST** design and implement all interfaces with mobile devices as the primary target platform.

- Mobile viewports (≤768px) receive priority in design and testing
- Tablet and desktop layouts MUST gracefully scale from mobile foundation
- Touch targets MUST be ≥44x44px for optimal usability on mobile devices
- All features MUST be fully functional on mobile before desktop optimization
- Responsive breakpoints MUST follow industry standards: mobile (<768px), tablet (768-1024px), desktop (>1024px)

**Rationale**: The majority of Tienda DID customers will access the platform via smartphones. Mobile-first ensures the core experience is optimized for the primary user base.

### II. User Experience for All Ages

**MUST** create interfaces accessible and intuitive for users of varying technical literacy, from young adults to elderly customers.

- Font sizes MUST be ≥16px for body text, ≥20px for important actions
- Color contrast MUST meet WCAG AA standards (minimum 4.5:1 for normal text)
- Navigation MUST be clear with obvious visual hierarchy
- Action buttons MUST use clear, simple Spanish language labels
- Complex flows (e.g., checkout) MUST be broken into simple, guided steps
- Visual feedback MUST be immediate for all user interactions

**Rationale**: Neighborhood store customers span all age groups and technical backgrounds. The system must serve everyone equally well without requiring technical expertise.

### III. Performance & Optimization

**MUST** maintain fast load times and smooth interactions across varying network conditions.

- Initial page load MUST complete in <3 seconds on 3G networks
- Images MUST be optimized (WebP format preferred) with lazy loading implemented
- Bundle size MUST be monitored and kept minimal through code splitting
- Core Web Vitals MUST meet "Good" thresholds: LCP <2.5s, FID <100ms, CLS <0.1
- Database queries MUST be optimized with proper indexing
- API responses MUST include appropriate caching headers

**Rationale**: Colombian mobile networks vary in quality. Performance optimization ensures reliable service regardless of connection speed, preventing customer frustration and cart abandonment.

### IV. Component Modularity & Reusability

**MUST** structure code as reusable, self-contained components following React best practices.

- Components MUST have single, well-defined responsibilities
- Shared components (buttons, cards, forms) MUST be abstracted into `components/` directory
- Business logic MUST be separated from presentation through custom hooks or service layers
- Component props MUST be typed with TypeScript interfaces
- Each component MUST include JSDoc comments explaining purpose and usage
- Styles MUST use Tailwind utility classes for consistency

**Rationale**: Modular components accelerate development, reduce bugs through reuse, and simplify maintenance. This is critical for rapid iteration on customer feedback.

### V. Security & Data Privacy

**MUST** implement security best practices and respect customer privacy throughout the platform.

- Authentication MUST use Supabase Auth with secure session management
- Admin panel MUST be protected with Row Level Security (RLS) policies
- User input MUST be validated and sanitized on both client and server
- Sensitive configuration (API keys, secrets) MUST use environment variables, never committed to repository
- Customer data shared via WhatsApp MUST be minimal (name, phone, address only as needed)
- No customer data MUST be stored beyond order fulfillment requirements
- HTTPS MUST be enforced in production environments

**Rationale**: Customer trust is paramount. Security protects both business operations and customer privacy, ensuring compliance with data protection expectations.

## Technology Stack Requirements

**Approved Technologies** (as per project requirements document):

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS 4.x
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (for product images)
- **Deployment**: Vercel
- **Version Control**: Git with semantic commit messages

**Technology Constraints**:

- Server components MUST be used by default; client components only when interactivity required
- API routes MUST be implemented using Next.js Route Handlers
- Database schema MUST follow structure defined in requirements document (categories, products, product_variants, settings tables)
- Environment variables MUST be prefixed with `NEXT_PUBLIC_` only when client access required

**Rationale**: Standardized stack ensures consistency, leverages Next.js SSR for SEO, and provides scalable infrastructure through Supabase and Vercel.

## Development Standards

### Code Quality

- **TypeScript strict mode** MUST be enabled; no `any` types without explicit justification
- **ESLint** MUST pass without errors before commits
- **Code comments** MUST explain "why" for complex business logic, not "what"
- **Error handling** MUST provide user-friendly messages in Spanish
- **Console logs** MUST be removed before production deployment

### Testing & Validation

- **Manual testing** MUST verify functionality on mobile devices before considering features complete
- **Cross-browser testing** MUST include Chrome, Safari (iOS), and Firefox at minimum
- **Accessibility testing** MUST verify keyboard navigation and screen reader compatibility for critical flows
- **WhatsApp integration** MUST be tested on both WhatsApp Web and mobile app

### Documentation

- **README.md** MUST include setup instructions, environment variables required, and deployment steps
- **Component documentation** MUST exist for all reusable components
- **API documentation** MUST describe all route handlers with request/response formats
- **Database schema** MUST be documented with table relationships and field descriptions

### Git Workflow

- **Commit messages** MUST follow format: `type(scope): description` (e.g., `feat(cart): add quantity increment`)
- **Branch naming** MUST follow: `feature/###-description` or `fix/###-description`
- **Pull requests** MUST include description of changes and testing performed
- **Main branch** MUST always be deployable

## Governance

This constitution supersedes all other development practices and serves as the authoritative guide for Tienda DID platform development.

**Amendment Process**:

1. Proposed changes MUST be documented with rationale and impact assessment
2. Constitution version MUST be incremented following semantic versioning:
   - **MAJOR**: Backward-incompatible principle removal or fundamental redefinition
   - **MINOR**: New principle added or significant expansion of guidance
   - **PATCH**: Clarifications, wording improvements, or non-semantic corrections
3. All template files MUST be reviewed and updated to align with amendments
4. Amendment history MUST be tracked in Sync Impact Report comments

**Compliance**:

- All feature specifications MUST verify alignment with constitution principles
- Implementation plans MUST include "Constitution Check" gates
- Code reviews MUST validate adherence to defined standards
- Complexity or deviations MUST be explicitly justified in documentation

**Living Document**:

This constitution evolves with project needs. Regular reviews ensure principles remain relevant and practical as Tienda DID grows.

**Version**: 1.0.0 | **Ratified**: 2025-11-25 | **Last Amended**: 2025-11-25
