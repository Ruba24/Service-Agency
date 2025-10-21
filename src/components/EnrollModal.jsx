'use client'

import { useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './PaymentForm'
import { stripePromise } from '@/lib/stripeClient'
import convertToSubcurrency from '@/lib/convertToSubcurrency'

// export default function EnrollModal({ course, onClose }) {
//   const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
//   const [loading, setLoading] = useState(false)

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handlePayment = async () => {
//     setLoading(true)
//     try {
//       // 1️⃣ Create Stripe session from API route
//       const res = await fetch('/api/create-payment-intent', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...formData, course })
//       })
//       const data = await res.json()

//       if (data.url) {
//         window.location.href = data.url // Redirect to Stripe Checkout
//       }
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-xl w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">
//           Enroll in {course.title}
//         </h2>

//         <input
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           className="w-full border p-2 rounded mb-3"
//           value={formData.name}
//           onChange={handleChange}
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Your Email"
//           className="w-full border p-2 rounded mb-3"
//           value={formData.email}
//           onChange={handleChange}
//         />

//         <input
//           type="tel"
//           name="phone"
//           placeholder="Your Phone"
//           className="w-full border p-2 rounded mb-3"
//           value={formData.phone}
//           onChange={handleChange}
//         />

//         <div className="flex justify-end gap-2 mt-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-200 rounded"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handlePayment}
//             disabled={loading}
//             className="px-4 py-2 bg-[#B877F7] text-white rounded hover:bg-[#A062D5]"
//           >
//             {loading ? 'Processing...' : 'Proceed to Payment'}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

export default function EnrollModal({ course, onClose }) {
  const [step, setStep] = useState('form') // 'form' | 'pay' | 'success'
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [clientSecret, setClientSecret] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  async function handleProceed() {
    setLoading(true)
    setError(null)
    try {
      // price must be in cents
      const amount = convertToSubcurrency(course.price || 49.99)

      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          metadata: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            courseId: course._id || course.id || '',
            courseTitle: course.title || '',
          },
        }),
      })
      const data = await res.json()
      if (data?.clientSecret) {
        setClientSecret(data.clientSecret)
        setStep('pay')
      } else {
        setError(data.error || 'Failed to create payment intent')
      }
    } catch (err) {
      setError(err.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  const handlePaidSuccess = () => {
    setStep('success')
    // Optionally call your server to record enrollment in DB
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6">
        <button onClick={onClose} className="absolute top-4 right-4">✕</button>

        {step === 'form' && (
          <>
            <h2 className="text-xl font-bold mb-4">Enroll in {course.title}</h2>

            <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input name="phone" placeholder="Phone (include country code)" value={form.phone} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />

            {error && <div className="text-red-600 mb-2">{error}</div>}

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
              <button onClick={handleProceed} disabled={loading} className="px-4 py-2 rounded bg-[#B877F7] text-white">
                {loading ? 'Preparing...' : `Pay $${course.price ?? 49.99}`}
              </button>
            </div>
          </>
        )}

        {step === 'pay' && clientSecret && (
          <>
            <h3 className="font-medium mb-3">Complete payment</h3>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm onSuccess={handlePaidSuccess} onCancel={() => setStep('form')} />
            </Elements>
          </>
        )}

        {step === 'success' && (
          <>
            <h3 className="text-[#B877F7] font-bold">Payment successful!</h3>
            <p className="mt-2">We’ve received your enrollment. You will also receive a confirmation email shortly.</p>
            <div className="flex justify-end mt-4">
              <button onClick={onClose} className="px-4 py-2 rounded bg-[#B877F7] text-white">Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
