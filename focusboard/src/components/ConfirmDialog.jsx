import Modal from "./Modal";

export default function ConfirmDialog({ task, onConfirm, onCancel }) {
  return (
    <Modal labelId="confirm-title" onClose={onCancel} className="small">
      <h2 id="confirm-title">Delete this task?</h2>
      <p>“{task.title}” will be permanently removed.</p>
      <div className="modal-actions">
        <button className="btn ghost" onClick={onCancel}>Cancel</button>
        <button className="btn danger-fill" onClick={onConfirm}>Delete task</button>
      </div>
    </Modal>
  );
}
