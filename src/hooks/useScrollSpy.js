import { useState, useEffect } from 'react';

const useScrollSpy = (ids, offset = 100) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const listener = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the section that covers the current scroll position
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(id);
            return; 
          }
        }
      }
    };

    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  }, [ids, offset]);

  return activeId;
};

export default useScrollSpy;