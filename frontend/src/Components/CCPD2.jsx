import React, { useState, useEffect } from 'react';

const CCPD2 = () => {
  const allDepartments = ["CSE", "CSE_AIML", "IT", "DS", "CE", "ELCE"];
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const handleSelect = (e) => {
    const value = e.target.value;

    if (value === "All") {
      // Always select all departments when "All" is selected
      setSelectedDepartments([...allDepartments]);
    } else {
      if (selectedDepartments.length === allDepartments.length) {
        // Reset to just this department if all were previously selected
        setSelectedDepartments([value]);
      } else {
        // Toggle department on or off
        setSelectedDepartments(prev =>
          prev.includes(value)
            ? prev.filter(item => item !== value)
            : [...prev, value]
        );
      }
    }
  };

  const removeDept = (dept) => {
    setSelectedDepartments(prev => prev.filter(d => d !== dept));
  };

  useEffect(() => {
    console.log("Selected Departments:", selectedDepartments);
  }, [selectedDepartments]);

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow space-y-4">
      <h2 className="text-lg font-bold">Select Department (Gmail-style):</h2>

      {/* Display selected departments as chips */}
      <div className="flex flex-wrap gap-2">
        {selectedDepartments.length === 0 && (
          <p className="text-gray-500">No departments selected</p>
        )}
        {selectedDepartments.map((dept, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
          >
            + {dept}
            <button
              className="ml-2 text-red-600 font-bold"
              onClick={() => removeDept(dept)}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Select dropdown */}
      <select
        id="departmentSelect"
        onChange={handleSelect}
        className="w-full border px-3 py-2 rounded"
        defaultValue=""
      >
        <option value="" disabled>-- Select Department --</option>
        <option value="All">Select All</option>
        {allDepartments.map((dept, index) => (
          <option key={index} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CCPD2;
