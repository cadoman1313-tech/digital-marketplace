import { ArrowRight, ShieldCheck, ShoppingBag, Store } from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { ProductCard } from '../../components/marketplace/ProductCard.jsx';
import { SectionHeader } from '../../components/ui/SectionHeader.jsx';
import { businesses } from '../../data/mockData.js';
import { useMarketplace } from '../../state/MarketplaceContext.jsx';

export function LandingPage() {
  const { marketplaceProducts } = useMarketplace();
  const featuredProducts = marketplaceProducts.filter((product) => product.featured).slice(0, 3);

  return (
    <main>
      <section className="landing-hero">
        <div className="landing-hero__overlay" />
        <div className="page-shell landing-hero__content">
          <span className="eyebrow">Botswana local commerce, made easier</span>
          <h1>LocalMart</h1>
          <p>
            A warm digital marketplace where Botswana businesses can sell beautifully
            and customers can shop from trusted local sellers with confidence.
          </p>
          <div className="landing-hero__actions">
            <Button to="/marketplace" icon={<ShoppingBag size={18} />}>
              Browse market
            </Button>
            <Button to="/seller/register" variant="secondary" icon={<Store size={18} />}>
              Open a storefront
            </Button>
          </div>
          <div className="landing-hero__facts" aria-label="Marketplace highlights">
            <span>38 Botswana sellers</span>
            <span>Gaborone to Maun pickup</span>
            <span>Made in Botswana finds</span>
          </div>
        </div>
      </section>

      <section className="page-shell section">
        <SectionHeader
          eyebrow="Featured nearby"
          title="Fresh finds from trusted Botswana shops"
          description="A first glimpse at the marketplace experience customers will use to discover real products from Gaborone, Maun, Kasane, Palapye, and beyond."
          action={
            <Button to="/marketplace" variant="ghost" icon={<ArrowRight size={18} />}>
              View all
            </Button>
          }
        />
        <div className="product-grid product-grid--three">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} businesses={businesses} />
          ))}
        </div>
      </section>

      <section className="soft-band">
        <div className="page-shell value-grid">
          <article>
            <ShieldCheck size={22} />
            <h3>Buyer confidence</h3>
            <p>Verified storefronts, clear order statuses, and Botswana seller context on every purchase.</p>
          </article>
          <article>
            <Store size={22} />
            <h3>Business-ready tools</h3>
            <p>Calm order, profile, and product management without the noise of a generic dashboard.</p>
          </article>
          <article>
            <ShoppingBag size={22} />
            <h3>Built for browsing</h3>
            <p>Image-led products, simple filters, and warm visual details for a real Botswana marketplace.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
