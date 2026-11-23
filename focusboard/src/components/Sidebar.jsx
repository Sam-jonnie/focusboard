import { LayoutGrid, List, Calendar, CircleDot } from "lucide-react";

// Labels follow Figma. Only "Overview" is functional; the rest are visual placeholders (see README).
const NAV = [
  { label: "Overview", short: "Overview", icon: LayoutGrid },
  { label: "My tasks", short: "Tasks", icon: List },
  { label: "Calendar", short: "Calendar", icon: Calendar },
  { label: "Settings", short: "Settings", icon: CircleDot },
];

export function Logo() {
  return (
    <span className="brand">
      <span className="brand-mark" aria-hidden="true"><LayoutGrid size={20} strokeWidth={2.5} /></span>
      FocusBoard
    </span>
  );
}

function NavList({ bottom }) {
  return (
    <ul>
      {NAV.map(({ label, short, icon: Icon }, i) => (
        <li key={label}>
          <a href="#" className={i === 0 ? "active" : ""} aria-current={i === 0 ? "page" : undefined} onClick={(e) => e.preventDefault()}>
            <Icon size={bottom ? 22 : 20} aria-hidden="true" /> {bottom ? short : label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Sidebar() {
  return (
    <>
      {/* Desktop: left sidebar */}
      <aside className="sidebar">
        <Logo />
        <p className="side-label">Workspace</p>
        <nav aria-label="Main navigation"><NavList /></nav>
      </aside>
      {/* Mobile: bottom navigation */}
      <nav className="bottom-nav" aria-label="Main navigation"><NavList bottom /></nav>
    </>
  );
}
