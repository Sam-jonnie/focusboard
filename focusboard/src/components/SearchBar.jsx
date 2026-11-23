import { Search } from "lucide-react";
import useMediaQuery from "../hooks/useMediaQuery";

export default function SearchBar({ value, onChange }) {
  const mobile = useMediaQuery("(max-width: 768px)"); // Figma uses different placeholder text on mobile
  return (
    <div className="search">
      <Search size={16} aria-hidden="true" />
      <label htmlFor="search" className="sr-only">Search tasks by title</label>
      <input id="search" type="search" placeholder={mobile ? "Search tasks..." : "Find a task..."} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
