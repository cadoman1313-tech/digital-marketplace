# Digital Marketplace for Local Small Businesses

A polished e-commerce marketplace for local small businesses to showcase products, receive orders, and manage storefront operations from one trustworthy platform.

The product should feel like a real local commerce app: warm, clean, spacious, and practical. The interface direction favors rich natural green, cream/off-white surfaces, charcoal text, soft gold highlights, light sage support tones, and small blue accents for focused actions or states.

## Project Goals

- Help customers discover nearby businesses and products.
- Give small businesses a simple way to manage products, inventory, orders, and storefront details.
- Support admin oversight without turning the product into a generic dashboard.
- Establish a design system before building pages so every screen feels consistent and premium.

## Planned Stack

- Frontend: React
- Backend: PHP
- Database: MySQL

## Planned Product Areas

- Landing page
- Login and registration
- Customer marketplace
- Product details
- Cart
- Customer orders
- Business owner dashboard
- Business profile
- Product management
- Order management
- Admin dashboard

## Repository Structure

```text
frontend/   React/Vite marketplace prototype and UI code
backend/    PHP API structure, domain logic, and future routes
database/   MySQL planning, migrations, seeds, and schema notes
docs/       Product documentation and design system
```

## Foundation Documents

- [Design system](docs/design-system.md)
- [Database planning](database/schema-plan.md)

## Design Principles

- Keep layouts spacious and calm.
- Use green deliberately for brand, primary actions, active states, and trust moments.
- Prefer elegant typography, clear spacing, and restrained shadows over decorative noise.
- Build marketplace pages around product discovery and buyer confidence.
- Build business tools around clarity, scanability, and efficient order handling.
- Avoid crowded dashboards, random gradients, repeated icon rows, and bulky generic admin panels.

## Current Status

This repository currently contains the project foundation plus a working React/Vite frontend prototype. The frontend uses mock data and localStorage only; the PHP/MySQL backend is not connected yet.

## Frontend Deployment

The React frontend can be deployed as a static app to GitHub Pages.

- App folder: `frontend/`
- Build output: `frontend/dist`
- GitHub Pages base path: `/digital-marketplace/`
- Expected Pages URL: `https://cadoman1313-tech.github.io/digital-marketplace/`
- Workflow: `.github/workflows/deploy-frontend.yml`

The workflow runs on pushes to `main`, installs dependencies inside `frontend/`, runs `npm ci`, builds with `npm run build`, and publishes only `frontend/dist` through GitHub Pages. It does not deploy the PHP backend or MySQL database planning files.

In the repository settings, configure Pages to use **GitHub Actions** as the source.
