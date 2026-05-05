import { BusinessBadge } from '../../../components/marketplace/BusinessBadge.jsx';
import { SectionHeader } from '../../../components/ui/SectionHeader.jsx';
import { sellers } from '../../../data/mockData.js';

export function SellersPage() {
  return (
    <main className="page-shell sellers-page">
      <section className="page-intro">
        <div>
          <span className="eyebrow">Local sellers</span>
          <h1>Meet the businesses behind the market.</h1>
          <p>
            Browse seller profiles, operating details, delivery options, and all
            products available from each local shop.
          </p>
        </div>
      </section>

      <section className="section section--flush">
        <SectionHeader
          title="Featured storefronts"
          description="Seller pages are designed to feel like real shop profiles with the context buyers need before ordering."
        />
        <div className="seller-card-grid">
          {sellers.map((seller) => (
            <article className="seller-card" key={seller.id}>
              <div className="seller-card__cover">
                {seller.coverImage ? <img src={seller.coverImage} alt={seller.name} /> : null}
              </div>
              <BusinessBadge business={seller} />
              <p>{seller.bio}</p>
              <dl>
                <div>
                  <dt>Rating</dt>
                  <dd>{seller.rating}</dd>
                </div>
                <div>
                  <dt>Orders</dt>
                  <dd>{seller.completedOrders}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
