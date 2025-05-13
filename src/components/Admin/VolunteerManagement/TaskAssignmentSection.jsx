import React from "react";
import PropTypes from "prop-types";

export default function TaskAssignmentSection({ tasks, onStatusChange }) {
  if (!tasks) return null;
  return (
    <div className="mt-6">
      {tasks.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl p-4 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">📋</span>
            <div>
              <p className="font-semibold text-xl">Uppgiftstilldelning</p>
              <p className="text-sm text-gray-600">
                Inga uppgifter tilldelade ännu.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">📋</span>
            <h2 className="font-semibold text-xl">Uppgiftstilldelning</h2>
          </div>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                <p className="font-semibold text-sm">
                  {task.volunteer} -{task.activity_title}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Status: {task.status}
                </p>
                <label className="text-sm">
                  Ändra Status:
                  <select
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value)}
                    className="ml-2 border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="pending">Väntande</option>
                    <option value="accepted">Accepterad</option>
                    <option value="declined">Avslutad</option>
                  </select>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

TaskAssignmentSection.propTypes = {
  tasks: PropTypes.array.isRequired /* 
  handleStatusChanges: PropTypes.func.isRequired, */,
  onStatusChange: PropTypes.func.isRequired,
};
