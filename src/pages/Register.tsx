import { UserPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { registerUser } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import ForumHeader from "@/components/ForumHeader";
import ForumFooter from "@/components/ForumFooter";
import ProfilePhotoUpload from "@/components/ProfilePhotoUpload";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { terms: false as any },
  });

  const handlePhotoSelect = (file: File | null) => {
    setPhotoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("password", data.password);
      if (photoFile) formData.append("photo", photoFile);

      await registerUser(formData);
      toast({ title: "Account created!", description: "You can now log in." });
      navigate("/login");
    } catch (err: any) {
      toast({ title: "Registration failed", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ForumHeader />

      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="bg-popover border border-border rounded-lg shadow-2xl w-full max-w-md">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Create an account</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <ProfilePhotoUpload preview={photoPreview} onFileSelect={handlePhotoSelect} />

            {/* First Name */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                First name: <span className="text-destructive">*</span>
              </label>
              <Input className="bg-input border-border focus:border-primary" placeholder="Enter your first name" {...register("firstName")} />
              {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Last name: <span className="text-destructive">*</span>
              </label>
              <Input className="bg-input border-border focus:border-primary" placeholder="Enter your last name" {...register("lastName")} />
              {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Email address: <span className="text-destructive">*</span>
              </label>
              <Input type="email" className="bg-input border-border focus:border-primary" placeholder="Enter your email" {...register("email")} />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Phone number: <span className="text-destructive">*</span>
              </label>
              <Input type="tel" className="bg-input border-border focus:border-primary" placeholder="Enter your phone number" {...register("phone")} />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
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
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Checkbox checked={showPassword} onCheckedChange={() => setShowPassword(!showPassword)} className="w-3 h-3" />
                  Show
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
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
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
            </div>

            {/* Terms */}
            <div className="space-y-1">
              <div className="flex items-start gap-2">
                <Controller
                  name="terms"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="terms"
                      className="w-4 h-4 mt-0.5"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  I agree to the <a href="#" className="forum-link">Terms of Service</a> and <a href="#" className="forum-link">Privacy Policy</a>
                </label>
              </div>
              {errors.terms && <p className="text-xs text-destructive">{errors.terms.message}</p>}
            </div>

            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
              Create account
            </Button>

            <div className="text-center pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="forum-link">Log in</Link>
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
