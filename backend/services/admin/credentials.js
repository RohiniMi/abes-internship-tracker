import { generatePassword } from "../../utils/generatePassword.js";
import sendEmail from "../../mailer.js";
import bcrypt from 'bcrypt';
import xlsx from 'xlsx';
import StudentLogin from "../../models/studentLogin.js";

export const sendEmailofIdPassToSingleUSer = async (req) => {
  const { name, email, role, department } = req.body;
  const createdUsers = [];
  if (!name || !email || !["admin", "ccpd", "hod", "student"].includes(role)) {
    console.warn(`Skipping invalid row: ${JSON.stringify(row)}`);
    return;
  }
  if (role === "hod" && !department) {
    console.warn(`Skipping HOD with no department: ${email}`);
    return;
  }
  const rawPassword = generatePassword();
  const hashedPassword = await bcrypt.hash(rawPassword, 10);
  const student = await StudentLogin.create({
    name,
    email,
    password: hashedPassword,
    role,
    department: role === "hod" ? department : undefined,
    mustChangePassword: true
  });
  const emailBody = `Hello ${name},

Your account has been successfully created on ABES Internship Tracker.

Here are your login credentials:
Email: ${email}
Password: ${rawPassword}
Role: ${role}
${department ? `Department: ${department}\n` : ""}Please use these credentials to access your account.

Best regards,
FSD Team`;

  await sendEmail(email, "Login Credentials", emailBody);
  createdUsers.push({ email, role, department });
  return {
    status: 200,
    message: "Emails sent successfully.",
    data: createdUsers
  };
}

export const sendEmailofIdPassToBulk = async (file, body) => {
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
}