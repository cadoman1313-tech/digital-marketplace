# Digital Marketplace Design System

This design system defines the visual foundation for a premium local marketplace. The product should feel clean, trustworthy, warm, and commercially ready, not like a generic AI dashboard or bulky admin template.

## Design Personality

- Local and friendly, but polished enough for real commerce.
- Spacious and calm, with enough density for shopping and order workflows.
- Warm neutral surfaces with controlled green brand moments.
- Trustworthy typography, clear hierarchy, and restrained visual accents.
- Practical marketplace patterns over decorative dashboard layouts.

## Colour Palette

Use the rich natural green as the main brand colour, but do not flood the interface with it. Most screens should be grounded in cream, off-white, charcoal, and soft borders, with green used for primary actions, active navigation, key status signals, and selected states.

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-green-700` | `#1F6F43` | Primary brand, primary buttons, active states |
| `--color-green-800` | `#164D32` | Hover, pressed, high-emphasis headings on light green |
| `--color-green-100` | `#DDE8D5` | Light sage panels, filters, selected chips |
| `--color-green-050` | `#F1F6EE` | Subtle sage page bands and calm success backgrounds |
| `--color-cream` | `#F8F5EC` | Main warm background |
| `--color-off-white` | `#FFFCF6` | Cards, modals, form surfaces |
| `--color-charcoal` | `#222522` | Primary text |
| `--color-stone` | `#5F665F` | Secondary text and muted labels |
| `--color-border` | `#E3E0D5` | Borders, dividers, input outlines |
| `--color-gold` | `#C8A24A` | Premium accents, rating highlights, featured labels |
| `--color-gold-100` | `#F3E8C6` | Soft gold backgrounds |
| `--color-blue` | `#2F80C7` | Small informational accents, links, focus support |
| `--color-blue-100` | `#E8F2FB` | Informational backgrounds |
| `--color-success` | `#317A4B` | Success text and order completion |
| `--color-warning` | `#9F6A15` | Payment or fulfillment warnings |
| `--color-danger` | `#B5453C` | Errors and destructive actions |

### Colour Rules

- Primary marketplace surfaces should be cream or off-white.
- Green should appear in a controlled rhythm: primary CTA, selected nav item, checkout confirmation, seller verification, and important status markers.
- Gold is an accent, not a second brand colour. Use it for ratings, featured seller labels, subtle dividers, or premium badges.
- Blue should be reserved for links, informational notices, and focus affordances.
- Avoid neon colours, full-page gradients, and one-hue pages.

## Typography

Use elegant, readable typography that supports browsing and business operations.

### Font Families

- Primary UI font: `Inter`, `Avenir Next`, `Segoe UI`, system sans-serif.
- Optional editorial heading font: `Fraunces` or `Playfair Display` for landing-page brand moments only.
- Numeric data: use the primary UI font with tabular numbers where available.

### Type Scale

| Token | Size | Line Height | Usage |
| --- | --- | --- | --- |
| `text-xs` | `12px` | `16px` | Helper text, metadata, compact table labels |
| `text-sm` | `14px` | `20px` | Secondary text, form help, small controls |
| `text-md` | `16px` | `24px` | Body text, inputs, standard buttons |
| `text-lg` | `18px` | `28px` | Product summaries, section leads |
| `text-xl` | `20px` | `28px` | Card titles, modal headings |
| `text-2xl` | `24px` | `32px` | Page headings in app views |
| `text-3xl` | `32px` | `40px` | Landing and major page headings |
| `text-4xl` | `40px` | `48px` | Hero headings when a true hero is needed |

### Typography Rules

- Keep letter spacing at `0`.
- Do not scale font size directly with viewport width.
- Use `600` or `700` weight for headings, `500` for navigation and key labels, and `400` for body copy.
- Product names should be concise and readable, with truncation only after the second line.
- Dashboard labels should be compact and direct.

## Spacing

Use a 4px spacing base with a calm, consistent rhythm.

| Token | Value | Usage |
| --- | --- | --- |
| `space-1` | `4px` | Tight icon/text gaps |
| `space-2` | `8px` | Control internals, small vertical gaps |
| `space-3` | `12px` | Form label/input gaps, chips |
| `space-4` | `16px` | Standard component padding |
| `space-5` | `20px` | Dense section gaps |
| `space-6` | `24px` | Card padding and app panel gaps |
| `space-8` | `32px` | Page section spacing |
| `space-10` | `40px` | Large layout spacing |
| `space-12` | `48px` | Landing section spacing |
| `space-16` | `64px` | Major desktop page rhythm |

### Layout Spacing Rules

- Desktop page gutters: `32px` minimum.
- Tablet page gutters: `24px`.
- Mobile page gutters: `16px`.
- App content max width: `1180px`.
- Checkout and dashboard working areas may use `1280px` when tables need space.
- Avoid stacking unrelated cards with the same spacing everywhere; vary page composition with lists, tables, panels, and clear sections.

## Buttons

Buttons should feel refined, obvious, and touch-friendly.

### Primary Button

- Background: `#1F6F43`.
- Text: `#FFFCF6`.
- Hover: `#164D32`.
- Border: none.
- Radius: `10px`.
- Height: `44px` desktop, `48px` mobile.
- Padding: `0 18px`.
- Use for primary page actions such as checkout, save product, create account, and publish listing.

### Secondary Button

- Background: `#FFFCF6`.
- Text: `#1F6F43`.
- Border: `1px solid #DDE8D5`.
- Hover background: `#F1F6EE`.
- Use for alternate commerce actions such as view store, continue shopping, or add another product.

### Ghost Button

- Background: transparent.
- Text: `#222522`.
- Hover background: `#F1F6EE`.
- Use for low-emphasis navigation and utility actions.

### Gold Accent Button

- Background: `#C8A24A`.
- Text: `#222522`.
- Hover background: `#B89236`.
- Use sparingly for featured promotions or premium seller actions.

### Destructive Button

- Background: `#B5453C`.
- Text: `#FFFCF6`.
- Use only for irreversible actions.

### Button Rules

- Use icons only when they clarify the action.
- Keep button labels short and specific.
- Do not use multiple primary buttons in the same decision area.
- Loading states should keep the same width to avoid layout shift.
- Disabled states should reduce opacity and keep readable contrast.

## Cards

Cards are for repeated items, product tiles, order summaries, modals, and framed tools. Do not turn every page section into a floating card.

### Card Style

- Background: `#FFFCF6`.
- Border: `1px solid #E3E0D5`.
- Radius: `8px`.
- Shadow: `0 10px 30px rgba(34, 37, 34, 0.07)`.
- Padding: `16px` to `24px`, depending on density.

### Product Cards

- Image ratio: `4:5` or `1:1`, consistent within a grid.
- Product name: 2-line maximum before truncation.
- Price: strong, charcoal, close to product name.
- Business name: secondary text with optional verified marker.
- Rating or local distance may use gold or stone, not bright badges everywhere.
- Hover should lift subtly or reveal one clear action, not multiple controls.

### Dashboard Cards

- Use cards for summaries only when they answer an immediate operational question.
- Prefer tables, lists, and split panels for order management.
- Limit KPI cards to the few metrics a business owner can act on today.

## Forms

Forms should feel secure, simple, and guided.

### Input Style

- Background: `#FFFCF6`.
- Border: `1px solid #E3E0D5`.
- Radius: `8px`.
- Height: `44px` desktop, `48px` mobile.
- Padding: `0 14px`.
- Text: `#222522`.
- Placeholder: `#8A8F87`.
- Focus border: `#1F6F43`.
- Focus ring: `0 0 0 3px rgba(47, 128, 199, 0.16)`.

### Form Rules

- Labels sit above fields and use `14px` medium text.
- Required fields should use plain text indicators, not visual clutter.
- Help text appears below inputs in `12px` or `14px` muted text.
- Error states use `#B5453C` for border and message.
- Long forms should be grouped into clear sections with short headings.
- Business onboarding should feel encouraging and focused, not bureaucratic.

## Page Layout Rules

- Start with the usable product experience, not a marketing-heavy splash.
- Landing page hero should be concise and show the marketplace identity immediately.
- Marketplace pages should prioritize search, category browsing, product quality, and local business trust.
- Product detail pages should use strong imagery, concise details, seller context, and a clear purchase path.
- Cart and checkout should reduce distraction and make totals obvious.
- Business screens should support quick decisions: what needs fulfillment, what needs editing, and what changed recently.
- Admin screens should feel professional and restrained, not like a generic analytics template.

## Navigation Rules

- Use a simple top navigation for public and customer pages.
- Use a compact side navigation or top-left app rail for business and admin tools when the workflow needs persistent sections.
- Active nav state: green text or a small green underline/bar, not a filled heavy block everywhere.
- Use icons sparingly and pair unfamiliar icons with labels or tooltips.
- Mobile customer navigation can use a bottom bar for marketplace, cart, orders, and account.
- Business mobile navigation should collapse into a clean menu with high-priority actions surfaced.

## Dashboard Design Rules

Dashboards should be quiet operational workspaces, not decoration-heavy pages.

- Lead with the most urgent work: open orders, low stock, pending profile tasks, or unread customer notes.
- Keep summary metrics limited to 3 or 4 meaningful numbers.
- Use tables and structured lists for orders and products.
- Use filters as compact controls, not large card sections.
- Avoid random icon rows, decorative gradient panels, oversized stat cards, and repeated card grids.
- Empty states should be helpful and business-like, with one clear next action.
- Status chips should use restrained colour:
  - New: blue tint
  - Processing: gold tint
  - Ready or completed: green tint
  - Cancelled or failed: danger tint
- Admin dashboards should emphasize moderation, business approvals, platform health, and issue resolution.

## Component Direction

- Header: off-white surface, thin border, logo text in charcoal with a green brand mark.
- Search: large enough for marketplace discovery, with filters kept secondary.
- Product tile: image-led, minimal metadata, strong price, one clear action.
- Business badge: subtle sage or gold accent, never neon.
- Order row: status, buyer, total, fulfillment type, and primary next action.
- Modal: focused, off-white surface, `8px` radius, clear title and footer actions.
- Toasts: small, top-right desktop and bottom mobile, with restrained status colour.

## Accessibility

- Maintain readable contrast on all text and controls.
- Every form input needs a visible label.
- Interactive elements need visible focus states.
- Do not rely on colour alone for order status.
- Hit targets should be at least `44px` high.
- Product imagery must include useful alt text when implemented.

## Implementation Notes

Suggested CSS custom properties:

```css
:root {
  --color-green-700: #1F6F43;
  --color-green-800: #164D32;
  --color-green-100: #DDE8D5;
  --color-green-050: #F1F6EE;
  --color-cream: #F8F5EC;
  --color-off-white: #FFFCF6;
  --color-charcoal: #222522;
  --color-stone: #5F665F;
  --color-border: #E3E0D5;
  --color-gold: #C8A24A;
  --color-gold-100: #F3E8C6;
  --color-blue: #2F80C7;
  --color-blue-100: #E8F2FB;
  --color-success: #317A4B;
  --color-warning: #9F6A15;
  --color-danger: #B5453C;
}
```

Future UI work should start from these tokens before adding component-specific styling.
