export default function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2 w-full">
      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-500">
        {label}
      </span>
      {children}
    </label>
  );
}
