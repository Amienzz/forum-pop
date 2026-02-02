import { X, Lock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-popover border border-border rounded-lg shadow-2xl w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Log in</h2>
          <button
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
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
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
