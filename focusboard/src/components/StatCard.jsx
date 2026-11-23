// Reusable card: title, value, caption and icon come in as props.
export default function StatCard({ title, value, caption, icon: Icon, tone, badge, className = "" }) {
  return (
    <article className={`card stat ${tone} ${className}`}>
      <span className="stat-icon" aria-hidden="true"><Icon size={20} /></span>
      <p className="stat-label">{title}</p>
      <p className="stat-value">{value}</p>
      <p className="stat-caption">{caption}</p>
      {badge && <span className="stat-badge">{badge}</span>}
    </article>
  );
}
