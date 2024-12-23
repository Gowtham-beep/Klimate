import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { theme, setTheme } = useTheme();// hook provided by ThemeProvider
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto h-16 flex items-center justify-between px-4">
        {/* Logo Section */}
        <Link to="/">
          <img
            src={isDark ? "/logo.png" : "/logo2.png"}
            alt="Klimate logo"
            className="h-14"
          />
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle Theme"
          className={`flex items-center justify-center p-2 rounded transition-transform duration-500 
            ${isDark ? "rotate-180" : "rotate-0"}
          `}
        >
          {isDark ? (
            <Sun className="h-6 w-6 text-yellow-500" />
          ) : (
            <Moon className="h-6 w-6 text-blue-500" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
