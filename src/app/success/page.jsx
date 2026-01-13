export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#B877F7]">Payment Successful!</h1>
      <p className="mb-4">Thank you for your enrollment. You will also receive a confirmation email shortly.</p>
      <a href="/" className="px-4 py-2 bg-[#B877F7] text-white rounded hover:bg-[#A062D5]">
        Go to Home
      </a>
    </div>
  )
}
