import { FiMail, FiCopy } from "react-icons/fi";
import { triggerHaptic } from "../../../utils/triggerHaptic";

export default function ContactCard() {
  const copy = () => {
    navigator.clipboard.writeText("contact@lakshp.live");
    triggerHaptic();
  };

  return (
    <div className="bg-slate-900 rounded-xl p-4">
      <button onClick={copy} className="flex gap-2">
        <FiMail /> contact@lakshp.live <FiCopy />
      </button>
    </div>
  );
}
