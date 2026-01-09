import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, User, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const StaffLogin = () => {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Staff Login:", { staffId, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointing-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl backdrop-blur-sm">
            <User size={28} className="text-blue-400" />
          </div>
          <h1 className="heading-section text-white mb-2">STAFF ACCESS</h1>
          <p className="text-neutral-400">Restricted area for faculty and administration</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-heading tracking-widest text-neutral-400 mb-2 uppercase">
                Staff ID / Email
              </label>
              <div className="relative group">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 focus:outline-none text-white placeholder:text-neutral-600 rounded-lg transition-all"
                  placeholder="EMP-ID-XXXX"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading tracking-widest text-neutral-400 mb-2 uppercase">
                Password
              </label>
              <div className="relative group">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 focus:outline-none text-white placeholder:text-neutral-600 rounded-lg transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full py-6 rounded-lg shadow-lg bg-blue-600 hover:bg-blue-500 text-white font-heading tracking-wider transition-all mt-4 border border-blue-400/20">
              AUTHENTICATE
              <ChevronRight size={18} className="ml-2" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;
