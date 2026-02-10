import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ForumHeader from "@/components/ForumHeader";
import ForumFooter from "@/components/ForumFooter";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user data:", e);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <ForumHeader />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <ForumFooter />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ForumHeader />

      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardHeader>
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <Avatar className="w-32 h-32 [&_img]:object-cover">
                    {user.photo ? (
                      <AvatarImage src={user.photo} alt={user.fname} />
                    ) : (
                      <AvatarFallback className="bg-primary/20 text-primary text-4xl font-semibold">
                        {user.fname?.charAt(0)}{user.lname?.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
                <div className="text-center sm:text-left">
                  <CardTitle className="text-2xl">
                    {user.fname} {user.lname}
                  </CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                  <p className="text-sm text-muted-foreground mt-2 capitalize">
                    Role: {user.role || "User"}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* First Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">First Name</label>
                <Input
                  type="text"
                  value={user.fname}
                  disabled
                  className="bg-muted cursor-not-allowed"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Last Name</label>
                <Input
                  type="text"
                  value={user.lname}
                  disabled
                  className="bg-muted cursor-not-allowed"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <Input
                  type="email"
                  value={user.email}
                  disabled
                  className="bg-muted cursor-not-allowed"
                />
              </div>

              {/* User ID */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">User ID</label>
                <Input
                  type="text"
                  value={user.id}
                  disabled
                  className="bg-muted cursor-not-allowed"
                />
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-4">
                  Profile information is read-only. Contact support to make changes.
                </p>
                <Button variant="outline" onClick={() => navigate("/")}>
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ForumFooter />
    </div>
  );
};

export default Profile;
