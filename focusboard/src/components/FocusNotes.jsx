import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { FOCUS_SLIDES } from "../data/sampleTasks";

export default function FocusNotes() {
  const [index, setIndex] = useState(0); // single source of truth for the active slide
  const total = FOCUS_SLIDES.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total); // circular navigation
  const next = () => setIndex((i) => (i + 1) % total);
  const { title, body, card } = FOCUS_SLIDES[index];
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className="focus" aria-roledescription="carousel" aria-label="Focus Notes">
      <div className="focus-text">
        <p className="eyebrow">Focus Notes <span>{pad(index + 1)} / {pad(total)}</span></p>
        <div aria-live="polite">
          <h2>{title}</h2>
          <p className="focus-body">{body}</p>
        </div>
        {/* Indicators: active one is long and solid */}
        <div className="dashes" role="group" aria-label="Choose slide">
          {FOCUS_SLIDES.map((s, i) => (
            <button key={s.title} className={`dash ${i === index ? "active" : ""}`} onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}: ${s.title}`} aria-current={i === index ? "true" : undefined} />
          ))}
        </div>
      </div>

      {/* Illustration: a task card stacked on a ghost card (hidden on small screens) */}
      <div className="focus-art" aria-hidden="true">
        <div className="ghost-card" />
        <div className="mini-card">
          <span className="mini-check"><Check size={18} /></span>
          <div className="mini-info">
            <p className="mini-label">{card.label}</p>
            <p className="mini-title">{card.title}</p>
          </div>
          <div className="mini-prog"><div className="mini-bar"><span style={{ width: `${card.percent}%` }} /></div><span className="mini-pct">{card.percent}%</span></div>
        </div>
      </div>

      <div className="focus-controls">
        <button className="round ghosty" onClick={prev} aria-label="Previous slide"><ChevronLeft size={18} aria-hidden="true" /></button>
        <button className="round solid" onClick={next} aria-label="Next slide"><ChevronRight size={18} aria-hidden="true" /></button>
      </div>
    </section>
  );
}
