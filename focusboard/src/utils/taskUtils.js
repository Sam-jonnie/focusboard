// Statistics are DERIVED from tasks - never hardcoded or stored.
export function getStats(tasks) {
  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "In progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100); // no divide-by-zero
  return { total, inProgress, completed, percent };
}

// Search + status tab + priority filter are applied together.
export function filterTasks(tasks, query, status, priority) {
  const q = query.trim().toLowerCase(); // case-insensitive, partial match
  return tasks.filter(
    (t) =>
      (q === "" || t.title.toLowerCase().includes(q)) &&
      (status === "All" || t.status === status) &&
      (priority === "All" || t.priority === priority)
  );
}

export function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return isNaN(d) ? iso : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
