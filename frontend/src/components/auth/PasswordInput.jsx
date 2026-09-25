import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function PasswordInput({
  value,
  onChange,
  placeholder = "••••••••",
  ...props
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      <span className="pointer-events-none absolute inset-y-0 left-0 flex w-14 items-center justify-center text-slate-400">
        <Lock size={18} />
      </span>

      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50 pl-16 pr-14 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        {...props}
      />

      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        tabIndex={-1}
        className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center p-0 text-slate-400 transition hover:text-slate-600"
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}