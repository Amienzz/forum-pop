import { Lock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Link } from "react-router-dom";
import ForumHeader from "@/components/ForumHeader";
import ForumFooter from "@/components/ForumFooter";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

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
          <div className="p-6 space-y-4">
            {/* Email/Username */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Your name or email address:
              </label>
              <Input 
                type="text" 
                className="bg-input border-border focus:border-primary"
                placeholder=""
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-muted-foreground">Password:</label>
                <button className="text-xs forum-link">
                  Forgot your password?
                </button>
              </div>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"}
                  className="bg-input border-border focus:border-primary pr-16"
                  placeholder=""
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Checkbox 
                    checked={showPassword}
                    onCheckedChange={() => setShowPassword(!showPassword)}
                    className="w-3 h-3"
                  />
                  Show
                </button>
              </div>
            </div>

            {/* Stay logged in */}
            <div className="flex items-center gap-2">
              <Checkbox id="stay-logged" className="w-4 h-4" />
              <label htmlFor="stay-logged" className="text-sm text-muted-foreground cursor-pointer">
                Stay logged in
              </label>
            </div>

            {/* Login button */}
            <Button className="w-full gap-2">
              <Lock className="w-4 h-4" />
              Log in
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
          </div>
        </div>
      </div>

      <ForumFooter />
    </div>
  );
};

export default Login;
