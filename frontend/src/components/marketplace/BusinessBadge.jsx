import { Link } from 'react-router-dom';

export function BusinessBadge({ business }) {
  return (
    <Link className="business-badge" to={`/seller/${business.id}`}>
      {business.avatar || business.coverImage ? (
        <img src={business.avatar || business.coverImage} alt={business.name} />
      ) : (
        <span className="business-badge__avatar">{business.name.slice(0, 2)}</span>
      )}
      <div>
        <strong>{business.name}</strong>
        <span>
          {business.category} / {business.location}
        </span>
      </div>
    </Link>
  );
}
