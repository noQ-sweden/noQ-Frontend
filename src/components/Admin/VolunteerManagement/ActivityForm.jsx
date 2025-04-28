import React from "react";
import { useState, useEffect } from "react";
import axiosNoqApi from "../../../api/AxiosNoqApi";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const ActivityForm = ({ onCreated, activityToEdit, onUpdated, onClose }) => {
  const [form, setForm] = useState({
    title: activityToEdit?.title || "",
    description: activityToEdit?.description || "",
    start_time: activityToEdit?.start_time || "",
    end_time: activityToEdit?.end_time || "",
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
        await axiosNoqApi.patch(
          `/api/admin/activities/${activityToEdit.id}`,
          form
        );
        toast.success("Aktivitet uppdaterad!");
        onUpdated?.(); //Refresh
      } else {
        // Create Mode
        await axiosNoqApi.post("/api/admin/activities/", {
          ...form,
          is_approved: true,
        });
        toast.success("Aktivitet skapad!");
        onCreated?.(); //Refresh
      }
      onClose();
      setForm({ title: "", description: "", start_time: "", end_time: "" });
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="w-full border border-gray-300 rounded px-3 py-2"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        className="w-full border border-gray-300 rounded px-3 py-2"
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
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-[#1C4915]  text-white font-bold py-2 px-4 rounded"
        >
          <strong>Skapa aktivitet</strong>
        </button>
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:underline"
        >
          Avbryta
        </button>
      </div>
    </form>
  );
};

ActivityForm.propTypes = {
  onCreated: PropTypes.func,
  onUpdated: PropTypes.func,
  activityToEdit: PropTypes.object,
  onClose: PropTypes.func,
};

export default ActivityForm;
