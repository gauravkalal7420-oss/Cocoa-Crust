# Cocoa & Crust — complete source code export

Exported from the Base44 app `prompt-cocoa-crust-club` on 2026-11-13.

## How to run

Dependencies are declared in `package.json` with the exact versions in `package-lock.json`; install them with your package manager of choice, then:

```bash
npm run dev      # local dev server
npm run build    # production build into ./dist
```

Fill in the `VITE_BASE44_*` variables from `.env.example` to point at the Base44 app.

## What is in here

| Path | Contents |
| --- | --- |
| `index.html` | Page shell, SEO/Open Graph tags, favicon, font preconnects |
| `src/pages/` | Home, Menu, ProductDetail, CustomCakes, Story, Visit, Contact, Cart, Checkout, OrderDetail, Orders, Account, login/register/reset, MFA |
| `src/components/` | Header, footer, layout, logo, marquee, product card, home sections, doodles, and the full shadcn/ui kit |
| `src/lib/` | Cart context, auth context, order helpers, MFA helpers, query client, utilities |
| `src/data/menu.js` | Catalog fallback data and the image map |
| `base44/entities/` | Product, Order, CakeRequest, ContactMessage and User schemas **with row-level security rules** |
| `base44/config.jsonc` | Build/serve configuration |
| `assets/images/` | All 15 original photographs plus the emblem logo |
| `data/products.json` | Live catalog (9 products) exported as a seed file |
| `.env.example` | Required environment variable names, no secrets |
| `package.json`, `package-lock.json` | Dependencies and the exact lockfile |

Every project file is included except `node_modules/` (restorable from the lockfile) and `.git/` (version history).

## Platform-hosted pieces (no source files exist)

- **Authentication** — sign-up, sign-in, email verification, password reset, Google sign-in and MFA are Base44 platform services called through `@/lib/authMfa*` and `@/api/base44Client`.
- **Database runtime** — Product, Order, CakeRequest and ContactMessage records live in the Base44 database. Only the schemas and the product catalog are exported; live customer records (1 order, 0 cake requests, 0 contact messages at export time) stay in the platform.
- **File storage** — images are served from `media.base44.com`. Copies of every image are in `assets/images/`, but the code still points at the hosted URLs.
- **Backend functions** — none exist in this app; the logic is browser code plus the platform entity API.
- **Secrets, app users, hosting** — not part of a code export.

The site cannot be fully self-hosted away from Base44: data, auth and storage are platform services. The frontend itself builds and runs anywhere that can reach the app.
