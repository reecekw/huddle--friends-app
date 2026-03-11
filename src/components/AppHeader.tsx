import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const AppHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-sm border-b border-border">
      <button onClick={() => navigate("/")} className="text-xl font-bold tracking-tight text-foreground">
        <span className="text-primary">H</span>uddle
      </button>
      <Sheet>
        <SheetTrigger asChild>
          <button className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-secondary/80 transition-colors">
            <Menu className="h-5 w-5 text-foreground" />
          </button>
        </SheetTrigger>
        <SheetContent className="bg-background border-border">
          <nav className="flex flex-col gap-2 mt-8">
            {[
              { label: "Home", path: "/" },
              { label: "Get Started", path: "/get-started" },
              { label: "Personality Test", path: "/personality-test" },
              { label: "Chats", path: "/chats" },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="text-left text-lg text-foreground hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-secondary/50"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default AppHeader;
