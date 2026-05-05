import { CreditCard, PackageCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '../../components/forms/TextField.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { EmptyState } from '../../components/ui/EmptyState.jsx';
import { businesses } from '../../data/mockData.js';
import { useMarketplace } from '../../state/MarketplaceContext.jsx';
import { formatCurrency } from '../../utils/formatters.js';

const paymentLabels = {
  card: 'Card Payment Demo',
  mobile: 'Mobile Money Demo',
  delivery: 'Cash on Delivery',
  pickup: 'Cash on Pickup',
};

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItemCount, cartItems, cartSubtotal, createMockOrder } = useMarketplace();
  const [fulfillment, setFulfillment] = useState('Delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [errors, setErrors] = useState({});
  const deliveryFee = fulfillment === 'Delivery' && cartItemCount > 0 ? 55 : 0;
  const total = cartSubtotal + deliveryFee;

  const groupedItems = useMemo(
    () =>
      cartItems.reduce((groups, item) => {
        const seller = businesses.find((business) => business.id === (item.product.sellerId || item.product.businessId));
        const sellerName = item.product.sellerName || seller?.name || 'Local seller';
        groups[sellerName] = groups[sellerName] || [];
        groups[sellerName].push(item);
        return groups;
      }, {}),
    [cartItems],
  );

  const validate = (formData) => {
    const nextErrors = {};
    const requiredFields = ['buyerName', 'email', 'phone'];

    requiredFields.forEach((field) => {
      if (!formData.get(field)?.trim()) nextErrors[field] = 'Required';
    });

    if (fulfillment === 'Delivery') {
      ['addressLine1', 'city', 'postalCode'].forEach((field) => {
        if (!formData.get(field)?.trim()) nextErrors[field] = 'Required';
      });
    }

    if (paymentMethod === 'card') {
      ['cardName', 'cardNumber', 'expiry', 'cvv'].forEach((field) => {
        if (!formData.get(field)?.trim()) nextErrors[field] = 'Required';
      });
    }

    if (paymentMethod === 'mobile') {
      if (!formData.get('mobileNumber')?.trim()) nextErrors.mobileNumber = 'Required';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextErrors = validate(formData);

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const order = createMockOrder({
      buyer: {
        name: formData.get('buyerName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
      },
      fulfillment,
      paymentMethod: paymentLabels[paymentMethod],
    });

    navigate('/order-success', { state: { orderId: order.id } });
  };

  if (cartItems.length === 0) {
    return (
      <main className="page-shell checkout-page">
        <section className="page-intro">
          <div>
            <span className="eyebrow">Checkout</span>
            <h1>Your cart is ready for products first.</h1>
            <p>Add local products before starting the checkout demo.</p>
          </div>
        </section>
        <EmptyState
          actionLabel="Browse marketplace"
          actionTo="/marketplace"
          title="No checkout items"
          description="Checkout only opens when the cart has products."
        />
      </main>
    );
  }

  return (
    <main className="page-shell checkout-page">
      <section className="page-intro">
        <div>
          <span className="eyebrow">Checkout demo</span>
          <h1>Review your order and choose a demo payment method.</h1>
          <p>No real payment provider is connected. This flow creates a mock local order only.</p>
        </div>
      </section>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <section className="checkout-main">
          <div className="profile-form">
            <h2>Buyer details</h2>
            <div className="form-grid">
              <TextField label="Full name" name="buyerName" placeholder="Nomsa Dlamini" />
              <TextField label="Phone" name="phone" placeholder="+27 72 555 0148" />
            </div>
            <TextField label="Email" name="email" type="email" placeholder="buyer@example.com" />
            <div className="form-error-row">
              {Object.entries(errors).slice(0, 3).map(([field]) => (
                <span key={field}>{field} is required</span>
              ))}
            </div>
          </div>

          <div className="profile-form">
            <h2>Delivery or pickup</h2>
            <div className="choice-grid">
              {['Delivery', 'Pickup'].map((option) => (
                <label className={fulfillment === option ? 'choice-card is-selected' : 'choice-card'} key={option}>
                  <input
                    checked={fulfillment === option}
                    name="fulfillment"
                    onChange={() => setFulfillment(option)}
                    type="radio"
                  />
                  <span>{option}</span>
                  <small>
                    {option === 'Delivery' ? 'Use a demo address and delivery estimate.' : 'Collect from each seller.'}
                  </small>
                </label>
              ))}
            </div>
            {fulfillment === 'Delivery' ? (
              <div className="delivery-fields">
                <TextField label="Address line 1" name="addressLine1" placeholder="18 Market Lane" />
                <div className="form-grid">
                  <TextField label="City" name="city" placeholder="Johannesburg" />
                  <TextField label="Postal code" name="postalCode" placeholder="2196" />
                </div>
                <TextField label="Delivery notes" name="notes" placeholder="Gate code, landmark, or timing note" />
              </div>
            ) : null}
          </div>

          <div className="profile-form">
            <div className="payment-heading">
              <h2>Payment section</h2>
              <span>Demo payment only. No real payment will be processed.</span>
            </div>
            <div className="choice-grid choice-grid--payment">
              {Object.entries(paymentLabels).map(([value, label]) => (
                <label
                  className={paymentMethod === value ? 'choice-card is-selected' : 'choice-card'}
                  key={value}
                >
                  <input
                    checked={paymentMethod === value}
                    name="paymentMethod"
                    onChange={() => setPaymentMethod(value)}
                    type="radio"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            {paymentMethod === 'card' ? (
              <div className="delivery-fields">
                <TextField label="Name on card" name="cardName" placeholder="N Dlamini" />
                <TextField label="Card number placeholder" name="cardNumber" placeholder="4242 4242 4242 4242" />
                <div className="form-grid">
                  <TextField label="Expiry date" name="expiry" placeholder="08/28" />
                  <TextField label="CVV" name="cvv" placeholder="123" />
                </div>
              </div>
            ) : null}
            {paymentMethod === 'mobile' ? (
              <div className="delivery-fields">
                <TextField label="Mobile number" name="mobileNumber" placeholder="+27 72 555 0148" />
                <TextField
                  label="Demo provider"
                  name="mobileProvider"
                  options={['Local Mobile Wallet Demo', 'Community Money Demo', 'TownPay Demo']}
                />
              </div>
            ) : null}
          </div>
        </section>

        <aside className="summary-panel checkout-summary">
          <h2>Order summary</h2>
          {Object.entries(groupedItems).map(([sellerName, items]) => (
            <div className="checkout-seller-group" key={sellerName}>
              <strong>{sellerName}</strong>
              {items.map((item) => (
                <span key={item.productId}>
                  {item.quantity} x {item.product.name}
                </span>
              ))}
            </div>
          ))}
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
              <dt>Delivery estimate</dt>
              <dd>{formatCurrency(deliveryFee)}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>{formatCurrency(total)}</dd>
            </div>
          </dl>
          <Button icon={<PackageCheck size={18} />} type="submit">
            Place order
          </Button>
          <p>
            <CreditCard size={16} /> Demo payment only. No real payment will be processed.
          </p>
        </aside>
      </form>
    </main>
  );
}
