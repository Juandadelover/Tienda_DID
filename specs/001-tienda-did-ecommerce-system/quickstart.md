# Quick Start Guide: Tienda DID E-Commerce

**Project**: Sistema de ventas en línea Tienda DID  
**Stack**: Next.js 14+ | React 19 | TypeScript 5 | Tailwind CSS 4 | Supabase  
**For**: Developers setting up the project locally

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js**: 18.17+ or 20.x (LTS recommended)
- **npm** or **pnpm**: Latest version
- **Git**: For version control
- **Supabase Account**: Free tier at [supabase.com](https://supabase.com)
- **Code Editor**: VS Code recommended

---

## 1. Clone Repository

```bash
git clone https://github.com/your-org/tiendadid.git
cd tiendadid
```

---

## 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

**Dependencies installed**:
- `next@16.0.4` - Framework
- `react@19.2.0`, `react-dom@19.2.0` - UI library
- `@supabase/supabase-js` - Database client
- `tailwindcss@4.x` - Styling
- `zod` - Validation
- TypeScript, ESLint, and dev tools

---

## 3. Set Up Supabase Project

### 3.1 Create Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click **New Project**
3. Fill in:
   - **Name**: `tienda-did`
   - **Database Password**: (save this securely)
   - **Region**: South America (São Paulo recommended for Colombia)
4. Wait for project to provision (~2 minutes)

### 3.2 Get API Credentials

In your Supabase project dashboard:

1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://abcdefgh.supabase.co`)
   - **anon/public** key (starts with `eyJ...`)

---

## 4. Configure Environment Variables

Create `.env.local` in project root:

```bash
# Copy example file
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# App Config
NEXT_PUBLIC_STORE_NAME="Tienda DID"
NEXT_PUBLIC_WHATSAPP_NUMBER="573235725922"
NEXT_PUBLIC_STORE_ADDRESS="Sector 1 Manzana D-1, Barrio Villa Consuelo, Bosconia - Cesar"
```

---

## 5. Run Database Migrations

### Option A: Using Supabase SQL Editor (Recommended for first-time)

1. Go to **SQL Editor** in Supabase Dashboard
2. Copy content from `supabase/migrations/001_initial_schema.sql`
3. Paste and run
4. Repeat for:
   - `002_rls_policies.sql`
   - `003_storage_setup.sql`
5. Run seed data: `supabase/seed.sql`

### Option B: Using Supabase CLI (Advanced)

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push

# Seed database
supabase db seed
```

---

## 6. Create Admin User

In Supabase Dashboard:

1. Go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter:
   - **Email**: `admin@tiendadid.local` (or your email)
   - **Password**: (strong password)
   - **Auto Confirm**: ✅ Yes
4. Click **Create User**

**Save these credentials** - you'll use them to access `/admin`.

---

## 7. Configure Storage Bucket

In Supabase Dashboard:

1. Go to **Storage**
2. Click **Create Bucket**
3. Name: `product-images`
4. **Public bucket**: ✅ Yes
5. Click **Create**

Policies are already set via migration `003_storage_setup.sql`.

---

## 8. Run Development Server

```bash
npm run dev
```

Server starts at: **http://localhost:3000**

You should see:
- ✅ Home page loads
- ✅ Empty catalog (no products yet)
- ✅ Categories in sidebar (from seed data)

---

## 9. Access Admin Panel

1. Navigate to: **http://localhost:3000/login**
2. Enter admin credentials from Step 6
3. You should be redirected to `/admin`

**First Steps in Admin**:
- ✅ Create first product
- ✅ Upload product image
- ✅ Verify it appears in public catalog

---

## 10. Verify Everything Works

### Checklist:

- [ ] Home page loads without errors
- [ ] Categories filter is visible
- [ ] Search bar is functional
- [ ] Can log into admin panel
- [ ] Can create a product in admin
- [ ] Product appears in catalog
- [ ] Can add product to cart
- [ ] Cart persists on page reload
- [ ] Checkout form validates correctly
- [ ] WhatsApp button opens with formatted message

---

## Project Structure

```
tiendadid/
├── app/                  # Next.js App Router
│   ├── (public)/         # Public pages (catalog, cart, checkout)
│   ├── (admin)/          # Admin panel (products, categories)
│   └── api/              # API routes
├── components/           # React components
│   ├── ui/               # Base UI components
│   ├── catalog/          # Catalog-specific
│   ├── cart/             # Cart components
│   ├── checkout/         # Checkout flow
│   └── admin/            # Admin components
├── lib/                  # Utilities
│   ├── supabase/         # Supabase clients
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Helper functions
├── types/                # TypeScript types
├── public/               # Static assets
└── supabase/             # Database migrations & seeds
```

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Supabase
supabase gen types typescript --project-id your-id > lib/supabase/types.ts
supabase db reset        # Reset database (careful!)
```

---

## Troubleshooting

### Error: "Invalid Supabase URL"

- ✅ Check `.env.local` has correct `NEXT_PUBLIC_SUPABASE_URL`
- ✅ Restart dev server after changing env vars

### Error: "RLS policy violation"

- ✅ Ensure you've run `002_rls_policies.sql` migration
- ✅ Check you're logged in as admin for mutations

### Products not showing in catalog

- ✅ Check `is_available = true` in products table
- ✅ Verify category exists and is linked correctly
- ✅ Check browser console for errors

### WhatsApp button not working

- ✅ Verify `NEXT_PUBLIC_WHATSAPP_NUMBER` is in international format (573...)
- ✅ Check popup blocker isn't blocking new window
- ✅ Test in incognito mode

### Images not loading

- ✅ Verify `product-images` bucket is public
- ✅ Check storage policies are applied
- ✅ Confirm image URLs are correct format

---

## Next Steps

1. **Customize Design**: Edit `tailwind.config.ts` to adjust colors
2. **Add Products**: Populate catalog via admin panel
3. **Test on Mobile**: Use phone or browser DevTools
4. **Configure Vercel**: Ready to deploy with one click
5. **Set up Domain**: Point your custom domain

---

## Development Tips

### Hot Reload

Next.js hot reloads automatically on file changes. If stuck:

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### TypeScript Errors

Generate fresh types from Supabase:

```bash
npx supabase gen types typescript --project-id your-id > lib/supabase/types.ts
```

### Tailwind Not Working

Ensure `tailwind.config.ts` includes all content paths:

```typescript
content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
],
```

---

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Docs**: https://react.dev

---

## Support

- **Issues**: GitHub Issues tab
- **Questions**: Discussions tab
- **Email**: dev@tiendadid.com

---

**Ready to build! 🚀**

---

**Status**: ✅ Quickstart guide complete
