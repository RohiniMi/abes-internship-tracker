import React, { useState, useEffect } from 'react';

const CCPD = () => {
  const allDepartments = ["CSE", "CSE_AIML", "IT", "DS", "CE", "ELCE"];
  const options = [...allDepartments, "select All"];
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const handleSelect = (dept) => {
    if (dept === "select All") {
      if (selectedDepartments.length === allDepartments.length) {
        setSelectedDepartments([]);
      } else {
        setSelectedDepartments([...allDepartments]);
      }
    } else {
      setSelectedDepartments(prev =>
        prev.includes(dept)
          ? prev.filter(item => item !== dept)
          : [...prev, dept]
      );
    }
  };

  useEffect(() => {
    console.log("Selected Departments:", selectedDepartments);
  }, [selectedDepartments]);

  const isAllSelected = selectedDepartments.length === allDepartments.length;

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-2">Select Departments:</h2>
      {options.map((dept, index) => (
        <div key={index} className="flex items-center mb-1">
          <input
            type="checkbox"
            checked={
              dept === "select All" ? isAllSelected : selectedDepartments.includes(dept)
            }
            onChange={() => handleSelect(dept)}
            className="mr-2"
          />
          <label>{dept}</label>
        </div>
      ))}
    </div>
  );
};

export default CCPD;
