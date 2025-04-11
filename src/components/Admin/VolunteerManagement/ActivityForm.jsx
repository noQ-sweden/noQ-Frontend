import React from "react";
import { useState, useEffect } from "react";
import axios from "../../../api/AxiosNoqApi";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const ActivityForm = ({ onCreated, activityToEdit, onUpdated }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    if (activityToEdit) {
      const formatDate = (isoString) => {
        const dt = new Date(isoString);
        return dt.toISOString().slice(0, 16);
      };
      setForm({
        title: activityToEdit.title,
        description: activityToEdit.description,
        start_time: formatDate(activityToEdit.start_time),
        end_time: formatDate(activityToEdit.end_time),
      });
    }
  }, [activityToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activityToEdit?.id) {
        // Edit Mode
        await axios.patch(`/api/admin/activities/${activityToEdit.id}`, form);
        toast.success("Aktivitet uppdaterad!");
        onUpdated?.(); //Refresh
      } else {
        // Create Mode
        await axios.post("/api/admin/activities/", {
          ...form,
          is_approved: true,
        });
        toast.success("Aktivitet skapad!");
        onCreated?.();
      }
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
      <button
        type="submit"
        className="bg-[#1C4915]  text-white font-bold py-2 px-4 rounded"
      >
        <strong>Skapa aktivitet</strong>
      </button>
    </form>
  );
};

ActivityForm.propTypes = {
  onCreated: PropTypes.func,
  onUpdated: PropTypes.func,
  activityToEdit: PropTypes.object,
};

export default ActivityForm;
