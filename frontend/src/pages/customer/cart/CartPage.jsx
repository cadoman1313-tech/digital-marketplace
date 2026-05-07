import { ArrowRight, CreditCard, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { useMarketplace } from '../../../state/MarketplaceContext.jsx';
import { formatCurrency } from '../../../utils/formatters.js';

export function CartPage() {
  const {
    cartItemCount,
    cartItems,
    cartSubtotal,
    clearCart,
    removeFromCart,
    updateCartQuantity,
  } = useMarketplace();
  const delivery = cartItemCount > 0 ? 45 : 0;
  const total = cartSubtotal + delivery;

  return (
    <main className="page-shell cart-page">
      <section className="page-intro">
        <div>
          <span className="eyebrow">Cart</span>
          <h1>Your local order basket.</h1>
          <p>Review selected products, adjust quantities, and keep shopping before the Botswana checkout demo.</p>
        </div>
      </section>

      {cartItems.length === 0 ? (
        <EmptyState
          actionLabel="Browse marketplace"
          actionTo="/marketplace"
          title="Your cart is empty"
          description="Add products from local sellers and they will stay here after refreshing the page."
        />
      ) : (
        <div className="cart-layout">
          <section className="cart-list" aria-label="Cart items">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.productId}>
                {item.product.image ? (
                  <img src={item.product.image} alt={item.product.name} />
                ) : (
                  <div className="image-placeholder">Product image</div>
                )}
                <div>
                  <h2>{item.product.name}</h2>
                  <p>{item.product.category}</p>
                  <div className="cart-item__controls">
                    <button
                      aria-label={`Decrease ${item.product.name}`}
                      onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                      type="button"
                    >
                      <Minus size={15} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      aria-label={`Increase ${item.product.name}`}
                      onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                      type="button"
                    >
                      <Plus size={15} />
                    </button>
                    <button
                      aria-label={`Remove ${item.product.name}`}
                      onClick={() => removeFromCart(item.productId)}
                      type="button"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                <strong>{formatCurrency(item.product.price * item.quantity)}</strong>
              </article>
            ))}
          </section>

          <aside className="summary-panel">
            <h2>Cart summary</h2>
            <dl>
              <div>
                <dt>Items</dt>
                <dd>{cartItemCount}</dd>
              </div>
              <div>
                <dt>Subtotal</dt>
                <dd>{formatCurrency(cartSubtotal)}</dd>
              </div>
              <div>
                <dt>Estimated delivery</dt>
                <dd>{formatCurrency(delivery)}</dd>
              </div>
              <div>
                <dt>Total</dt>
                <dd>{formatCurrency(total)}</dd>
              </div>
            </dl>
            <p>
              Continue to a frontend-only checkout with demo payment options and
              no real payment processing.
            </p>
            <Button to="/checkout" icon={<CreditCard size={18} />}>
              Go to checkout
            </Button>
            <Button to="/marketplace" variant="secondary" icon={<ArrowRight size={18} />}>
              Continue shopping
            </Button>
            <Button onClick={clearCart} variant="ghost">
              Clear cart
            </Button>
          </aside>
        </div>
      )}

      {cartItems.length > 0 ? (
        <section className="cart-note">
          <EmptyState
            title="Demo checkout only"
            description="The checkout creates a mock order in localStorage and clears the cart without connecting to any real payment provider."
          />
        </section>
      ) : null}
    </main>
  );
}
