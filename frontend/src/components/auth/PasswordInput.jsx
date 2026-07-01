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
    <div style={{ position: "relative", width: "100%" }}>
      <span
        style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          pointerEvents: "none",
          color: "#94a3b8",
        }}
      >
        <Lock size={18} />
      </span>

      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        style={{
          height: "52px",
          width: "100%",
          boxSizing: "border-box",
          paddingLeft: "48px",
          paddingRight: "48px",
        }}
        {...props}
      />

      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        tabIndex={-1}
        style={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          color: "#94a3b8",
        }}
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}