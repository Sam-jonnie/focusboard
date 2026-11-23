import TaskCard from "./TaskCard";

export default function TaskList({ tasks, totalCount, onStatus, onEdit, onDelete, onAdd }) {
  // Empty states tell the user what to do next
  if (tasks.length === 0) {
    return (
      <div className="empty">
        <h3>{totalCount === 0 ? "No tasks yet" : "No tasks match your filters"}</h3>
        <p className="muted">{totalCount === 0 ? "Add your first task to get started." : "Try a different keyword or reset the filters."}</p>
        {totalCount === 0 && <button className="btn primary" onClick={onAdd}>Add task</button>}
      </div>
    );
  }
  return (
    <ul className="task-list" aria-label="Tasks">
      {tasks.map((t) => <TaskCard key={t.id} task={t} onStatus={onStatus} onEdit={onEdit} onDelete={onDelete} />)}
    </ul>
  );
}
