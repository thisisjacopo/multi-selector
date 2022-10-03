import { useState, useEffect, useRef } from "react";
import styles from "./select.module.css";

export type SelectOption = {
  label: string;
  value: string | number;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export function Select({ multiple, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlighedIndex, setHighlighedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }

  function handleOption(option: SelectOption) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((opt) => opt !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option === value;
  }

  function setHighlightedOption(index: number) {}

  useEffect(() => {
    if (isOpen) {
      setHighlighedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) handleOption(options[highlighedIndex]);
          break;

        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
          }

          const newValue = highlighedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlighedIndex(newValue);
          }
          break;
        }

        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    containerRef.current?.addEventListener("keydown", handler);
    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlighedIndex, options]);

  return (
    <div
      ref={containerRef}
      onClick={() => setIsOpen(!isOpen)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      className={styles.container}>
      <span className={styles.value}>
        {multiple
          ? value.map((v) => {
              return (
                <button
                  className={styles["option-badge"]}
                  key={v.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOption(v);
                  }}>
                  {v.label}{" "}
                  <span className={styles["remove-btn"]}>&times;</span>{" "}
                </button>
              );
            })
          : value?.label}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={styles["clear-btn"]}>
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => {
          return (
            <li
              onClick={(e) => {
                e.stopPropagation();
                handleOption(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedOption(index)}
              key={option.value}
              className={`${styles.option} ${
                isOptionSelected(option) ? styles.selected : ""
              } ${index === highlighedIndex ? styles.highlighted : ""}`}>
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
