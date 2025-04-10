import React from "react";
import { useState } from "react";
import axios from "../../../api/AxiosNoqApi";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const ActivityForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/admin/activities", {
        ...form,
        is_approved: true,
      });
      toast.success("Aktivitet skapad!");
      console.log("Activity created:", res.data);
      if (onCreated) onCreated();
      setForm({ title: "", description: "", start_time: "", end_time: "" });
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="datetime-local"
        name="start_time"
        value={form.start_time}
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="end_time"
        value={form.end_time}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Activity</button>
    </form>
  );
};

ActivityForm.propTypes = {
  onCreated: PropTypes.func,
};

export default ActivityForm;
