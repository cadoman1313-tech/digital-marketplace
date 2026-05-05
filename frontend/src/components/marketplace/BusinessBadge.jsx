export function BusinessBadge({ business }) {
  return (
    <div className="business-badge">
      <img src={business.image} alt={business.name} />
      <div>
        <strong>{business.name}</strong>
        <span>
          {business.category} / {business.city} / {business.distance}
        </span>
      </div>
    </div>
  );
}
