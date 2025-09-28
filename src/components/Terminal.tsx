import React, { useState, useRef, useEffect } from "react";
import styles from "./Terminal.module.scss";

const commands = (
  base: string = ""
): { [key: string]: () => React.ReactNode } => ({
  help: () => (
    <div>
      <p>Available commands:</p>
      <ul className={styles.helpList}>
        <li>
          <span className={styles.command}>help</span> - Show this help message
        </li>
        <li>
          <span className={styles.command}>ls</span> - List available pages
        </li>
        <li>
          <span className={styles.command}>cat &lt;file&gt;</span> - Display
          content of a file (e.g., cat bio.txt, cat contact.txt)
        </li>
        <li>
          <span className={styles.command}>uname -a</span> - Show system
          information
        </li>
        <li>
          <span className={styles.command}>clear</span> - Clear the terminal
        </li>
      </ul>
    </div>
  ),
  ls: () => (
    <div>
      <p>
        <a href={`${base}/blog`}>blog</a>
      </p>
      <p>
        <a href={`${base}/projects`}>projects</a>
      </p>
      <p>
        bio.txt
      </p>
      <p>
        contact.txt
      </p>
    </div>
  ),
  "cat bio.txt": () => <p>My name is Jonas and I am a developer from Norway</p>,
  "uname -a": () => (
    <div>
      <p>
        Jonas-OS 1.0.0 Darwin Kernel Version 22.5.0: {new Date().toString()};
        root:xnu-8796.121.2~5/RELEASE_ARM64_T8112
      </p>
      <p>Tech Stack:</p>
      <ul className={styles.helpList}>
        <li>Astro</li>
        <li>React</li>
        <li>TypeScript</li>
        <li>SCSS</li>
      </ul>
    </div>
  ),
  "cat contact.txt": () => (
    <div>
      <p>
        GitHub:{" "}
        <a href="https://github.com/jonasnico" target="_blank">
          github.com/jonasnico
        </a>
      </p>
      <p>
        LinkedIn:{" "}
        <a
          href="https://linkedin.com/in/jonas-nicolaysen-66967611a"
          target="_blank"
        >
          linkedin.com/in/jonas-nicolaysen-66967611a
        </a>
      </p>
    </div>
  ),
  clear: () => null,
});

const Terminal = ({ base }: { base?: string }) => {
  const commandFunctions = commands(base);
  const [history, setHistory] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight;
    }
  }, [history]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = input.trim().toLowerCase();
      if (command) {
        const newHistory = [...history, { command, output: null }];
        if (command === "clear") {
          setHistory([]);
        } else if (commandFunctions[command]) {
          newHistory[newHistory.length - 1].output =
            commandFunctions[command]();
          setHistory(newHistory);
        } else {
          newHistory[newHistory.length - 1].output = (
            <div>
              <p>Command not found: {command}</p>
              <p>Type 'help' for a list of available commands.</p>
            </div>
          );
          setHistory(newHistory);
        }
      }
      setInput("");
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={terminalRef}
      className={styles.terminal}
      onClick={() => inputRef.current?.focus()}
    >
      <div className={styles.history}>
        {history.map((item, index) => (
          <div key={index}>
            <div className={styles.promptLine}>
              <span className={styles.prompt}>$</span>
              <span>{item.command}</span>
            </div>
            {item.output && <div className={styles.output}>{item.output}</div>}
          </div>
        ))}
      </div>
      <div className={styles.promptLine}>
        <span className={styles.prompt}>$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default Terminal;
