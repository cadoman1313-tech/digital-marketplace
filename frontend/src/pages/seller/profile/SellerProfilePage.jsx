import { MapPin, Phone, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ProductCard } from '../../../components/marketplace/ProductCard.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { SectionHeader } from '../../../components/ui/SectionHeader.jsx';
import { sellers } from '../../../data/mockData.js';
import { useMarketplace } from '../../../state/MarketplaceContext.jsx';

export function SellerProfilePage() {
  const { sellerId } = useParams();
  const { marketplaceProducts } = useMarketplace();
  const seller = sellers.find((item) => item.id === sellerId) || sellers[0];
  const sellerProducts = marketplaceProducts.filter((product) => product.sellerId === seller.id);

  return (
    <main className="seller-profile-page">
      <section className="seller-hero">
        {seller.coverImage ? <img src={seller.coverImage} alt={`${seller.name} storefront`} /> : null}
        <div className="seller-hero__shade" />
        <div className="page-shell seller-hero__content">
          <Link className="text-link text-link--light" to="/sellers">
            Back to sellers
          </Link>
          <div className="seller-hero__profile">
            <div className="seller-avatar">
              {seller.avatar ? <img src={seller.avatar} alt={seller.name} /> : seller.name.slice(0, 2)}
            </div>
            <div>
              <span className="eyebrow">{seller.category}</span>
              <h1>{seller.name}</h1>
              <p>{seller.bio}</p>
              <div className="seller-hero__meta">
                <span><Star size={16} /> {seller.rating} rating</span>
                <span><MapPin size={16} /> {seller.location}</span>
                <span><Phone size={16} /> {seller.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell seller-profile-body">
        <aside className="seller-info-panel">
          <h2>Shop details</h2>
          <dl>
            <div>
              <dt>Owner</dt>
              <dd>{seller.ownerName}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{seller.email}</dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>{seller.hours}</dd>
            </div>
            <div>
              <dt>Joined</dt>
              <dd>{seller.joinedDate}</dd>
            </div>
            <div>
              <dt>Completed orders</dt>
              <dd>{seller.completedOrders}</dd>
            </div>
            <div>
              <dt>Delivery or pickup</dt>
              <dd>{seller.fulfillmentOptions.join(', ')}</dd>
            </div>
          </dl>
          <Button to="/marketplace" variant="secondary">
            Browse full market
          </Button>
        </aside>

        <section>
          <SectionHeader
            eyebrow="Storefront products"
            title={`All products from ${seller.name}`}
            description={`${sellerProducts.length} products currently listed by this seller.`}
          />
          {sellerProducts.length ? (
            <div className="product-grid product-grid--three">
              {sellerProducts.map((product) => (
                <ProductCard key={product.id} product={product} businesses={sellers} compact />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No products listed"
              description="This seller profile is ready, and products will appear here once listed."
            />
          )}
        </section>
      </section>
    </main>
  );
}
