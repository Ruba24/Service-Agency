'use client'

export default function Select({ name, value, onChange, options, placeholder }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border p-3 rounded focus:ring-2 focus:ring-[#B877F7]"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value || opt.label} value={opt.value || opt.label}>
          {opt.label || opt.title || opt}
        </option>
      ))}
    </select>
  )
}
