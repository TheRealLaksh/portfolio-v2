export default function ActionChip({ icon: Icon, label, onClick }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-full border bg-white/5">
      <Icon size={14} />
      {label}
    </button>
  );
}
