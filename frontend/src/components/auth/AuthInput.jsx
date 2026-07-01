export default function AuthInput({ icon: Icon, type = "text", className = "", ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <span className="pointer-events-none absolute inset-y-0 left-0 flex w-14 items-center justify-center text-slate-400">
          <Icon size={18} />
        </span>
      )}
      <input
        type={type}
        className={`w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 ${
          Icon ? "pl-16" : "pl-4"
        } pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${className}`}
        {...props}
      />
    </div>
  );
}
