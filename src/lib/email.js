import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT == 465, // SSL for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false },
});

export async function sendEmail({ to, subject, templateName, variables }) {
  try {
    const filePath = path.join(
      process.cwd(),
      "src/lib/email-templates",
      `${templateName}.html`
    );
    const source = fs.readFileSync(filePath, "utf-8");
    const compiledTemplate = handlebars.compile(source);
    const html = compiledTemplate(variables);

    await transporter.sendMail({
      from: `"ZellVerse" <${process.env.OFFICIAL_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error("❌ Error sending email:", err.message);
  }
}
