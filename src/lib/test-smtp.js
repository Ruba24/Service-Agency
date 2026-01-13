import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);

(async () => {
  console.log("📧 Starting SMTP test...");

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: parseInt(process.env.SMTP_PORT) === 465, // true for SSL, false for TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // ignore invalid certificates
      },
    });

    // Verify connection
    await transporter.verify();
    console.log("✅ SMTP connection successful!");

    // Send test email to yourself
    const info = await transporter.sendMail({
      from: `"ZellVerse Test" <${process.env.OFFICIAL_EMAIL}>`,
      to: process.env.OFFICIAL_EMAIL,
      subject: "SMTP Test Email ✔",
      text: "This is a test email to verify your SMTP setup is working.",
      html: "<p>This is a <strong>test email</strong> to verify your SMTP setup is working.</p>",
    });

    console.log(`📨 Test email sent successfully! Message ID: ${info.messageId}`);
  } catch (err) {
    console.error("❌ SMTP Test Failed:", err.message);
  }
})();
