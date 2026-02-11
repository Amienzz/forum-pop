import { Lock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForumHeader from "@/components/ForumHeader";
import ForumFooter from "@/components/ForumFooter";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);

    // Real-time field validation
    const errors = { ...fieldErrors };
    
    if (name === "email") {
      if (!value.trim()) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.email = "Please enter a valid email address";
      } else {
        delete errors.email;
      }
    }
    if (name === "password") {
      if (!value) {
        errors.password = "Password is required";
      } else {
        delete errors.password;
      }
    }
    
    setFieldErrors(errors);
  };

  const isFormValid = () => {
    return (
      formData.email.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.password &&
      Object.keys(fieldErrors).length === 0
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only submit if form is valid
    if (!isFormValid()) {
      setError("Please fix all errors before submitting");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        credentials: "include", // Send and receive cookies for JWT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify(result));
        // Redirect to home or dashboard and refresh to load new session
        navigate("/");
        window.location.reload();
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ForumHeader />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="bg-popover border border-border rounded-lg shadow-2xl w-full max-w-md">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Log in</h2>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-destructive/20 border border-destructive/50 rounded text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Email/Username */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Your name or email address:
              </label>
              <Input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`bg-input border-border focus:border-primary ${fieldErrors.email ? "border-destructive" : ""}`}
                placeholder=""
              />
              {fieldErrors.email && (
                <p className="text-xs text-destructive">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-muted-foreground">Password:</label>
                <button 
                  type="button"
                  className="text-xs forum-link"
                >
                  Forgot your password?
                </button>
              </div>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`bg-input border-border focus:border-primary pr-16 ${fieldErrors.password ? "border-destructive" : ""}`}
                  placeholder=""
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-xs text-destructive">{fieldErrors.password}</p>
              )}
            </div>

            {/* Stay logged in */}
            <div className="flex items-center gap-2">
              <Checkbox 
                id="stay-logged"
                checked={stayLoggedIn}
                onCheckedChange={(checked) => setStayLoggedIn(checked as boolean)}
                className="w-4 h-4"
              />
              <label htmlFor="stay-logged" className="text-sm text-muted-foreground cursor-pointer">
                Stay logged in
              </label>
            </div>

            {/* Login button */}
            <Button 
              type="submit"
              disabled={loading || !isFormValid()}
              className="w-full gap-2"
            >
              <Lock className="w-4 h-4" />
              {loading ? "Logging in..." : "Log in"}
            </Button>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-popover px-4 text-muted-foreground">or</span>
              </div>
            </div>

            {/* Social login */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">Log in using:</p>
              <Button variant="outline" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Discord
              </Button>
            </div>

            {/* Register link */}
            <div className="text-center pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="forum-link">
                  Register now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <ForumFooter />
    </div>
  );
};

export default Login;
