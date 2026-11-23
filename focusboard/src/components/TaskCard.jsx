import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Check, Clock, Calendar, Pencil, Trash2 } from "lucide-react";
import { STATUSES } from "../data/sampleTasks";
import { formatDate } from "../utils/taskUtils";

const slug = (s) => s.toLowerCase().replace(/\s+/g, "-");

export default function TaskCard({ task, onStatus, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  const trigger = useRef(null);
  const done = task.status === "Completed";

  // Close the menu on outside click or Escape (focus returns to the trigger)
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => wrap.current && !wrap.current.contains(e.target) && setOpen(false);
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); trigger.current?.focus(); } };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const pick = (fn) => () => { setOpen(false); fn(); };

  return (
    <li className={`task ${done ? "done" : ""}`}>
      {/* Leading tile shows the status; clicking toggles Completed / To do */}
      <button className={`tile s-${slug(task.status)}`} onClick={() => onStatus(task.id, done ? "To do" : "Completed")}
        aria-label={done ? `Mark ${task.title} as to do` : `Mark ${task.title} as completed`}>
        {done ? <Check size={18} aria-hidden="true" /> : task.status === "In progress" ? <Clock size={16} aria-hidden="true" /> : <span className="box" aria-hidden="true" />}
      </button>

      <div className="task-main">
        <h3>{task.title}</h3>
        {task.description && <p className="sub">{task.description}</p>}
        <span className="sr-only">Status: {task.status}</span>
      </div>

      <div className="meta">
        <span className="pill chip">{task.category}</span>
        {/* Text label + colour, so priority never relies on colour alone */}
        <span className={`pill p-${slug(task.priority)}`}>{task.priority}</span>
        <span className="due"><Calendar size={15} aria-hidden="true" /> {formatDate(task.dueDate)}</span>
      </div>

      <div className="menu-wrap" ref={wrap}>
        <button ref={trigger} className="kebab" aria-label={`Actions for ${task.title}`} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <MoreHorizontal size={20} aria-hidden="true" />
        </button>
        {open && (
          <ul className="menu" role="menu" aria-label={`Actions for ${task.title}`}>
            {STATUSES.map((s) => (
              <li key={s} role="none">
                <button role="menuitemradio" aria-checked={task.status === s} onClick={pick(() => onStatus(task.id, s))}>
                  <span className="tick">{task.status === s && <Check size={14} aria-hidden="true" />}</span> {s}
                </button>
              </li>
            ))}
            <li role="separator" className="sep" />
            <li role="none"><button role="menuitem" onClick={pick(() => onEdit(task))}><Pencil size={14} aria-hidden="true" /> Edit task</button></li>
            <li role="none"><button role="menuitem" className="danger" onClick={pick(() => onDelete(task))}><Trash2 size={14} aria-hidden="true" /> Delete task</button></li>
          </ul>
        )}
      </div>
    </li>
  );
}
