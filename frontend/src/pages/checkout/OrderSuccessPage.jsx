import { CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { useMarketplace } from '../../state/MarketplaceContext.jsx';
import { formatCurrency } from '../../utils/formatters.js';

export function OrderSuccessPage() {
  const { lastOrder } = useMarketplace();

  return (
    <main className="page-shell order-success-page">
      <section className="success-panel">
        <CheckCircle2 size={42} />
        <span className="eyebrow">Order created</span>
        <h1>{lastOrder ? `Order ${lastOrder.id}` : 'Order created locally'}</h1>
        <p>
          This is a frontend-only success state. No real payment was processed
          and no backend order was created.
        </p>

        {lastOrder ? (
          <dl>
            <div>
              <dt>Buyer</dt>
              <dd>{lastOrder.buyerName}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>{formatCurrency(lastOrder.total)}</dd>
            </div>
            <div>
              <dt>Payment method</dt>
              <dd>{lastOrder.paymentMethod}</dd>
            </div>
            <div>
              <dt>Delivery or pickup</dt>
              <dd>{lastOrder.fulfillment}</dd>
            </div>
          </dl>
        ) : null}

        <div className="button-row">
          <Button to="/orders">View orders</Button>
          <Button to="/marketplace" variant="secondary">
            Continue shopping
          </Button>
        </div>
      </section>
    </main>
  );
}
