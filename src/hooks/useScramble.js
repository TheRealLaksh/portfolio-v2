import { useState, useEffect, useRef } from 'react';

const CHARS = "!@#$%^&*():{};|,.<>/?ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

export const useScramble = (text) => {
  const [scrambled, setScrambled] = useState(text);
  const intervalRef = useRef(null);

  const scramble = () => {
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