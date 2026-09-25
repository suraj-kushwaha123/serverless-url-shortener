export default function SocialButton({ children, onClick, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white font-semibold text-slate-700 transition hover:bg-slate-50"
      {...props}
    >
      {children}
    </button>
  );
}
