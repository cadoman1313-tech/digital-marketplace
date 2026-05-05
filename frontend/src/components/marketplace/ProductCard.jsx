import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../../state/MarketplaceContext.jsx';
import { formatCurrency, getBusiness } from '../../utils/formatters.js';
import { Button } from '../ui/Button.jsx';
import { StatusPill } from '../ui/StatusPill.jsx';

export function ProductCard({ product, businesses, compact = false }) {
  const business = getBusiness(businesses, product.sellerId || product.businessId);
  const { addToCart } = useMarketplace();
  const availability = product.availabilityStatus || product.availability || 'Available';

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
        <Link className="seller-link" to={`/seller/${business?.id || product.sellerId}`}>
          {business?.name || product.sellerName}
        </Link>
        <div className="product-card__footer">
          <strong>{formatCurrency(product.price)}</strong>
          <StatusPill
            status={
              availability === 'Out of stock'
                ? 'out'
                : product.stock <= 6
                  ? 'low'
                  : 'active'
            }
          />
        </div>
        <p>{product.stock} in stock</p>
        <div className="product-card__actions">
          <Button
            icon={<ShoppingBag size={16} />}
            disabled={availability === 'Out of stock' || product.stock <= 0}
            onClick={() => addToCart(product.id)}
            variant="secondary"
          >
            Add
          </Button>
          <Link className="text-link" to={`/products/${product.id}`}>
            View item
          </Link>
        </div>
      </div>
    </article>
  );
}
