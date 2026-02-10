import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchAdminDashboard, type AdminDashboardData } from "@/lib/api";

const AdminDashboard = () => {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminDashboard()
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (raw: string) => {
    try {
      const d = new Date(raw);
      return Number.isNaN(d.getTime()) ? raw : d.toLocaleDateString(undefined, { dateStyle: "short" });
    } catch {
      return raw;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Lovable – Admin Management</h1>
        <p className="text-muted-foreground">Loading dashboard…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Lovable – Admin Management</h1>
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  const stats = data?.stats ?? { totalUsers: 0, adminCount: 0, userCount: 0 };
  const recentUsers = data?.recentUsers ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Lovable – Admin Management</h1>
        <p className="text-muted-foreground mt-1">
          {data?.message ?? "Manage your site from here. Admin only."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total users</CardTitle>
            <CardDescription>Registered accounts in the database</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{stats.totalUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Administrators</CardTitle>
            <CardDescription>Users with admin role</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{stats.adminCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Regular users</CardTitle>
            <CardDescription>Users with user role</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{stats.userCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent registrations</CardTitle>
              <CardDescription>Latest 5 users from MySQL</CardDescription>
            </div>
            <Link to="/admin/users" className="text-sm font-medium text-primary hover:underline">
              View all users →
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentUsers.length === 0 ? (
            <p className="text-sm text-muted-foreground">No users yet.</p>
          ) : (
            <ul className="space-y-2">
              {recentUsers.map((u) => (
                <li
                  key={u.id}
                  className="flex items-center justify-between text-sm border-b border-border pb-2 last:border-0 last:pb-0"
                >
                  <span className="font-medium">{u.first_name} {u.last_name}</span>
                  <span className="text-muted-foreground">{u.email}</span>
                  <Badge variant={u.role === "admin" ? "default" : "secondary"}>{u.role}</Badge>
                  <span className="text-muted-foreground">{formatDate(u.created_at)}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
