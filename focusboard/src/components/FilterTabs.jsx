import { STATUSES, PRIORITIES } from "../data/sampleTasks";
import SearchBar from "./SearchBar";

// One bar: status tabs, search and priority filter. All values are owned by App.
export default function FilterTabs({ tasks, status, onStatus, priority, onPriority, query, onQuery, onReset, filtersActive }) {
  return (
    <div className="filterbar">
      <div className="tabs" role="group" aria-label="Filter by status">
        {["All", ...STATUSES].map((s) => (
          <button key={s} className={`tab ${status === s ? "active" : ""}`} aria-pressed={status === s} onClick={() => onStatus(s)}>
            {s === "All" ? <>All<span className="hide-mobile"> tasks</span> {tasks.length}</> : s}
          </button>
        ))}
      </div>
      <SearchBar value={query} onChange={onQuery} />
      <div className="prio">
        <label htmlFor="priority-filter" className="sr-only">Filter by priority</label>
        <select id="priority-filter" value={priority} onChange={(e) => onPriority(e.target.value)}>
          <option value="All">Priority: All</option>
          {PRIORITIES.map((p) => <option key={p} value={p}>Priority: {p}</option>)}
        </select>
        {filtersActive && <button className="btn ghost small-btn" onClick={onReset}>Reset</button>}
      </div>
    </div>
  );
}
