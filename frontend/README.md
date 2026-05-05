# Digital Marketplace Frontend

Working React prototype for the Digital Marketplace project. The app uses local demo data and localStorage only; it does not connect to the PHP backend yet.

## Stack

- React
- React Router
- Vite
- Local mock data and localStorage state

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
  buyer/
    login/
    register/
    dashboard/
  seller/
    login/
    register/
    dashboard/
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
- Buyer login page
- Buyer register page
- Buyer dashboard
- Seller login page
- Seller register page
- Seller dashboard
- Customer marketplace page
- Product details page
- Cart page
- Customer orders page
- Business owner dashboard
- Business profile page
- Product management page
- Business order management page
- Admin dashboard

## Key Frontend Features

- Role-aware navigation for guest, buyer, seller, and admin preview modes.
- Clear links for buyer login/register, seller login/register, marketplace, cart, and seller dashboard.
- Add to Cart updates React state immediately.
- Cart count updates in the header.
- Cart contents, item count, subtotal, delivery estimate, and total are calculated dynamically.
- Cart quantity controls support increase, decrease, remove, clear cart, and empty state.
- Cart state persists in localStorage after refresh.
- Seller profile and seller product stock are managed locally with localStorage.
- Seller dashboard supports business bio, contact details, image placeholder or URL, product add/edit/delete, stock levels, and seller order rows.
- Buyer dashboard shows profile summary, recent orders, saved products, and a continue shopping action.

## Main Routes

```text
/                         Landing page
/marketplace              Customer marketplace
/products/:productId      Product details
/cart                     Cart
/orders                   Customer orders
/buyer/login              Buyer login
/buyer/register           Buyer registration
/buyer/dashboard          Buyer dashboard
/seller/login             Seller login
/seller/register          Seller registration
/seller/dashboard         Seller dashboard
/business/profile         Seller profile editor
/business/products        Seller product management
/business/orders          Seller order management
/admin                    Admin dashboard
```
