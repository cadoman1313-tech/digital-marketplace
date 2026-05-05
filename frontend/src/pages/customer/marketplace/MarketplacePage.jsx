import { Search, SlidersHorizontal } from 'lucide-react';
import { BusinessBadge } from '../../../components/marketplace/BusinessBadge.jsx';
import { ProductCard } from '../../../components/marketplace/ProductCard.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { SectionHeader } from '../../../components/ui/SectionHeader.jsx';
import { businesses, categories, products } from '../../../data/mockData.js';

export function MarketplacePage() {
  const topBusinesses = businesses.slice(0, 3);

  return (
    <main className="page-shell marketplace-page">
      <section className="page-intro page-intro--market">
        <div>
          <span className="eyebrow">Customer marketplace</span>
          <h1>Shop local products from nearby businesses.</h1>
          <p>Browse fresh produce, baked goods, homeware, flowers, and pantry finds from verified sellers.</p>
        </div>
        <form className="search-bar">
          <Search size={19} />
          <input aria-label="Search marketplace" placeholder="Search products, shops, or categories" />
          <Button variant="secondary" icon={<SlidersHorizontal size={18} />}>
            Filters
          </Button>
        </form>
      </section>

      <div className="category-row" aria-label="Product categories">
        {categories.map((category) => (
          <button key={category} className={category === 'All' ? 'is-active' : ''} type="button">
            {category}
          </button>
        ))}
      </div>

      <div className="market-layout">
        <section>
          <SectionHeader title="Fresh on MarketLane" description="Curated demo products with realistic seller details." />
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} businesses={businesses} />
            ))}
          </div>
        </section>

        <aside className="market-aside">
          <h2>Trusted local shops</h2>
          <div className="stack">
            {topBusinesses.map((business) => (
              <BusinessBadge key={business.id} business={business} />
            ))}
          </div>
          <EmptyState
            title="No saved filters yet"
            description="Saved filters will appear here once customers personalize their market view."
          />
        </aside>
      </div>
    </main>
  );
}
