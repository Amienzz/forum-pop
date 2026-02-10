import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRef } from "react";

interface ProfilePhotoUploadProps {
  preview: string | null;
  onFileSelect: (file: File | null) => void;
  error?: string;
}

const ProfilePhotoUpload = ({ preview, onFileSelect, error }: ProfilePhotoUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onFileSelect(file);
  };

  const handleRemove = () => {
    onFileSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="text-sm text-muted-foreground">Profile photo:</label>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="w-20 h-20 border-2 border-border">
            {preview ? (
              <AvatarImage src={preview} alt="Profile" />
            ) : (
              <AvatarFallback className="bg-muted text-muted-foreground">
                <Upload className="w-6 h-6" />
              </AvatarFallback>
            )}
          </Avatar>
          {preview && (
            <button
              type="button"
              onClick={handleRemove}
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
            accept="image/jpeg,image/png"
            onChange={handleChange}
            className="hidden"
            id="profile-photo"
          />
          <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-2">
            <Upload className="w-4 h-4" />
            Upload photo
          </Button>
          <p className="text-xs text-muted-foreground mt-1">JPG or PNG. Max 2MB.</p>
          {error && <p className="text-xs text-destructive mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;
