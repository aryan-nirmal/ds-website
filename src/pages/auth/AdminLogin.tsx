import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Lock, User, ChevronRight, ArrowLeft, ShieldAlert, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: username, // Using username as email input for now
        password: password,
      });

      if (error) throw error;

      // AuthProvider will handle redirect if role is correct, 
      // but we can manually force check here or just let the user go
      toast.success("Authentication successful");
      navigate("/admin");
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <div className="w-20 h-20 bg-red-950/50 border border-red-900/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
            <ShieldAlert size={40} className="text-red-500" />
          </div>
          <h1 className="heading-section text-white mb-2">ADMIN LOGIN</h1>
          <p className="text-red-400 font-heading text-sm tracking-wide bg-red-950/30 border border-red-900/30 inline-block px-3 py-1 rounded">
            RESTRICTED ACCESS ONLY
          </p>
        </div>

        <div className="bg-[#0a0a0a] border border-red-900/30 p-8 rounded-xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-heading tracking-wide mb-2 text-white/80">
                Username
              </label>
              <div className="relative">
                <Key size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 focus:border-red-500 focus:outline-none text-white placeholder:text-neutral-600 rounded transition-colors"
                  placeholder="Enter admin username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-heading tracking-wide mb-2 text-white/80">
                Password
              </label>
              <div className="relative">
                <ShieldAlert size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 focus:border-red-500 focus:outline-none text-white placeholder:text-neutral-600 rounded transition-colors"
                  placeholder="Enter highly secure password"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 bg-red-900 hover:bg-red-800 text-white font-heading tracking-widest border border-red-700/50"
            >
              AUTHENTICATE
              <ChevronRight size={18} />
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center text-xs text-neutral-600 font-mono">
          IP Address Logged • Unauthorized access is a punishable offense
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
