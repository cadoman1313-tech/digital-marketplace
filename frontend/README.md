# Frontend Structure

React application files will live here. The project has not been scaffolded into a runnable app yet; this folder currently defines the intended structure for future implementation.

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
