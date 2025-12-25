export function Label({ children, htmlFor, className = "" }) {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-[#333333] mb-1 ${className}`}>
      {children}
    </label>
  )
}
