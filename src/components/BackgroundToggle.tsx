import React, { useState, useEffect } from "react";
import LetterGlitch from "./LetterGlitch";
import styles from "./BackgroundToggle.module.scss";

const BackgroundToggle: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("backgroundGlitch");
    if (saved !== null) {
      setIsEnabled(saved === "true");
    }
  }, []);

  const toggleBackground = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    localStorage.setItem("backgroundGlitch", String(newState));
  };

  return (
    <>
      {isEnabled && (
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      )}
      <button
        onClick={toggleBackground}
        className={styles.toggleButton}
        aria-label="Toggle background effect"
        title="Toggle background effect"
      >
        {isEnabled ? "◉" : "◯"}
      </button>
    </>
  );
};

export default BackgroundToggle;
