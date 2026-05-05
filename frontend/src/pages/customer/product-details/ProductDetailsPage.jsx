import { ArrowRight, ShoppingBag, Store } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BusinessBadge } from '../../../components/marketplace/BusinessBadge.jsx';
import { ProductCard } from '../../../components/marketplace/ProductCard.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { StatusPill } from '../../../components/ui/StatusPill.jsx';
import { businesses } from '../../../data/mockData.js';
import { useMarketplace } from '../../../state/MarketplaceContext.jsx';
import { formatCurrency, getBusiness, getProduct } from '../../../utils/formatters.js';

export function ProductDetailsPage() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState('');
  const { addToCart, marketplaceProducts } = useMarketplace();
  const product = getProduct(marketplaceProducts, productId) || marketplaceProducts[0];
  const business = getBusiness(businesses, product.businessId);
  const related = marketplaceProducts
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  return (
    <main className="page-shell detail-page">
      <Link className="text-link" to="/marketplace">
        Back to marketplace
      </Link>

      <section className="product-detail">
        <div className="product-detail__media">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="image-placeholder">Product image placeholder</div>
          )}
        </div>
        <div className="product-detail__content">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="product-detail__price-row">
            <strong>{formatCurrency(product.price)}</strong>
            {product.stock <= 6 ? <StatusPill status="low" /> : <span>{product.stock} available</span>}
          </div>
          <div className="tag-row">
            {product.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="quantity-picker" aria-label="Quantity">
            <button
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              type="button"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))}
              type="button"
            >
              +
            </button>
          </div>
          <div className="button-row">
            <Button
              icon={<ShoppingBag size={18} />}
              onClick={() => {
                addToCart(product.id, quantity);
                setAddedMessage(`${quantity} item${quantity > 1 ? 's' : ''} added to cart.`);
              }}
            >
              Add to cart
            </Button>
            <Button to="/cart" variant="ghost">
              View cart
            </Button>
            <Button variant="secondary" icon={<Store size={18} />}>
              View storefront
            </Button>
          </div>
          {addedMessage ? <p className="cart-feedback">{addedMessage}</p> : null}
          <div className="seller-panel">
            <BusinessBadge business={business} />
            <p>{business.description}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="eyebrow">More to consider</span>
            <h2>Related local finds</h2>
          </div>
          <Button to="/marketplace" variant="ghost" icon={<ArrowRight size={18} />}>
            Continue browsing
          </Button>
        </div>
        <div className="product-grid product-grid--three">
          {(related.length ? related : marketplaceProducts.slice(0, 3)).map((item) => (
            <ProductCard key={item.id} product={item} businesses={businesses} compact />
          ))}
        </div>
      </section>
    </main>
  );
}
