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
    checkout/
    buyer/
    login/
    register/
    dashboard/
    list/
    profile/
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

## GitHub Pages Deployment

This Vite app is configured with the GitHub Pages base path:

```js
base: '/digital-marketplace/'
```

Deployment is handled by `.github/workflows/deploy-frontend.yml` from the repository root. On pushes to `main`, GitHub Actions installs dependencies in `frontend/`, runs `npm ci`, builds with `npm run build`, and deploys `frontend/dist` to GitHub Pages.

The GitHub Pages source should be set to **GitHub Actions** in the repository settings. The deployed frontend is static and uses mock/localStorage data only; no PHP, MySQL, or real payment provider is deployed.

The production app uses React Router's `HashRouter` so refreshing nested routes on GitHub Pages does not request missing static files from the server. Deployed route URLs use the hash form, such as `/#/marketplace`, while the React route paths remain `/marketplace`, `/cart`, `/checkout`, and so on.

## Implemented Prototype Pages

- Landing page
- Buyer login page
- Buyer register page
- Buyer dashboard
- Seller login page
- Seller register page
- Seller dashboard
- Seller directory
- Seller storefront profile page
- Customer marketplace page
- Product details page
- Cart page
- Checkout page
- Order success page
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
- Marketplace browsing supports category filters, product/seller/category search, and sorting by newest, price, or rating.
- Expanded mock catalog includes 48 products across Fresh Produce, Handmade Crafts, Clothing, Beauty & Skincare, Food & Snacks, Electronics Accessories, Home Goods, and Art & Decor.
- Seller storefront pages include profile details, cover area, owner, contact placeholders, operating hours, rating, completed orders, fulfillment options, and seller product grids.
- Frontend-only checkout supports delivery/pickup, buyer details, demo card fields, demo mobile money fields, cash on delivery, and cash on pickup.
- Placing an order creates a mock localStorage order, clears the cart, and routes to an order success screen.
- Seller profile and seller product stock are managed locally with localStorage.
- Seller dashboard supports business bio, contact details, image placeholder or URL, product add/edit/delete, stock levels, and seller order rows.
- Buyer dashboard shows profile summary, recent orders, saved products, and a continue shopping action.

## Main Routes

```text
/                         Landing page
/marketplace              Customer marketplace
/products/:productId      Product details
/cart                     Cart
/checkout                 Frontend-only checkout and demo payment
/order-success            Mock order success
/orders                   Customer orders
/buyer/login              Buyer login
/buyer/register           Buyer registration
/buyer/dashboard          Buyer dashboard
/seller/login             Seller login
/seller/register          Seller registration
/seller/dashboard         Seller dashboard
/seller/:sellerId         Seller storefront profile
/sellers                  Seller directory
/business/profile         Seller profile editor
/business/products        Seller product management
/business/orders          Seller order management
/admin                    Admin dashboard
```
