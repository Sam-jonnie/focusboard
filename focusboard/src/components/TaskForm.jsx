import { useState } from "react";
import { X, Calendar } from "lucide-react";
import Modal from "./Modal";
import { STATUSES, PRIORITIES } from "../data/sampleTasks";

const EMPTY = { title: "", description: "", category: "General", status: "To do", priority: "Medium", dueDate: "" };

// One form for BOTH create and edit: if `task` has an id we are editing.
export default function TaskForm({ task, onSave, onClose }) {
  const editing = Boolean(task?.id);
  const [values, setValues] = useState({ ...EMPTY, ...task });
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  function validate() {
    const e = {};
    if (!values.title.trim()) e.title = "Enter a title for the task."; // rejects spaces-only
    if (!values.dueDate) e.dueDate = "Choose a due date.";
    if (!STATUSES.includes(values.status)) e.status = "Choose a status.";
    if (!PRIORITIES.includes(values.priority)) e.priority = "Choose a priority.";
    return e;
  }

  function submit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    onSave({ ...values, title: values.title.trim(), description: values.description.trim() });
  }

  const err = (f) => errors[f] && <p className="error" id={`${f}-error`} role="alert">{errors[f]}</p>;
  const aria = (f) => ({ "aria-invalid": errors[f] ? "true" : undefined, "aria-describedby": errors[f] ? `${f}-error` : undefined });

  return (
    <Modal labelId="form-title" onClose={onClose}>
      <form onSubmit={submit} noValidate>
        <div className="modal-head">
          <div><h2 id="form-title">{editing ? "Edit task" : "Create new task"}</h2><p className="muted">Add your task details to stay on top of your work.</p></div>
          <button type="button" className="close" onClick={onClose} aria-label="Close form"><X size={16} aria-hidden="true" /></button>
        </div>

        <label htmlFor="f-title">Task title <span className="req" aria-hidden="true">*</span></label>
        <input id="f-title" value={values.title} onChange={set("title")} placeholder="e.g. Update pricing page" required {...aria("title")} />
        {err("title")}

        <label htmlFor="f-desc">Description</label>
        <textarea id="f-desc" rows={3} value={values.description} onChange={set("description")} placeholder="Add notes about this task..." />

        <div className="grid-2">
          <div>
            <label htmlFor="f-status">Status</label>
            <select id="f-status" value={values.status} onChange={set("status")} {...aria("status")}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
            {err("status")}
          </div>
          <div>
            <label htmlFor="f-priority">Priority</label>
            <select id="f-priority" value={values.priority} onChange={set("priority")} {...aria("priority")}>{PRIORITIES.map((p) => <option key={p}>{p}</option>)}</select>
            {err("priority")}
          </div>
        </div>

        <div className="date-field">
            <label htmlFor="f-due">Due date <span className="req" aria-hidden="true">*</span></label>
            <div className="date-input">
              <span className="date-icon"><Calendar size={18} aria-hidden="true" /></span>
              <input id="f-due" type="date" value={values.dueDate} onChange={set("dueDate")} {...aria("dueDate")} />
            </div>
            {err("dueDate")}
          </div>

        <p className="muted req-note"><span className="req">*</span> Required field</p>
        <div className="modal-actions">
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary">{editing ? "Save changes" : "Create task"}</button>
        </div>
      </form>
    </Modal>
  );
}
