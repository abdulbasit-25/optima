import { Link } from "@tanstack/react-router";
import { Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = window.localStorage.getItem("optima-theme");
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const nextTheme: Theme = saved === "dark" || saved === "light" ? saved : preferred;
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    window.localStorage.setItem("optima-theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}

export function AppHeader() {
  return (
    <header className="app-header">
      <Link to="/" className="app-header__brand" aria-label="OPTIMA home">
        <span className="app-mark">
          <Search className="size-4" />
        </span>
        <span>OPTIMA</span>
      </Link>
      <nav className="app-header__nav" aria-label="Primary navigation">
        <Link to="/scoring" activeProps={{ className: "is-active" }}>
          How scoring works
        </Link>
        <ThemeToggle />
        <span className="app-header__status">
          <span className="app-header__status-dot" aria-hidden="true" />
          Live checks
        </span>
      </nav>
    </header>
  );
}

export function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="app-footer__links">
        <p>
          <strong>OPTIMA</strong>
          <span>See your website clearly.</span>
        </p>
        <Link to="/scoring">How scoring works</Link>
      </div>
      <a
        className="archer-credit"
        href="https://abdulbasit-archer.vercel.app/"
        target="_blank"
        rel="noreferrer"
      >
        <span className="archer-credit__copy">
          <span>Powered by</span>
          <strong>ARCHER</strong>
        </span>
        <span className="archer-mark" aria-hidden="true">
          <svg className="archer-mark__outer" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" />
          </svg>
          <svg className="archer-mark__inner" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="29" />
          </svg>
          <img src="https://abdulbasit-archer.vercel.app/logo.png" alt="" />
        </span>
      </a>
    </footer>
  );
}
