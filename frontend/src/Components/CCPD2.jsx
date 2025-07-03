import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CCPD2 = ({ selectedBatch, data, setData }) => {
  const allDepartments = ["CSE", "CSE-AIML", "IT", "DS", "CE", "ELCE"];
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const handleSelect = (e) => {
    const value = e.target.value;
    if (value === "All") {
      setSelectedDepartments([...allDepartments]);
    } else {
      setSelectedDepartments(prev =>
        prev.includes(value)
          ? prev.filter(item => item !== value)
          : [...prev, value]
      );
    }
  };

  const removeDept = (dept) => {
    setSelectedDepartments(prev => prev.filter(d => d !== dept));
  };

  const callApiForData = async () => {
    try {
      const res = await axios.post("http://localhost:7890/dashboard/batch-and-branch", {
        selectedBatch,
        selectedDepartments,
      });
      setData(res.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      alert("Failed to fetch. Please try again.");
    }
  };

  useEffect(() => {
    if (selectedDepartments.length === 0) {
      setData([]);
      return;
    }
    if (selectedBatch) {
      callApiForData();
    }
  }, [selectedDepartments, selectedBatch]);

  return (
    <div className="filter-section">
      <label htmlFor="departmentSelect">Select Department:</label>
      <select
        id="departmentSelect"
        onChange={handleSelect}
        value=""
      >
        <option value="" disabled>-- Choose --</option>
        <option value="All">Select All</option>
        {allDepartments.map((dept, index) => (
          <option key={index} value={dept}>
            {dept}
          </option>
        ))}
      </select>
      <div className="selected-chips">
        {selectedDepartments.length === 0 ? (
          <p className="text-muted">No departments selected</p>
        ) : (
          selectedDepartments.map((dept, index) => (
            <span className="chip" key={index}>
              {dept}
              <button className="remove-chip" onClick={() => removeDept(dept)}>×</button>
            </span>
          ))
        )}
      </div>
    </div>
  );
};

export default CCPD2;
