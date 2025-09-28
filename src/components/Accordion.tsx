import * as React from "react";
import styles from "./Accordion.module.scss";

interface AccordionProps {
  defaultValue?: boolean;
  title: string;
  children?: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({
  defaultValue = false,
  title,
  children,
}) => {
  const [show, setShow] = React.useState<boolean>(defaultValue);
  const accordionRef = React.useRef<HTMLDivElement | null>(null);

  const toggleShow = (): void => {
    setShow((prevShow) => !prevShow);
  };

  return (
    <>
      <div
        ref={accordionRef}
        tabIndex={0}
        role="button"
        onClick={toggleShow}
        aria-expanded={show}
        className={`${styles.flex} ${show ? styles.active : ""}`}
      >
        <span className={styles.icon}>{show ? "▾" : "▸"}</span>
        <span className={styles.content}>{title}</span>
      </div>
      {show && <div style={{ paddingLeft: "1ch" }}>{children}</div>}
    </>
  );
};

export default Accordion;
