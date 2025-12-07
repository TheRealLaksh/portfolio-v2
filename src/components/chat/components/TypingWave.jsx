import { motion } from "framer-motion";

export default function TypingWave() {
  return (
    <div className="flex gap-1 h-4 px-2">
      {[0,1,2,3].map(i => (
        <motion.div
          key={i}
          className="w-1 bg-sky-400 rounded-full"
          animate={{ height:["4px","12px","4px"], opacity:[.5,1,.5] }}
          transition={{ duration:1, repeat:Infinity, delay:i*.15 }}
        />
      ))}
    </div>
  );
}
