# Digital Marketplace Frontend

First working React prototype for the Digital Marketplace project. The app uses local demo data only and does not connect to the PHP backend yet.

## Stack

- React
- React Router
- Vite
- Local mock data

```text
frontend/
  public/              Static public assets
  src/
    app/               App shell, providers, and route registration
    assets/            Images, icons, and local media
    components/        Shared reusable UI and layout components
    hooks/             Shared React hooks
    pages/             Route-level page components grouped by audience
    services/          API clients and browser-side service helpers
    state/             Shared client state and stores
    styles/            Design tokens, global CSS, and theme files
    utils/             Frontend utility functions
```

Planned page folders:

```text
pages/
  landing/
  auth/
    login/
    register/
  customer/
    marketplace/
    product-details/
    cart/
    orders/
  business/
    dashboard/
    profile/
    products/
    orders/
  admin/
    dashboard/
```

Use the rules in `../docs/design-system.md` before building any page.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Implemented Prototype Pages

- Landing page
- Login page
- Register page
- Customer marketplace page
- Product details page
- Cart page
- Customer orders page
- Business owner dashboard
- Business profile page
- Product management page
- Business order management page
- Admin dashboard
