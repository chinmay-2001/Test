import React, { useState } from "react";
import "../Styles/style.css";

const AddMemberModal = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    marks: "",
    parentId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Add New Member</h4>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Enter Member Name"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Enter Member Email"
            onChange={handleChange}
            required
          />
          <input
            name="marks"
            type="number"
            placeholder="Enter Marks"
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
        <button onClick={onClose} className="close-btn">
          ×
        </button>
      </div>
    </div>
  );
};

export default AddMemberModal;
