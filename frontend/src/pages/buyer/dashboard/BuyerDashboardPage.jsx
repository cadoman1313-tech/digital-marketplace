import { Heart, ShoppingBag } from 'lucide-react';
import { ProductCard } from '../../../components/marketplace/ProductCard.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { SectionHeader } from '../../../components/ui/SectionHeader.jsx';
import { StatusPill } from '../../../components/ui/StatusPill.jsx';
import { businesses, buyerProfiles, customerOrders, products } from '../../../data/mockData.js';
import { useMarketplace } from '../../../state/MarketplaceContext.jsx';
import { formatCurrency, getBusiness } from '../../../utils/formatters.js';

export function BuyerDashboardPage() {
  const buyer = buyerProfiles[0];
  const { cartItemCount } = useMarketplace();
  const savedProducts = buyer.savedProductIds
    .map((productId) => products.find((product) => product.id === productId))
    .filter(Boolean);

  return (
    <main className="page-shell buyer-dashboard">
      <section className="page-intro">
        <div>
          <span className="eyebrow">Buyer dashboard</span>
          <h1>Welcome back, {buyer.name}.</h1>
          <p>Your profile, recent orders, saved products, and current cart are all in one calm place.</p>
        </div>
        <Button to="/marketplace" icon={<ShoppingBag size={18} />}>
          Continue shopping
        </Button>
      </section>

      <div className="buyer-dashboard__grid">
        <section className="profile-summary">
          <div className="profile-avatar" aria-hidden="true">
            ND
          </div>
          <div>
            <h2>{buyer.name}</h2>
            <p>{buyer.email}</p>
            <span>{buyer.location}</span>
            <span>Member since {buyer.memberSince}</span>
          </div>
        </section>

        <section className="summary-panel">
          <h2>Shopping summary</h2>
          <dl>
            <div>
              <dt>Cart items</dt>
              <dd>{cartItemCount}</dd>
            </div>
            <div>
              <dt>Recent orders</dt>
              <dd>{customerOrders.length}</dd>
            </div>
            <div>
              <dt>Saved products</dt>
              <dd>{savedProducts.length}</dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="section section--flush">
        <SectionHeader
          eyebrow="Recent orders"
          title="Orders you may want to track"
          description="Demo buyer orders show how order status can stay readable without a heavy dashboard feel."
        />
        <div className="order-stack">
          {customerOrders.slice(0, 2).map((order) => {
            const business = getBusiness(businesses, order.businessId);

            return (
              <article className="order-card" key={order.id}>
                <div>
                  <span>{order.id}</span>
                  <h2>{business.name}</h2>
                  <p>{order.items.join(', ')}</p>
                </div>
                <div className="order-card__meta">
                  <StatusPill status={order.status} />
                  <strong>{formatCurrency(order.total)}</strong>
                  <Button variant="secondary">View order</Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section section--flush">
        <SectionHeader
          eyebrow="Saved favourites"
          title="Products saved for later"
          description="Favourites are mock data for now, with the same product cards customers use in the market."
          action={<Heart size={22} />}
        />
        {savedProducts.length ? (
          <div className="product-grid product-grid--three">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} businesses={businesses} compact />
            ))}
          </div>
        ) : (
          <EmptyState
            actionLabel="Browse products"
            actionTo="/marketplace"
            title="No favourite products yet"
            description="Saved products will appear here when buyers choose items they like."
          />
        )}
      </section>
    </main>
  );
}
