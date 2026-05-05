export function MetricCard({ label, tone = 'neutral', value, detail }) {
  return (
    <article className={`metric metric--${tone}`}>
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </article>
  );
}
