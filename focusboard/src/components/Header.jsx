import { ChevronDown } from "lucide-react";
import { Logo } from "./Sidebar";

// Desktop: breadcrumb + profile bar. Mobile: logo + profile bar.
export default function Header() {
  return (
    <header className="topbar">
      <div className="only-mobile-flex"><Logo /></div>
      <nav className="crumbs" aria-label="Breadcrumb"><span>Workspace</span><span aria-hidden="true">/</span><strong aria-current="page">Overview</strong></nav>
      <div className="profile-chip">
        <span className="avatar" role="img" aria-label="Profile: JD">JD</span>
        <ChevronDown className="chev" size={16} aria-hidden="true" />
      </div>
    </header>
  );
}
