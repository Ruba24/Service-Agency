export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl font-bold mb-4 text-red-600">Payment Cancelled</h1>
      <p className="mb-4">You did not complete the payment. You can try again or go back to courses.</p>
      <a href="/" className="px-4 py-2 bg-[#B877F7] text-white rounded hover:bg-[#A062D5]">
        Go to Home
      </a>
    </div>
  )
}
