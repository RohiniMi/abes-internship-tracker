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
export const findAllData = async () => {
  let status = 500;
  let data = [];
  try {
    const internships = await Student.find();
    if (internships.length > 0) {
      status = 200;
      const paid = internships.filter(intern => intern.type === "paid");
      const completedOrNotForPaid = callDate(paid);
      const unpaid = internships.filter(intern => intern.type === "unpaid");
      const completedOrNotForUnpaid = callDate(unpaid);
      data.push(
        {
          "year": "All",
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
  } catch (error) {
    console.error("Error fetching student data:", error);
    return { status, data };
  }
}
const findBatchData = async (batch) => {
  let status = 500;
  let data = [];
  let batchData = [];
  try {
    const internships = await Student.find();
    if (internships.length > 0) {
      batchData = internships.filter(intern => intern.year === batch);
      status = 200;
    }
    if (batchData.length > 0) {
      const paid = batchData.filter(intern => intern.type === "paid");
      const completedOrNotForPaid = callDate(paid);
      const unpaid = batchData.filter(intern => intern.type === "unpaid");
      const completedOrNotForUnpaid = callDate(unpaid);
      data.push(
        {
          "year": batch,
          "total": batchData.length,
          "paid": paid.length,
          "unpaid": unpaid.length,
          "paidCompleted": completedOrNotForPaid.completed,
          "paidUncompleted": completedOrNotForPaid.notCompletedYet,
          "unpaidCompleted": completedOrNotForUnpaid.completed,
          "unpaidUncompleted": completedOrNotForUnpaid.notCompletedYet
        })
    }
    return { status, data };
  } catch (error) {
    console.error("Error fetching student data:", error);
    return { status, data };
  }
}
export const findBatchwiseAllData = async (batch) => {
  let status = 500;
  let data = [];
  if (batch === "All") {
    const batchData = await findAllData();
    status = batchData.status;
    data = batchData.data;
  }
  else {
    const batchData = await findBatchData(batch);
    console.log("particular batch data", batchData.data);
    status = batchData.status;
    data = batchData.data;
  }
  return { status, "data": data };
}
export const findAllDataForXlsv = async (batch) => {
  let status = 500;
  let data = [];
  try {
    const internships = await Student.find();
    if (internships.length > 0) {
      status = 200;
      (batch==="All")? data = internships: data = (internships.filter(intern => intern.year === batch));
    }  
    return {status,data}
  }
  catch(err){
    console.error("Error fetching student data:", error);
    return { status, data };
  }
}