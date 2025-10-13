"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, type Category } from "./filters.types";

const ALL = "Todos" as const;
type AllOrCat = typeof ALL | Category;

export default function FilterDropdown({
  value,
  onChange,
}: {
  value: AllOrCat;
  onChange: (v: AllOrCat) => void;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = useSearchParams();

  const items: AllOrCat[] = [ALL, ...CATEGORIES];

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open]);

  function select(v: AllOrCat) {
    onChange(v);
    setOpen(false);
    
    // Persistencia en URL
    const usp = new URLSearchParams(params.toString());
    if (v === ALL) usp.delete("cat");
    else usp.set("cat", v);
    router.replace(`?${usp.toString()}`, { scroll: false });
  }

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent, idx: number) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (idx + 1) % items.length;
      const nextBtn = menuRef.current?.querySelectorAll('[role="menuitemradio"]')[next] as HTMLElement;
      nextBtn?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (idx - 1 + items.length) % items.length;
      const prevBtn = menuRef.current?.querySelectorAll('[role="menuitemradio"]')[prev] as HTMLElement;
      prevBtn?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(items[idx]);
    }
  }

  const displayText = value === ALL ? "Todos" : value;

  return (
    <div className="sticky top-0 z-20 bg-white/90 backdrop-blur px-3 py-2 flex justify-between items-center">
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setOpen(!open)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls="filter-menu"
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm transition hover:bg-gray-50 bg-white"
        >
          {/* Filter Icon SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-700"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span className="text-gray-700">
            Filtro: <span className="font-medium text-black">{displayText}</span>
          </span>
        </button>

        {open && (
          <div
            ref={menuRef}
            id="filter-menu"
            role="menu"
            className="absolute left-0 mt-2 w-64 rounded-xl border border-gray-200 bg-white shadow-lg p-2"
            style={{ zIndex: 50 }}
          >
            {items.map((cat, idx) => {
              const checked = cat === value;
              return (
                <button
                  key={cat}
                  role="menuitemradio"
                  aria-checked={checked}
                  onClick={() => select(cat)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  tabIndex={0}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer w-full text-left transition"
                >
                  {/* Radio visual */}
                  <div
                    data-checked={checked}
                    className={`h-4 w-4 rounded-full border transition ${
                      checked
                        ? "border-black bg-black"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {checked && (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                  <span className={checked ? "font-medium text-black" : "text-gray-700"}>
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

