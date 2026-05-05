import { Button } from '../../../components/ui/Button.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { StatusPill } from '../../../components/ui/StatusPill.jsx';
import { businesses, customerOrders } from '../../../data/mockData.js';
import { formatCurrency, getBusiness } from '../../../utils/formatters.js';

export function CustomerOrdersPage() {
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
        {customerOrders.map((order) => {
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
                <span>{order.placedAt}</span>
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
