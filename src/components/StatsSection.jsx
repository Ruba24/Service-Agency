// components/StatsSection.jsx
'use client'

const StatsSection = ({ stats }) => {
  return (
    <div className="my-12 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-b from-purple-50 to-white rounded-2xl p-8 py-12 text-center shadow-sm border border-gray-100 min-h-[160px] flex flex-col items-center justify-center 
              ${stats.length % 2 !== 0 && index === stats.length - 1 ? "sm:col-span-2 sm:mx-auto sm:w-1/2" : ""}`}
          >
            <h3 className="text-4xl font-bold text-purple-600">{stat.value}</h3>
            <p className="mt-3 text-gray-600 text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatsSection
