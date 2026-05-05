import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../../state/MarketplaceContext.jsx';
import { formatCurrency, getBusiness } from '../../utils/formatters.js';
import { Button } from '../ui/Button.jsx';
import { StatusPill } from '../ui/StatusPill.jsx';

export function ProductCard({ product, businesses, compact = false }) {
  const business = getBusiness(businesses, product.businessId);
  const { addToCart } = useMarketplace();

  return (
    <article className={`product-card ${compact ? 'product-card--compact' : ''}`}>
      <Link to={`/products/${product.id}`} className="product-card__image-link">
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <span className="product-card__placeholder">Product image</span>
        )}
      </Link>
      <div className="product-card__body">
        <div className="product-card__meta">
          <span>{product.category}</span>
          <span className="rating">Rating {product.rating}</span>
        </div>
        <h3>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p>{business?.name}</p>
        <div className="product-card__footer">
          <strong>{formatCurrency(product.price)}</strong>
          {product.stock <= 6 ? <StatusPill status="low" /> : null}
        </div>
        <div className="product-card__actions">
          <Button
            icon={<ShoppingBag size={16} />}
            onClick={() => addToCart(product.id)}
            variant="secondary"
          >
            Add
          </Button>
          <Link className="text-link" to={`/products/${product.id}`}>
            View item <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
