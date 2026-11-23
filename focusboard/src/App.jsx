import { useMemo, useState } from "react";
import { List, Clock, Check, Plus } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import GreetingHero from "./components/GreetingHero";
import StatCard from "./components/StatCard";
import FocusNotes from "./components/FocusNotes";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import ConfirmDialog from "./components/ConfirmDialog";
import useLocalStorage from "./hooks/useLocalStorage";
import { SAMPLE_TASKS } from "./data/sampleTasks";
import { getStats, filterTasks } from "./utils/taskUtils";

export default function App() {
  // Single source of truth for all task data (persisted)
  const [tasks, setTasks] = useLocalStorage("focusboard_tasks", SAMPLE_TASKS);

  // UI state: filters, open form (null | {} for new | task for edit), pending delete
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [formTask, setFormTask] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  // Derived values - recomputed whenever tasks or filters change
  const stats = useMemo(() => getStats(tasks), [tasks]);
  const visible = useMemo(() => filterTasks(tasks, query, status, priority), [tasks, query, status, priority]);
  const filtersActive = query !== "" || status !== "All" || priority !== "All";
  const waiting = stats.total - stats.completed;

  // Mutations always return NEW arrays (no direct state mutation)
  const saveTask = (data) => {
    setTasks((prev) =>
      data.id ? prev.map((t) => (t.id === data.id ? { ...t, ...data } : t)) : [{ ...data, id: crypto.randomUUID() }, ...prev]
    );
    setFormTask(null);
  };
  const changeStatus = (id, newStatus) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
  const confirmDelete = () => { setTasks((prev) => prev.filter((t) => t.id !== toDelete.id)); setToDelete(null); };
  const resetFilters = () => { setQuery(""); setStatus("All"); setPriority("All"); };

  return (
    <div className="layout">
      <a href="#main" className="skip-link">Skip to content</a>
      <Sidebar />
      <div className="content">
        <Header />
        <main id="main" className="page">
          <section className="intro">
            <div className="grow">
              <h1>Your work,<br className="br-mobile" /> in focus.</h1>
              <p className="sub-desktop">Plan your day, stay organized, and celebrate small wins.</p>
              <p className="sub-mobile">Stay organized and keep moving forward.</p>
            </div>
            <button className="btn primary hide-mobile" onClick={() => setFormTask({})}>New task</button>
          </section>

          <GreetingHero waiting={waiting} percent={stats.percent} />
          <FocusNotes />

          <section className="overview" aria-label="Overview">
            <h2 className="only-mobile">Overview</h2>
            <div className="stats">
              <StatCard title="Total tasks" value={stats.total} caption="Across all projects" icon={List} tone="t-brand" />
              <StatCard title="In progress" value={stats.inProgress} caption="Keep the momentum" icon={Clock} tone="t-blue" className="hide-mobile" />
              <StatCard title="Completed" value={stats.completed} caption="Great work this week" icon={Check} tone="t-green" badge={`${stats.percent}% done`} />
            </div>
          </section>

          <section className="tasks" aria-label="My tasks">
            <div className="tasks-head">
              <div className="grow">
                <h2>My tasks</h2>
                <p className="sub-desktop">Manage and track everything in one place.</p>
                <p className="sub-mobile">Your priorities for this week</p>
              </div>
              <button className="btn tint hide-mobile" onClick={resetFilters}>View all tasks</button>
              <button className="plus only-mobile-flex" onClick={() => setFormTask({})} aria-label="New task"><Plus size={22} aria-hidden="true" /></button>
            </div>
            <FilterTabs tasks={tasks} status={status} onStatus={setStatus} priority={priority} onPriority={setPriority}
              query={query} onQuery={setQuery} onReset={resetFilters} filtersActive={filtersActive} />
            <TaskList tasks={visible} totalCount={tasks.length} onStatus={changeStatus} onEdit={setFormTask} onDelete={setToDelete} onAdd={() => setFormTask({})} />
          </section>
        </main>
      </div>

      {formTask && <TaskForm task={formTask} onSave={saveTask} onClose={() => setFormTask(null)} />}
      {toDelete && <ConfirmDialog task={toDelete} onConfirm={confirmDelete} onCancel={() => setToDelete(null)} />}
    </div>
  );
}
