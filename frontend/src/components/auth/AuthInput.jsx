export default function AuthInput({ icon: Icon, type = "text", className = "", ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
      )}
      <input
        type={type}
        className={`w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 ${
          Icon ? "pl-12" : "pl-4"
        } pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${className}`}
        {...props}
      />
    </div>
  );
}
