import { UserPlus, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import ForumHeader from "@/components/ForumHeader";
import ForumFooter from "@/components/ForumFooter";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setProfilePhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ForumHeader />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="bg-popover border border-border rounded-lg shadow-2xl w-full max-w-md">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Create an account</h2>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Profile Photo */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Profile photo:</label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="w-20 h-20 border-2 border-border">
                    {profilePhoto ? (
                      <AvatarImage src={profilePhoto} alt="Profile" />
                    ) : (
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        <Upload className="w-6 h-6" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  {profilePhoto && (
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/80 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="profile-photo"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Full name: <span className="text-destructive">*</span>
              </label>
              <Input 
                type="text" 
                className="bg-input border-border focus:border-primary"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Email address: <span className="text-destructive">*</span>
              </label>
              <Input 
                type="email" 
                className="bg-input border-border focus:border-primary"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Phone number: <span className="text-destructive">*</span>
              </label>
              <Input 
                type="tel" 
                className="bg-input border-border focus:border-primary"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Password: <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"}
                  className="bg-input border-border focus:border-primary pr-16"
                  placeholder="Create a password"
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
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Confirm password: <span className="text-destructive">*</span>
              </label>
              <Input 
                type={showPassword ? "text" : "password"}
                className="bg-input border-border focus:border-primary"
                placeholder="Confirm your password"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <Checkbox id="terms" className="w-4 h-4 mt-0.5" />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                I agree to the{" "}
                <a href="#" className="forum-link">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="forum-link">Privacy Policy</a>
              </label>
            </div>

            {/* Register button */}
            <Button className="w-full gap-2">
              <UserPlus className="w-4 h-4" />
              Create account
            </Button>

            {/* Login link */}
            <div className="text-center pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="forum-link">
                  Log in
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

export default Register;
