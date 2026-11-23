// Mobile-only greeting card (per the 390px Figma frame). Values are derived from the tasks.
export default function GreetingHero({ waiting, percent }) {
  const h = new Date().getHours();
  const greeting = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  return (
    <section className="hero" aria-label="Today">
      <p className="eyebrow">{greeting}</p>
      <h2>Make today count</h2>
      <p className="hero-sub">{waiting} {waiting === 1 ? "task is" : "tasks are"} waiting for your attention.</p>
      <div className="hero-progress">
        <div className="bar" role="progressbar" aria-label="Completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}><span style={{ width: `${percent}%` }} /></div>
        <span>{percent}%</span>
      </div>
    </section>
  );
}
