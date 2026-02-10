import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { getStoredUser } from "@/lib/api";

const ForumHeader = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const user = getStoredUser();
  const isAdmin = user?.role === "admin";
  const navItems = [
    { label: "Forums", href: "#", active: true },
    { label: "What's new", href: "#", hasDropdown: true },
    { label: "Media", href: "#", hasDropdown: true },
    { label: "Resources", href: "#", hasDropdown: true },
    { label: "Members", href: "#", hasDropdown: true },
  ];

  return (
    <header className="bg-forum-header border-b border-border">
      <div className="container mx-auto px-4">
        {/* Logo and main nav */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link to="/" aria-label="Home" className="inline-flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/40 flex items-center justify-center cursor-pointer">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-primary" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="4" fill="currentColor"/>
                    <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </svg>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                    item.active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <span className="ml-1 text-xs">▼</span>
                  )}
                </a>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {!isAuthPage && (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/login"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Log in
                </Link>
                <Button size="sm" className="text-sm" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Secondary nav */}
        <div className="flex items-center gap-4 py-2 text-sm">
          <a href="#" className="forum-link">New posts</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Search forums</a>
        </div>
      </div>
    </header>
  );
};

export default ForumHeader;
