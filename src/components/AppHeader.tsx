import { Menu, Moon, Sun } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/ThemeProvider";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Get Started", path: "/get-started" },
  { label: "Personality Test", path: "/personality-test" },
  { label: "Chats", path: "/chats" },
];

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 bg-background/80 backdrop-blur-sm border-b border-border">
      {/* Logo */}
      <button onClick={() => navigate("/")} className="text-xl font-bold tracking-tight text-foreground">
        <span className="text-primary">H</span>uddle
      </button>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              location.pathname === item.path
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-secondary/80 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 text-foreground" />
          ) : (
            <Moon className="h-4 w-4 text-foreground" />
          )}
        </button>

        {/* Mobile Hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-secondary/80 transition-colors">
              <Menu className="h-5 w-5 text-foreground" />
            </button>
          </SheetTrigger>
          <SheetContent className="bg-background border-border">
            <nav className="flex flex-col gap-2 mt-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`text-left text-lg py-3 px-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-secondary/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default AppHeader;
