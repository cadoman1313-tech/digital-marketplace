import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { cartItems, products } from '../../../data/mockData.js';
import { formatCurrency, getProduct } from '../../../utils/formatters.js';

export function CartPage() {
  const items = cartItems.map((item) => ({
    ...item,
    product: getProduct(products, item.productId),
  }));
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = 55;

  return (
    <main className="page-shell cart-page">
      <section className="page-intro">
        <div>
          <span className="eyebrow">Cart</span>
          <h1>Your local order basket.</h1>
          <p>Review items from multiple nearby shops before checkout.</p>
        </div>
      </section>

      <div className="cart-layout">
        <section className="cart-list" aria-label="Cart items">
          {items.map((item) => (
            <article className="cart-item" key={item.productId}>
              <img src={item.product.image} alt={item.product.name} />
              <div>
                <h2>{item.product.name}</h2>
                <p>{item.product.category}</p>
                <span>Qty {item.quantity}</span>
              </div>
              <strong>{formatCurrency(item.product.price * item.quantity)}</strong>
            </article>
          ))}
          <EmptyState
            title="No saved items yet"
            description="Saved items will appear here when customers choose to keep products for later."
          />
        </section>

        <aside className="summary-panel">
          <h2>Order summary</h2>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{formatCurrency(subtotal)}</dd>
            </div>
            <div>
              <dt>Estimated delivery</dt>
              <dd>{formatCurrency(delivery)}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>{formatCurrency(subtotal + delivery)}</dd>
            </div>
          </dl>
          <Button icon={<ShoppingBag size={18} />}>Checkout</Button>
          <Button to="/marketplace" variant="ghost" icon={<ArrowRight size={18} />}>
            Continue shopping
          </Button>
        </aside>
      </div>
    </main>
  );
}
