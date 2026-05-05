import { Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { BusinessBadge } from '../../../components/marketplace/BusinessBadge.jsx';
import { ProductCard } from '../../../components/marketplace/ProductCard.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { SectionHeader } from '../../../components/ui/SectionHeader.jsx';
import { businesses, categories } from '../../../data/mockData.js';
import { useMarketplace } from '../../../state/MarketplaceContext.jsx';

export function MarketplacePage() {
  const { marketplaceProducts } = useMarketplace();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const topBusinesses = businesses.slice(0, 6);

  const visibleProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return marketplaceProducts
      .filter((product) => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const seller = businesses.find((business) => business.id === product.sellerId);
        const searchable = `${product.name} ${product.category} ${seller?.name || product.sellerName}`.toLowerCase();

        return matchesCategory && (!normalizedSearch || searchable.includes(normalizedSearch));
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rated') return b.rating - a.rating;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [activeCategory, marketplaceProducts, searchTerm, sortBy]);

  return (
    <main className="page-shell marketplace-page">
      <section className="page-intro page-intro--market">
        <div>
          <span className="eyebrow">Customer marketplace</span>
          <h1>Shop local products from nearby businesses.</h1>
          <p>Browse fresh produce, baked goods, homeware, flowers, and pantry finds from verified sellers.</p>
        </div>
        <form className="search-bar" onSubmit={(event) => event.preventDefault()}>
          <Search size={19} />
          <input
            aria-label="Search marketplace"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products, sellers, or categories"
            value={searchTerm}
          />
          <select aria-label="Sort products" onChange={(event) => setSortBy(event.target.value)} value={sortBy}>
            <option value="newest">Newest</option>
            <option value="price-low">Price low to high</option>
            <option value="price-high">Price high to low</option>
            <option value="rated">Highest rated</option>
          </select>
        </form>
      </section>

      <div className="category-row" aria-label="Product categories">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? 'is-active' : ''}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="market-layout">
        <section>
          <SectionHeader
            title="Fresh on MarketLane"
            description={`${visibleProducts.length} products from local sellers, filtered by category, search, and sort.`}
            action={
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                  setSortBy('newest');
                }}
                variant="ghost"
                icon={<SlidersHorizontal size={18} />}
              >
                Reset
              </Button>
            }
          />
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} businesses={businesses} />
            ))}
          </div>
          {visibleProducts.length === 0 ? (
            <EmptyState
              title="No products found"
              description="Try a different search, category, or sort setting to keep browsing."
            />
          ) : null}
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
