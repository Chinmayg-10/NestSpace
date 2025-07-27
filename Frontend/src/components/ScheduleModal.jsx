import Modal from "react-modal";
import ScheduleForm from "./ScheduleForm";
import api from "../services/Api";
import "../App.css";

// Accessibility for screen readers
Modal.setAppElement("#root");

const ScheduleModal = ({ property, isOpen, onClose }) => {
  const handleSubmit = async (viewingData) => {
    try {
      if (!property?._id) {
        alert("Invalid property details!");
        return;
      }

      const result = await api.scheduleViewing(viewingData);

      if (result.success) {
        alert("✅ Viewing scheduled successfully!");
        onClose();
      } else {
        alert("⚠️ Error: " + result.message);
      }
    } catch (err) {
      console.error("Error scheduling viewing:", err);
      alert("❌ Something went wrong! Please try again.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      {/* Modal Header */}
      <div className="modal-header">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>

      {/* Schedule Form */}
      <ScheduleForm
        property={property}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default ScheduleModal;

