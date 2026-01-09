import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Mail, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Student Login:", { email, password });
    // In a real app, backend validation would happen here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointing-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl backdrop-blur-sm">
            <Lock size={28} className="text-accent" />
          </div>
          <h1 className="heading-section text-white mb-2">STUDENT PORTAL</h1>
          <p className="text-neutral-400">Enter your credentials to access the learning management system</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-heading tracking-widest text-neutral-400 mb-2 uppercase">
                Email / Mobile
              </label>
              <div className="relative group">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-accent transition-colors" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 focus:outline-none text-white placeholder:text-neutral-600 rounded-lg transition-all"
                  placeholder="student@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading tracking-widest text-neutral-400 mb-2 uppercase">
                Password
              </label>
              <div className="relative group">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-accent transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 focus:outline-none text-white placeholder:text-neutral-600 rounded-lg transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-neutral-400 hover:text-white transition-colors">
                <input type="checkbox" className="rounded border-white/20 bg-black/50 text-accent focus:ring-accent checked:bg-accent" />
                Remember me
              </label>
              <a href="#" className="text-accent hover:text-accent/80 transition-colors text-xs font-heading tracking-wide">Forgot password?</a>
            </div>

            <Button type="submit" variant="command" className="w-full py-6 rounded-lg shadow-lg hover:shadow-accent/25 transition-all mt-4">
              LOGIN
              <ChevronRight size={18} />
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center text-sm text-neutral-500">
          New Student? <Link to="/admissions" className="text-white hover:text-accent transition-colors font-medium">Apply for Admission</Link>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
