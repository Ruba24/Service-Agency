// src/app/api/stripe-webhook/route.js
import Stripe from "stripe";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: parseInt(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false },
});

// Read HTML template
function readTemplate(filename) {
  return fs.readFileSync(path.join(process.cwd(), "src/lib/email-templates", filename), "utf8");
}

function fillTemplate(template, data) {
  return template.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || "");
}

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    const body = await req.text(); // Important for webhook
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed.", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Example: Get info from session
    const name = session.customer_details.name;
    const email = session.customer_details.email;
    const phone = session.customer_details.phone || "N/A";
    const amount = session.amount_total / 100; // Stripe amounts are in cents
    const paymentId = session.payment_intent;
    const courseTitle = session.metadata?.courseTitle || "Unknown Course";
    const receiptUrl = session.payment_status === "paid" ? session.payment_intent : null;
    const date = new Date().toLocaleString();
    const year = new Date().getFullYear();

    // Send ADMIN email
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
      to: process.env.OFFICIAL_EMAIL,
      subject: `📢 New Enrollment: ${name}`,
      html: adminTemplate,
    });

    // Send USER email
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
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
