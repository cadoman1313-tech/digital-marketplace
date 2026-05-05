import { Button } from '../../../components/ui/Button.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { StatusPill } from '../../../components/ui/StatusPill.jsx';
import { businesses } from '../../../data/mockData.js';
import { useMarketplace } from '../../../state/MarketplaceContext.jsx';
import { formatCurrency, getBusiness } from '../../../utils/formatters.js';

export function CustomerOrdersPage() {
  const { orders } = useMarketplace();

  return (
    <main className="page-shell orders-page">
      <section className="page-intro">
        <div>
          <span className="eyebrow">Customer orders</span>
          <h1>Track purchases across local shops.</h1>
          <p>Order statuses stay simple, readable, and focused on the next useful step.</p>
        </div>
      </section>

      <section className="order-stack">
        {orders.map((order) => {
          const business = getBusiness(businesses, order.sellerId) || { name: order.sellerName || 'Multiple sellers' };
          const itemSummary = order.items.map((item) => `${item.quantity} x ${item.productName}`).join(', ');

          return (
            <article className="order-card" key={order.id}>
              <div>
                <span>{order.id}</span>
                <h2>{business.name}</h2>
                <p>{itemSummary}</p>
                <span>Buyer: {order.buyerName}</span>
              </div>
              <div className="order-card__meta">
                <StatusPill status={order.status} />
                <span>{order.placedAt || order.orderDate}</span>
                <span>{order.fulfillment}</span>
                <strong>{formatCurrency(order.total)}</strong>
                <Button variant="secondary">View details</Button>
              </div>
            </article>
          );
        })}
      </section>

      <EmptyState
        title="No cancelled orders"
        description="Cancelled or refunded orders will be listed here when they need customer attention."
      />
    </main>
  );
}
