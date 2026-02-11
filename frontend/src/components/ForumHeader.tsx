import { Search, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ForumHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const [user, setUser] = useState<any>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }

    // Listen for storage changes (logout from other tabs)
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Close dropdown when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-profile-menu]')) {
        setShowProfileMenu(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("click", handleClickOutside);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Call backend to clear HttpOnly cookie
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include", // Send cookies to be cleared
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local user data regardless of API call result
      localStorage.removeItem("user");
      setUser(null);
      setShowProfileMenu(false);
      navigate("/");
      // Refresh page to clear any cached authentication state
      window.location.reload();
    }
  };

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
            {!isAuthPage && !user && (
              <>
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
            {user && (
              <div className="relative" data-profile-menu>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <Avatar className="w-8 h-8 [&_img]:object-cover">
                    {user.photo ? (
                      <AvatarImage src={user.photo} alt={user.fname} />
                    ) : (
                      <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                        {user.fname?.charAt(0)}{user.lname?.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="hidden sm:block text-sm text-foreground font-medium">
                    {user.fname}
                  </div>
                  <span className="text-xs">▼</span>
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-50">
                    <div className="py-2 px-4 border-b border-border">
                      <p className="text-sm font-semibold text-foreground">
                        {user.fname} {user.lname}
                      </p>
                      <p className="text-xs text-muted-foreground">{user.email || "No email"}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors flex items-center gap-2"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </button>
                      {user.role === "admin" && (
                        <button
                          onClick={() => {
                            navigate("/admin");
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors"
                        >
                          Admin Panel
                        </button>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2 border-t border-border mt-1 pt-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
