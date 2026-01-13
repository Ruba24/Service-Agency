import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: parseInt(process.env.SMTP_PORT) === 465, // true for SSL, false for TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false },
});

// Helper to read HTML templates
function readTemplate(filename) {
  return fs.readFileSync(path.join(process.cwd(), "src/lib/email-templates", filename), "utf8");
}

// Replace placeholders like {{name}} in template
function fillTemplate(template, data) {
  return template.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || "");
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      courseTitle,
      amount,
      paymentId,
      receiptUrl,
    } = body;

    const date = new Date().toLocaleString();
    const year = new Date().getFullYear();

    // --- Send email to ADMIN ---
    const adminTemplate = fillTemplate(readTemplate("adminNotifyOnUserEnrollment.html"), {
      name,
      userEmail: email,
      phone,
      courseTitle,
      amount,
      paymentId,
      receiptUrl,
      date,
      year,
    });

    await transporter.sendMail({
      from: `"ZellVerse" <${process.env.OFFICIAL_EMAIL}>`,
      to: process.env.OFFICIAL_EMAIL, // admin email
      subject: `📢 New Enrollment: ${name}`,
      html: adminTemplate,
    });

    // --- Send email to USER ---
    const userTemplate = fillTemplate(readTemplate("userEnrollmentConfirmation.html"), {
      name,
      courseTitle,
      amount,
      paymentId,
      receiptUrl,
      date,
      year,
    });

    await transporter.sendMail({
      from: `"ZellVerse" <${process.env.OFFICIAL_EMAIL}>`,
      to: email,
      subject: `🎉 Enrollment Confirmed: ${courseTitle}`,
      html: userTemplate,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Email sending failed:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
