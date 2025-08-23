// components/PaymentForm.jsx
'use client'
import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'

export default function PaymentForm({ onSuccess, onCancel }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!stripe || !elements) {
      setError('Stripe not loaded')
      setLoading(false)
      return
    }

    // confirmPayment with redirect: 'if_required' so we can handle immediate successes inline
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // You can provide a return_url; with redirect:'if_required' it will only redirect if required
        return_url: window.location.origin + '/payment-success',
      },
      redirect: 'if_required',
    })

    if (result.error) {
      setError(result.error.message)
      setLoading(false)
      return
    }

    // If no error and result.paymentIntent exists, inspect status:
    const paymentIntent = result.paymentIntent
    if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Payment succeeded immediately
      onSuccess?.()
    } else {
      // Payment required further action or is pending (webhook will confirm)
      // You can show a pending message and rely on webhook for final confirmation
      onSuccess?.()
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <PaymentElement />
      </div>

      {error && <div className="text-red-600 mb-2">{error}</div>}

      <div className="flex justify-between">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded border">Back</button>
        <button type="submit" disabled={!stripe || loading} className="px-4 py-2 rounded bg-black text-white">
          {loading ? 'Processing…' : 'Pay now'}
        </button>
      </div>
    </form>
  )
}
