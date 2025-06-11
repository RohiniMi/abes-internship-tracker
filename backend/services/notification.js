import Student from "../models/student.js";
import xlsx from 'xlsx';
import bcrypt from 'bcrypt';
import { generatePassword } from "../utils/generatePassword.js";
import sendEmail from "../mailer.js";
import StudentLogin from "../models/studentLogin.js";
export const findDepartmentWiseNotification = async (dept) => {
  let status = 500;
  let data = [];
  try {
    data = await Student.StudentRaw.find({ "branch": dept });
    if (data.length > 0) status = 200;
    console.log(data);

    return { status, data };
  } catch (error) {
    console.error("Error fetching student data:", error);
    return { status, data };
  }
}
export const saveInternship = async (id) => {
  let status = 500;
  let message = "Unsuccessful";
  try {
    const data = await Student.StudentRaw.findById(id);
    if (data) {
      await Student.Student.create(data.toObject());
      await Student.StudentRaw.findByIdAndDelete(id);
      status = 200;
      message = "Successful";
    }
    return { status, message };
  } catch (error) {
    console.error("Error fetching student data:", error);
    return { status, message };
  }
}

export const sendEmailofIdPass = async (file, body) => {
  try {
    const workbook = xlsx.readFile(file.path);
    const sheet = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);

    const createdUsers = [];

    for (const row of data) {
      const email = row.Email || row.email || row["Email ID"];
      const role = (row.Role || row.role || "student").toLowerCase();
      const department = row.Department || row.department || null;

      if (!email || !["admin", "ccpd", "hod", "student"].includes(role)) {
        console.warn(`Skipping invalid row: ${JSON.stringify(row)}`);
        continue;
      }

      if (role === "hod" && !department) {
        console.warn(`Skipping HOD with no department: ${email}`);
        continue;
      }

      const rawPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(rawPassword, 10);

      const student = await StudentLogin.create({
        email,
        password: hashedPassword,
        role,
        department: role === "hod" ? department : undefined,
        mustChangePassword: true
      });

      // Send Email
      const emailBody = `Hello,\n\nYour login credentials are:\nEmail: ${email}\nPassword: ${rawPassword}\nRole: ${role}\n${department ? `Department: ${department}\n` : ""}\nPlease change your password after first login.`;
      await sendEmail(email, "Login Credentials", emailBody);

      createdUsers.push({ email, role, department });
    }

    return {
      status: 200,
      message: "Emails sent and users created successfully.",
      data: createdUsers
    };

  } catch (err) {
    console.error("Error processing file:", err);
    return { status: 500, message: err.message };
  }
};
