import "./index.css";

function MyModal({ children, onClose }) {
  return (
    <>
      <div className="modal-wrapper" onClick={onClose}></div>
      <div className="modal-container">{children}</div>
    </>
  );
}

export default MyModal;
