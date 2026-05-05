# MySQL Database Plan

This plan defines the expected data model for the marketplace. It is intentionally a planning document, not a final migration.

## Naming Conventions

- Use plural snake_case table names.
- Use `id` as the primary key on each table.
- Use `created_at` and `updated_at` timestamps on business entities.
- Store money as integer cents with a `currency` column.
- Use explicit status columns instead of deleting operational records.

## Core Tables

### users

Stores customer, business owner, and admin accounts.

- `id`
- `role` enum: `customer`, `business_owner`, `admin`
- `name`
- `email`
- `password_hash`
- `phone`
- `status` enum: `active`, `pending`, `suspended`
- `email_verified_at`
- `created_at`
- `updated_at`

### business_profiles

Stores the public storefront and operational profile for each business.

- `id`
- `owner_user_id`
- `business_name`
- `slug`
- `description`
- `category_id`
- `phone`
- `email`
- `address_line_1`
- `address_line_2`
- `city`
- `province`
- `postal_code`
- `latitude`
- `longitude`
- `logo_url`
- `cover_image_url`
- `status` enum: `draft`, `pending_review`, `active`, `paused`, `suspended`
- `created_at`
- `updated_at`

### categories

Supports product and business browsing.

- `id`
- `name`
- `slug`
- `description`
- `parent_id`
- `display_order`
- `is_active`

### products

Stores sellable products listed by businesses.

- `id`
- `business_id`
- `category_id`
- `name`
- `slug`
- `description`
- `price_cents`
- `currency`
- `stock_quantity`
- `sku`
- `status` enum: `draft`, `active`, `out_of_stock`, `archived`
- `is_featured`
- `created_at`
- `updated_at`

### product_images

Stores ordered product image references.

- `id`
- `product_id`
- `image_url`
- `alt_text`
- `display_order`
- `is_primary`

### addresses

Stores reusable customer delivery addresses.

- `id`
- `user_id`
- `label`
- `recipient_name`
- `phone`
- `address_line_1`
- `address_line_2`
- `city`
- `province`
- `postal_code`
- `delivery_notes`
- `is_default`

### carts

Stores active customer carts.

- `id`
- `user_id`
- `status` enum: `active`, `converted`, `abandoned`
- `created_at`
- `updated_at`

### cart_items

Stores products in a cart.

- `id`
- `cart_id`
- `product_id`
- `quantity`
- `unit_price_cents`
- `created_at`
- `updated_at`

### checkout_groups

Groups a checkout that may create separate orders for different businesses.

- `id`
- `customer_user_id`
- `status` enum: `started`, `completed`, `cancelled`
- `subtotal_cents`
- `delivery_fee_cents`
- `total_cents`
- `currency`
- `created_at`
- `updated_at`

### orders

Stores one business-specific order created from checkout.

- `id`
- `checkout_group_id`
- `order_number`
- `customer_user_id`
- `business_id`
- `delivery_address_id`
- `status` enum: `new`, `accepted`, `preparing`, `ready`, `completed`, `cancelled`
- `payment_status` enum: `pending`, `paid`, `failed`, `refunded`
- `fulfillment_method` enum: `pickup`, `delivery`
- `subtotal_cents`
- `delivery_fee_cents`
- `total_cents`
- `currency`
- `customer_note`
- `created_at`
- `updated_at`

### order_items

Stores immutable snapshots of purchased items.

- `id`
- `order_id`
- `product_id`
- `product_name`
- `sku`
- `unit_price_cents`
- `quantity`
- `line_total_cents`

### payment_attempts

Tracks payment attempts without forcing a payment provider decision yet.

- `id`
- `checkout_group_id`
- `provider`
- `provider_reference`
- `status` enum: `pending`, `succeeded`, `failed`, `refunded`
- `amount_cents`
- `currency`
- `created_at`
- `updated_at`

### reviews

Allows customers to review businesses and products after orders.

- `id`
- `customer_user_id`
- `business_id`
- `product_id`
- `order_id`
- `rating`
- `comment`
- `status` enum: `pending`, `published`, `hidden`
- `created_at`
- `updated_at`

### audit_logs

Tracks admin and operational actions.

- `id`
- `actor_user_id`
- `action`
- `entity_type`
- `entity_id`
- `metadata_json`
- `created_at`

## Key Relationships

- A `user` with role `business_owner` owns one or more `business_profiles`.
- A `business_profile` has many `products`.
- A `category` may group businesses and products.
- A `cart` belongs to one customer and has many `cart_items`.
- A `checkout_group` belongs to one customer and may produce many `orders`.
- An `order` belongs to one business and one customer.
- An `order` has many `order_items`.
- A `review` can target a business, a product, or both.

## Index Plan

- Unique index on `users.email`.
- Unique index on `business_profiles.slug`.
- Unique composite index on `products.business_id, products.slug`.
- Index `products.category_id, products.status`.
- Index `orders.customer_user_id, orders.created_at`.
- Index `orders.business_id, orders.status`.
- Unique index on `orders.order_number`.
- Index `cart_items.cart_id`.
- Index `reviews.business_id, reviews.status`.

## Migration Roadmap

1. Create users, addresses, and authentication support tables.
2. Create categories, business profiles, products, and product images.
3. Create carts, checkout groups, orders, and order items.
4. Add payment attempts, reviews, and audit logs.
5. Add development seed data for local businesses, products, and sample orders.
