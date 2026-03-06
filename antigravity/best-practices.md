# 🏠 Best Practices — Nuxt Real Estate App

---

## 📁 Project Structure
- Use `app/` for pages, components, and layouts
- Organize by domain: `components/property/`, `components/ui/`
- Keep business logic in `composables/` (e.g., `useProperties`, `useFilters`)
- Define shared TypeScript types for `Property`, `Agent`, `Location`
- Use `server/api/` for all backend logic — never expose it to the client

## � URL Slugs
- Use human-readable slugs for property pages: `/properties/modern-villa-miami-beach` instead of `/properties/123`
- Generate slugs from the property title: lowercase, spaces replaced with `-`, no special characters
- Store the slug as a unique column in the database and index it for fast lookups
- Use Nuxt dynamic routes: `pages/properties/[slug].vue` — fetch by slug on the server
- Redirect legacy `/id`-based URLs to slug URLs with a 301 to preserve SEO equity
- Keep slugs stable — changing a slug breaks backlinks and SEO rankings; use redirects if a rename is needed
- Include location in the slug when possible: `2-bedroom-apartment-downtown-miami` for better keyword targeting

## �🚀 Performance & SEO
- Enable **SSR** for search-engine-indexable listings
- Use `useSeoMeta` with dynamic title, description, and Open Graph per property
- Optimize images with `<NuxtImg>` (`@nuxt/image`) — WebP, resizing, CDN
- Paginate listings from the server; never load all records at once
- Add JSON-LD schema (`RealEstateListing`) for Google rich results
- Use `routeRules` for pre-rendering or ISR on low-change pages

## 🗂️ Supabase
- Use only the `anon` key on the client — never `service_role`
- Enable **RLS** on every table
- Index frequently filtered columns: `price`, `location`, `type`, `status`
- Filter and search from server-side API routes, not the client
- Cache with `useAsyncData` using a descriptive key

## 🎨 UI/UX
- Always show: price, area, bedrooms, bathrooms, location, status
- Add a prominent photo gallery/slider per property
- Include an interactive map (Mapbox, Google Maps, or Leaflet)
- Provide advanced filters: price range, type, rooms, location
- Add a clear CTA on every listing: "Schedule Visit", "Contact Agent"
- Design **Mobile First** — most users browse from phones
- Use skeleton loaders instead of generic spinners

## 🔐 Security
- Prefix public env vars with `NUXT_PUBLIC_`; keep secrets server-only
- Validate all search/filter params before querying the database
- Protect admin routes with `middleware/auth.ts`
- Apply rate limiting on contact/form endpoints

## 🧪 Code Quality
- Use TypeScript with `strict: true` throughout
- Lint with `@nuxt/eslint` + Prettier
- Test composables with Vitest
- Use conventional commits: `feat:`, `fix:`, `chore:`

## 📊 Analytics & Monitoring
- Track events: "view property", "contact agent", "save favorite"
- Monitor Core Web Vitals (LCP, CLS, FID) — directly impacts SEO
- Set up **Sentry** for production error tracking

## 🚢 Deployment
- Use environment variables per stage (`.env.local`, `.env.production`)
- Generate a dynamic sitemap with `@nuxtjs/sitemap`
- Automate with CI/CD (GitHub Actions + Vercel/Netlify/Railway)
- Serve assets via CDN for low-latency delivery
