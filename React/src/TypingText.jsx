import React, { useState, useEffect } from 'react';

const TypingText = ({ text, speed = 40 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      currentIndex++;

      if (currentIndex >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <div className="message">{displayedText}</div>;
};

export default TypingText;
