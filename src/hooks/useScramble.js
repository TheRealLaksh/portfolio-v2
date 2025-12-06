import { useState, useRef } from 'react';

const CHARS = "!@#$%^&*():{};|,.<>/?ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const COOLDOWN_TIME = 5000; // 5 Seconds cooldown

export const useScramble = (text) => {
  const [scrambled, setScrambled] = useState(text);
  const intervalRef = useRef(null);
  const isOnCooldown = useRef(false); // Track if we are in the 5s waiting period

  const scramble = () => {
    // 1. Check if we are on cooldown. If yes, stop here.
    if (isOnCooldown.current) return;

    // 2. Activate cooldown
    isOnCooldown.current = true;
    
    // 3. Schedule cooldown removal after 5 seconds
    setTimeout(() => {
      isOnCooldown.current = false;
    }, COOLDOWN_TIME);

    // 4. Run the animation logic (Standard Scramble)
    let pos = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const scrambledText = text.split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < pos) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setScrambled(scrambledText);
      pos += 1 / CYCLES_PER_LETTER;

      if (pos >= text.length) {
        clearInterval(intervalRef.current);
        setScrambled(text);
      }
    }, SHUFFLE_TIME);
  };

  return { text: scrambled, replay: scramble };
};