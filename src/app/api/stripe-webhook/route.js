// // app/api/stripe-webhook/route.js
// import { NextResponse } from 'next/server'
// import Stripe from 'stripe'
// import nodemailer from 'nodemailer'
// import fs from 'fs'
// import path from 'path'
// import Handlebars from 'handlebars'
// export const runtime = 'nodejs'
// export const dynamic = 'force-dynamic'


// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// function loadTemplate(fileName, replacements) {
//   const filePath = path.join(process.cwd(), 'src', 'lib', 'email-templates', fileName)
//   let html = fs.readFileSync(filePath, 'utf-8')
//   for (const [key, value] of Object.entries(replacements)) {
//     html = html.replace(new RegExp(`{{${key}}}`, 'g'), value)
//   }
//   return html
//   // const source = fs.readFileSync(filePath, 'utf-8')

//   // // Compile with Handlebars
//   // const template = Handlebars.compile(source)
//   // return template(replacements)
// }

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2023-08-16',
// })

// export async function POST(req) {
//   if (req.method !== 'POST') {
//     res.setHeader('Allow', 'POST');
//     return res.status(405).end('Method Not Allowed');
//   }

//   let rawBody
//   let sig

//   try {
//     rawBody = await req.text() // ✅ Get raw text
//     sig = req.headers.get('stripe-signature')
//   } catch (err) {
//     console.error('Error reading request body:', err)
//     return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
//   }

//   let event
//   try {
//     event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
//   } catch (err) {
//     console.error('Webhook signature verification failed:', err.message)
//     return NextResponse.json({ error: err.message }, { status: 400 })
//   }

//   try {
//     if (event.type === 'payment_intent.succeeded') {
//       console.log('INSIDE')
//       const pi = event.data.object
//       const metadata = pi.metadata || {}

//       console.log('✅ Payment succeeded:')

//       const phone = metadata.phone
//       const name = metadata.name || ''
//       const courseTitle = metadata.courseTitle || 'your course'
//       const email = metadata.email
//       const amount = (pi.amount_received / 100).toFixed(2)
//       const paymentId = pi.id
//       const receiptUrl = pi.latest_charge
//         ? (await stripe.charges.retrieve(pi.latest_charge)).receipt_url
//         : ''

//       console.log('✅ Payment succeeded:', { name, email, courseTitle, amount })

//       console.log('phone: ', phone);
//       console.log('name: ', name);
//       console.log('Email: ', email);
//       console.log('course Title: ', courseTitle);
//       console.log('amount: ', amount);
//       console.log('paymentId: ', paymentId);
//       console.log('receiptUrl: ', receiptUrl);

//       // const info = await transporter.sendMail({
//       //   from: `"Course Enrollment" <${testAccount.user}>`,
//       //   to: "youremail@example.com",
//       //   subject: "Test Email",
//       //   text: "This is a test email",
//       //   html: "<b>This is a test email</b>",
//       // });

//       // console.log("Preview URL:", nodemailer.getTestMessageUrl(info));


//       const transporter = nodemailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port: 587,
//         secure: false,
//         auth: {
//           user: process.env.SMTP_USER,
//           pass: process.env.SMTP_PASS,
//         },
//       });

//       const userHtml = loadTemplate('userEnrollmentConfirmation.html', {
//         name,
//         courseTitle,
//         amount,
//         paymentId,
//         receiptUrl,
//         date: new Date().toLocaleString(),
//         year: new Date().getFullYear(),
//       })

//       // Load admin notification template
//       const adminHtml = loadTemplate('adminNotifyOnUserEnrollment.html', {
//         name,
//         userEmail: email,
//         phone,
//         courseTitle,
//         amount,
//         paymentId,
//         receiptUrl,
//         date: new Date().toLocaleString(),
//         year: new Date().getFullYear(),
//       })

//       // Send user email
//       await transporter.sendMail({
//         from: `"ZellVerse Agency" <${process.env.COMPANY_EMAIL}>`,
//         to: email,
//         subject: `Enrollment Confirmed - ${courseTitle}`,
//         html: userHtml,
//       })

//       // Send admin email
//       await transporter.sendMail({
//         from: `"ZellVerse Agency" <${process.env.SMTP_USER}>`,
//         to: process.env.SMTP_USER,
//         subject: `New Enrollment - ${courseTitle}`,
//         html: adminHtml,
//       })
//     }

//     return NextResponse.json({ received: true })
//   } catch (err) {
//     console.error('Webhook handler error', err)
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }
// import Stripe from 'stripe'

// export const runtime = 'nodejs'
// export const dynamic = 'force-dynamic'

// export async function POST(req) {
//   try {
//     if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
//       return new Response(
//         JSON.stringify({ error: 'Stripe keys missing' }),
//         { status: 500 }
//       )
//     }

//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//       apiVersion: '2022-11-15',
//     })

//     const body = await req.text()
//     const signature = req.headers.get('stripe-signature')

//     let event

//     try {
//       event = stripe.webhooks.constructEvent(
//         body,
//         signature,
//         process.env.STRIPE_WEBHOOK_SECRET
//       )
//     } catch (err) {
//       return new Response(
//         `Webhook Error: ${err.message}`,
//         { status: 400 }
//       )
//     }

//     // Example: handle event types
//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         console.log('Payment succeeded!')
//         break
//       default:
//         console.log(`Unhandled event type: ${event.type}`)
//     }

//     return new Response(JSON.stringify({ received: true }))
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 })
//   }
// }

import Stripe from 'stripe'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Configure your cPanel SMTP transporter
const transporter = nodemailer.createTransport({
  host: 'mail.yourdomain.com', // your cPanel mail server
  port: 465,                   // 465 for SSL, 587 for TLS
  secure: true,                // true for 465
  auth: {
    user: process.env.EMAIL_USER, // your cPanel email
    pass: process.env.EMAIL_PASS, // your email password
  },
})

// Helper function to send emails
async function sendEmail({ to, subject, text, html }) {
  try {
    await transporter.sendMail({
      from: `"ZELLVERSE" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    })
    console.log(`Email sent to ${to}`)
  } catch (err) {
    console.error('Error sending email:', err)
  }
}

export async function POST(req) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      return new Response(
        JSON.stringify({ error: 'Stripe keys missing' }),
        { status: 500 }
      )
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    })

    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    let event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      return new Response(
        `Webhook Error: ${err.message}`,
        { status: 400 }
      )
    }

    // Handle Stripe events
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        const customerEmail = session.customer_email
        const amountPaid = session.amount_total / 100
        const courseName = session.metadata.course_name || 'Course'

        // Send email to student
        await sendEmail({
          to: customerEmail,
          subject: `Enrollment Successful: ${courseName}`,
          text: `Hi! You have successfully enrolled in ${courseName}. Amount paid: $${amountPaid}`,
          html: `<p>Hi! You have successfully enrolled in <b>${courseName}</b>.</p><p>Amount paid: $${amountPaid}</p>`,
        })

        // Send email to admin
        await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: `New Enrollment: ${courseName}`,
          text: `${customerEmail} has enrolled in ${courseName}. Amount paid: $${amountPaid}`,
          html: `<p><b>${customerEmail}</b> has enrolled in <b>${courseName}</b>.</p><p>Amount paid: $${amountPaid}</p>`,
        })

        console.log('Checkout session completed and emails sent!')
        break

      case 'payment_intent.succeeded':
        console.log('Payment succeeded!')
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }))
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}
