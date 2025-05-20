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
  return { status, "data": data,"batch":batch };
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
  let data = [];
  const internships = await Student.Student.find({ "branch": dept });
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
  return { status, "data": data, "batch":batch };
}
export const findDepartmentWiseDataForXlsv = async (batch, dept) => {
  let status = 500;
  let data = [];
  try {
    const internships = await Student.Student.find({"branch":dept});
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