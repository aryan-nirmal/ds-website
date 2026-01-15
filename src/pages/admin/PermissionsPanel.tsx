import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Search, Loader2, Edit2, Phone, Mail, User as UserIcon } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface Profile {
  id: string;
  full_name: string;
  email: string; // Assuming email is in profile or we join it (but auth email is private, assuming profiles has it sync'd or we just use full_name/phone for now if schema limited. Plan said 'email' was in profile)
  phone: string;
  role: string;
}

const PermissionsPanel = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [newRole, setNewRole] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async () => {
    if (!editingUser) return;
    try {
      setProcessing(true);

      // Perform update and request the updated record back to verify
      const { data, error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', editingUser.id)
        .select();

      if (error) throw error;

      // Check if any row was returned (meaning update actually happened)
      if (!data || data.length === 0) {
        throw new Error("Update failed. You may not have permission to modify this user.");
      }

      setUsers(users.map(u => u.id === editingUser.id ? { ...u, role: newRole } : u));
      toast.success("User role updated successfully");
      setEditingUser(null);
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.message || "Failed to update role");
    } finally {
      setProcessing(false);
    }
  };

  const handleResetPassword = async (email: string) => {
    if (!confirm(`Send password reset email to ${email}?`)) return;
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast.success("Password reset email sent");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const filteredUsers = users.filter(user => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = (user.full_name?.toLowerCase() || "").includes(term) ||
      (user.email?.toLowerCase() || "").includes(term) ||
      (user.phone?.toLowerCase() || "").includes(term);
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading text-white mb-1">User Management</h2>
          <p className="text-neutral-400 text-sm">Manage user roles and permissions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-[#111] p-4 rounded-xl border border-white/5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" size={18} />
          <Input
            placeholder="Search by name, email, or phone..."
            className="pl-10 bg-black/50 border-white/10 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="bg-black/50 border-white/10 text-white">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent className="bg-[#111] border-white/10 text-white">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-white/5">
              <TableHead className="text-white font-heading">User</TableHead>
              <TableHead className="text-white font-heading">Email</TableHead>
              <TableHead className="text-white font-heading">Mobile</TableHead>
              <TableHead className="text-white font-heading">Role</TableHead>
              <TableHead className="text-white font-heading text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-neutral-400">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-neutral-400">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-white/5 hover:bg-white/5">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                        <UserIcon size={14} />
                      </div>
                      <div>
                        <div className="text-white font-medium">{user.full_name || "Unknown"}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-neutral-300">
                      <Mail size={12} className="text-neutral-500" />
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-neutral-300">
                      <Phone size={12} className="text-neutral-500" />
                      {user.phone || "-"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-heading border uppercase ${user.role === 'admin'
                      ? 'bg-red-900/20 text-red-400 border-red-900/30'
                      : 'bg-blue-900/20 text-blue-400 border-blue-900/30'
                      }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleResetPassword(user.email)}
                        className="hover:bg-white/10 text-neutral-400 hover:text-white"
                        title="Reset Password"
                      >
                        <Shield size={16} />
                        <span className="sr-only">Reset Password</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingUser(user);
                          setNewRole(user.role);
                        }}
                        className="hover:bg-white/10 text-neutral-400 hover:text-white"
                        title="Edit Role"
                      >
                        <Edit2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Role Dialog */}
      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent className="bg-[#111] border-white/10 text-white sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Role: {editingUser?.full_name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Select value={newRole} onValueChange={setNewRole}>
              <SelectTrigger className="bg-black/50 border-white/10 text-white w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-white/10 text-white">
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-neutral-500 mt-2">
              Admins have full access. Staff can manage content. Students have read-only access.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditingUser(null)}
              className="border-white/10 text-neutral-300 hover:text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateRole}
              disabled={processing}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {processing ? <Loader2 size={16} className="animate-spin" /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PermissionsPanel;
