import { UserPlus, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForumHeader from "@/components/ForumHeader";
import ForumFooter from "@/components/ForumFooter";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Register = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [showPassword, setShowPassword] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [photoError, setPhotoError] = useState<string>("Profile photo is required");

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setProfilePhoto(null);
    setPhotoFile(null);
    setPhotoError("Profile photo is required");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let finalValue = value;

    // For phone field, only allow numbers and + symbol
    if (name === "phone") {
      finalValue = value.replace(/[^\d+]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
    setError(null);
    
    // Real-time field validation
    const errors = { ...fieldErrors };
    
    if (name === "firstName") {
      if (!value.trim()) {
        errors.firstName = "First name is required";
      } else {
        delete errors.firstName;
      }
    }
    if (name === "lastName") {
      if (!value.trim()) {
        errors.lastName = "Last name is required";
      } else {
        delete errors.lastName;
      }
    }
    if (name === "email") {
      if (!value.trim()) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.email = "Please enter a valid email address";
      } else {
        delete errors.email;
      }
    }
    if (name === "phone") {
      if (!finalValue.trim()) {
        errors.phone = "Phone number is required";
      } else if (finalValue.trim().length < 11) {
        errors.phone = "Phone number must be at least 11 characters";
      } else {
        delete errors.phone;
      }
    }
    if (name === "password") {
      if (!value) {
        errors.password = "Password is required";
      } else if (value.length < 8) {
        errors.password = "Password must be at least 8 characters";
      } else {
        delete errors.password;
      }
      // Also validate confirmPassword if it's filled
      if (formData.confirmPassword && value !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      } else if (formData.confirmPassword && value === formData.confirmPassword) {
        delete errors.confirmPassword;
      }
    }
    if (name === "confirmPassword") {
      if (!value) {
        errors.confirmPassword = "Confirm password is required";
      } else if (value !== formData.password) {
        errors.confirmPassword = "Passwords do not match";
      } else {
        delete errors.confirmPassword;
      }
    }
    
    setFieldErrors(errors);
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.phone.trim() &&
      formData.phone.trim().length >= 11 &&
      formData.password &&
      formData.password.length >= 8 &&
      formData.password === formData.confirmPassword &&
      agreeTerms &&
      photoFile &&
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
      // Create FormData for file upload
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("password", formData.password);
      if (photoFile) {
        data.append("photo", photoFile);
      }

      const res = await fetch("/api/register", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        // Success - redirect to login
        navigate("/login", { state: { message: "Account created! Please log in." } });
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred during registration. Please try again.");
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
            <h2 className="text-lg font-semibold text-foreground">Create an account</h2>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-destructive/20 border border-destructive/50 rounded text-destructive text-sm">
                {error}
              </div>
            )}
            {/* Profile Photo */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Profile photo: <span className="text-destructive">*</span>
              </label>
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
                    JPG or PNG. Max 2MB.
                  </p>
                </div>
              </div>
              {photoError && (
                <p className="text-xs text-destructive">{photoError}</p>
              )}
              {photoFile && !photoError && (
                <p className="text-xs text-green-600">✓ Photo uploaded</p>
              )}
            </div>

            {/* First Name */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                First name: <span className="text-destructive">*</span>
              </label>
              <Input 
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`bg-input border-border focus:border-primary ${fieldErrors.firstName ? "border-destructive" : ""}`}
                placeholder="Enter your first name"
              />
              {fieldErrors.firstName && (
                <p className="text-xs text-destructive">{fieldErrors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Last name: <span className="text-destructive">*</span>
              </label>
              <Input 
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`bg-input border-border focus:border-primary ${fieldErrors.lastName ? "border-destructive" : ""}`}
                placeholder="Enter your last name"
              />
              {fieldErrors.lastName && (
                <p className="text-xs text-destructive">{fieldErrors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Email address: <span className="text-destructive">*</span>
              </label>
              <Input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`bg-input border-border focus:border-primary ${fieldErrors.email ? "border-destructive" : ""}`}
                placeholder="Enter your email"
              />
              {fieldErrors.email && (
                <p className="text-xs text-destructive">{fieldErrors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Phone number: <span className="text-destructive">*</span>
              </label>
              <Input 
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                inputMode="numeric"
                className={`bg-input border-border focus:border-primary ${fieldErrors.phone ? "border-destructive" : ""}`}
                placeholder="Enter your phone number"
              />
              {fieldErrors.phone && (
                <p className="text-xs text-destructive">{fieldErrors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Password: <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`bg-input border-border focus:border-primary pr-16 ${fieldErrors.password ? "border-destructive" : ""}`}
                  placeholder="Create a password"
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
              {!fieldErrors.password && formData.password && (
                <p className="text-xs text-muted-foreground">
                  ✓ Password is valid
                </p>
              )}
              {!formData.password && (
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Confirm password: <span className="text-destructive">*</span>
              </label>
              <Input 
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`bg-input border-border focus:border-primary ${fieldErrors.confirmPassword ? "border-destructive" : ""}`}
                placeholder="Confirm your password"
              />
              {fieldErrors.confirmPassword && (
                <p className="text-xs text-destructive">{fieldErrors.confirmPassword}</p>
              )}
              {!fieldErrors.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="text-xs text-green-600">✓ Passwords match</p>
              )}
            </div>

            {/* Terms */}
            <div className="space-y-1">
              <div className="flex items-start gap-2">
                <Checkbox 
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  className={`w-4 h-4 mt-0.5 ${!agreeTerms && Object.keys(fieldErrors).length > 0 ? "border-destructive" : ""}`}
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  I agree to the{" "}
                  <a href="#" className="forum-link">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="forum-link">Privacy Policy</a>
                </label>
              </div>
              {!agreeTerms && (
                <p className="text-xs text-destructive pl-6">Required to create account</p>
              )}
            </div>

            {/* Register button */}
            <Button 
              type="submit"
              disabled={loading || !isFormValid()}
              className="w-full gap-2"
            >
              <UserPlus className="w-4 h-4" />
              {loading ? "Creating account..." : "Create account"}
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
          </form>
        </div>
      </div>

      <ForumFooter />
    </div>
  );
};

export default Register;
