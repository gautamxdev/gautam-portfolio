"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

const commands = [
  {
    label: "Work",
    description: "Explore selected projects",
    href: "#projects",
    key: "01",
  },
  {
    label: "About",
    description: "The person behind the code",
    href: "#about",
    key: "02",
  },
  {
    label: "Contact",
    description: "Start a conversation",
    href: "#contact",
    key: "03",
  },
  {
    label: "Top",
    description: "Back to the beginning",
    href: "#top",
    key: "↑",
  },
  {
    label: "GitHub",
    description: "Browse the source",
    href: "https://github.com/gautamxdev",
    key: "↗",
  },
  {
    label: "Email",
    description: "shettygautam955@gmail.com",
    href: "mailto:shettygautam955@gmail.com",
    key: "↗",
  },
] as const;

export function CommandMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const optionRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [shortcut, setShortcut] = useState("⌘ K");
  const id = useId();
  const listId = `${id}-options`;
  const inputId = `${id}-search`;

  const filteredCommands = commands.filter((command) =>
    `${command.label} ${command.description}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  const safeActiveIndex = Math.min(
    activeIndex,
    Math.max(0, filteredCommands.length - 1),
  );

  const closeMenu = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const openMenu = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setQuery("");
    setActiveIndex(0);
    dialog.showModal();
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setShortcut(/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘ K" : "Ctrl K");

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        !(event.metaKey || event.ctrlKey) ||
        event.key.toLowerCase() !== "k" ||
        event.altKey
      )
        return;
      event.preventDefault();
      if (dialogRef.current?.open) closeMenu();
      else openMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMenu, openMenu]);

  return (
    <>
      <button
        type="button"
        className="command-trigger"
        aria-label="Open command menu"
        aria-haspopup="dialog"
        aria-controls={`${id}-dialog`}
        onClick={openMenu}
      >
        <span aria-hidden="true">{shortcut}</span>
      </button>

      <dialog
        id={`${id}-dialog`}
        ref={dialogRef}
        className="command-dialog"
        aria-labelledby={`${id}-title`}
        onClose={() => previousFocusRef.current?.focus({ preventScroll: true })}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          ) {
            closeMenu();
          }
        }}
      >
        <h2 id={`${id}-title`} className="sr-only">
          Command menu
        </h2>
        <div className="command-search">
          <span className="command-search-icon" aria-hidden="true">
            ⌕
          </span>
          <label htmlFor={inputId} className="sr-only">
            Search pages and links
          </label>
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            role="combobox"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="Where do you want to go?"
            value={query}
            aria-autocomplete="list"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={
              filteredCommands.length
                ? `${id}-option-${safeActiveIndex}`
                : undefined
            }
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={(event) => {
              if (event.nativeEvent.isComposing || !filteredCommands.length)
                return;
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                const direction = event.key === "ArrowDown" ? 1 : -1;
                const nextIndex =
                  (safeActiveIndex + direction + filteredCommands.length) %
                  filteredCommands.length;
                setActiveIndex(nextIndex);
                optionRefs.current[nextIndex]?.scrollIntoView({
                  block: "nearest",
                });
              } else if (event.key === "Enter") {
                event.preventDefault();
                optionRefs.current[safeActiveIndex]?.click();
              }
            }}
          />
          <button
            type="button"
            className="command-close"
            onClick={closeMenu}
            aria-label="Close command menu"
          >
            <kbd>esc</kbd>
          </button>
        </div>

        <div
          id={listId}
          className="command-options"
          role="listbox"
          aria-label="Pages and links"
        >
          {filteredCommands.map((command, index) => (
            <a
              key={command.label}
              id={`${id}-option-${index}`}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              className={`command-option${index === safeActiveIndex ? " is-active" : ""}`}
              role="option"
              aria-selected={index === safeActiveIndex}
              href={command.href}
              target={command.label === "GitHub" ? "_blank" : undefined}
              rel={
                command.label === "GitHub" ? "noopener noreferrer" : undefined
              }
              onPointerMove={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={closeMenu}
            >
              <span className="command-option-copy">
                <span className="command-option-title">{command.label}</span>
                <span className="command-option-description">
                  {command.description}
                </span>
              </span>
              <span className="command-option-key" aria-hidden="true">
                {command.key}
              </span>
              {command.label === "GitHub" && (
                <span className="sr-only"> (opens in a new tab)</span>
              )}
            </a>
          ))}
        </div>
        {filteredCommands.length === 0 && (
          <p className="command-empty" role="status">
            No matches. Try “work” or “email”.
          </p>
        )}
        <div className="command-footer">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> to navigate
          </span>
          <span>
            <kbd>↵</kbd> to open
          </span>
        </div>
      </dialog>
    </>
  );
}
