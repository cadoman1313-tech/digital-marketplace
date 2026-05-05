import { ArrowRight, ShoppingBag, Store } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { BusinessBadge } from '../../../components/marketplace/BusinessBadge.jsx';
import { ProductCard } from '../../../components/marketplace/ProductCard.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { StatusPill } from '../../../components/ui/StatusPill.jsx';
import { businesses, products } from '../../../data/mockData.js';
import { formatCurrency, getBusiness, getProduct } from '../../../utils/formatters.js';

export function ProductDetailsPage() {
  const { productId } = useParams();
  const product = getProduct(products, productId) || products[0];
  const business = getBusiness(businesses, product.businessId);
  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  return (
    <main className="page-shell detail-page">
      <Link className="text-link" to="/marketplace">
        Back to marketplace
      </Link>

      <section className="product-detail">
        <div className="product-detail__media">
          <img src={product.image} alt={product.name} />
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
          <div className="button-row">
            <Button to="/cart" icon={<ShoppingBag size={18} />}>
              Add to cart
            </Button>
            <Button variant="secondary" icon={<Store size={18} />}>
              View storefront
            </Button>
          </div>
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
          {(related.length ? related : products.slice(0, 3)).map((item) => (
            <ProductCard key={item.id} product={item} businesses={businesses} compact />
          ))}
        </div>
      </section>
    </main>
  );
}
