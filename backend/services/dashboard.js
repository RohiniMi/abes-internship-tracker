import Student from "../models/student.js";
const callDate = (internship) => {
  let completed = 0;
  let notCompletedYet = 0;
  if (internship.length > 0) {
    internship.filter((d) => {
      new Date(d.doc).setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0) ? completed++ : notCompletedYet++;
    })
  }
  return { completed, notCompletedYet };
}
const findPaidUnpaid = (internships) => {
  let status = 500;
  let data = [];
  if (internships.length > 0) {
    status = 200;
    const paid = internships.filter(intern => intern.type === "paid");
    const completedOrNotForPaid = callDate(paid);
    const unpaid = internships.filter(intern => intern.type === "unpaid");
    const completedOrNotForUnpaid = callDate(unpaid);
    data.push(
      {
        "total": internships.length,
        "paid": paid.length,
        "unpaid": unpaid.length,
        "paidCompleted": completedOrNotForPaid.completed,
        "paidUncompleted": completedOrNotForPaid.notCompletedYet,
        "unpaidCompleted": completedOrNotForUnpaid.completed,
        "unpaidUncompleted": completedOrNotForUnpaid.notCompletedYet
      })
  }
  return { status, data };
}

export const findBatchwiseAllData = async (batch) => {
  let status = 500;
  let data = [];
  const internships = await Student.Student.find();
  if (internships.length > 0) {
    if (batch === "All") {
      const res = findPaidUnpaid(internships);
      status = res.status;
      data = res.data;
    } else {
      const batchData = internships.filter(intern => intern.year === batch);
      const res = findPaidUnpaid(batchData);
      status = res.status;
      data = res.data;
    }
  }
  return { status, "data": data, "batch": batch };
}
export const findAllDataForXlsv = async (batch) => {
  let status = 500;
  let data = [];
  try {
    const internships = await Student.Student.find();
    if (internships.length > 0) {
      status = 200;
      (batch === "All") ? data = internships : data = (internships.filter(intern => intern.year === batch));
    }
    return { status, data }
  }
  catch (err) {
    console.error("Error fetching student data:", err);
    return { status, data };
  }
}
export const findDepartmentwiseAllData = async (batch, dept) => {
  let status = 500;
  let data = {};

  try {
    const internships = await Student.Student.find({ branch: dept });

    let filteredData = internships;
    if (batch !== "All") {
      filteredData = internships.filter(intern => intern.year === batch);
    }

    const stats = findPaidUnpaid(filteredData); // returns { status, data: [{...}] }

    if (stats.data.length > 0) {
      const summary = stats.data[0]; // destructure first object of array
      data = {
        department: dept,
        ...summary,
        data: filteredData, // raw internship array for rendering
      };
      status = 200;
    } else {
      data = {
        department: dept,
        total: 0,
        paid: 0,
        unpaid: 0,
        paidCompleted: 0,
        paidUncompleted: 0,
        unpaidCompleted: 0,
        unpaidUncompleted: 0,
        data: [],
      };
      status = 200;
    }

    return { status, data };
  } catch (err) {
    console.error(`Error fetching department-wise data for ${dept}:`, err);
    return { status, data };
  }
};

export const findDepartmentWiseDataForXlsv = async (batch, dept) => {
  let status = 500;
  let data = [];
  try {
    const internships = await Student.Student.find({ "branch": dept });
    if (internships.length > 0) {
      status = 200;
      (batch === "All") ? data = internships : data = (internships.filter(intern => intern.year === batch));
    }
    return { status, data }
  }
  catch (err) {
    console.error("Error fetching student data:", err);
    return { status, data };
  }
}
export const findBranchAndBatchwiseAllData = async (batch, departments) => {
  let status = 500;
  let data = [];

  try {
    if (departments.length < 1) {
      const res = await findBatchwiseAllData(batch); // returns array like [{...}]
      status = res.status;

      data = [
        {
          department: "All",
          ...res.data[0], // summary
          data: await Student.Student.find(
            batch === "All" ? {} : { year: batch }
          ), // raw data array
        },
      ];
    } else {
      const promises = departments.map(dept =>
        findDepartmentwiseAllData(batch, dept)
      );
      const results = await Promise.all(promises);

      status = results[0]?.status || 500;
      data = results.map(res => res.data); // clean array with expected shape
    }

    console.log("Formatted API response data:", data);
    return { status, data };
  } catch (err) {
    console.error("Error in findBranchAndBatchwiseAllData:", err);
    return { status, data };
  }
};
