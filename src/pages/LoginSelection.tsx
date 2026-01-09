import { Link } from "react-router-dom";
import { User, Shield, Lock, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const LoginSelection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-4xl relative z-10">
        <div className="mb-12 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <h1 className="heading-display text-white mb-4">WELCOME BACK</h1>
          <p className="text-neutral-400 text-lg">Select your portal to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Student */}
          <Link to="/login/student" className="group bg-white/5 border border-white/10 hover:border-accent/50 p-8 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10">
            <div className="w-16 h-16 bg-blue-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-900/30 transition-colors">
              <User size={32} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-heading text-white mb-2 tracking-wide">STUDENT</h3>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">Access learning materials, results, and track your progress.</p>
            <div className="flex items-center text-blue-400 text-sm font-medium">
              Login as Student <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Staff */}
          <Link to="/login/staff" className="group bg-white/5 border border-white/10 hover:border-accent/50 p-8 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10">
            <div className="w-16 h-16 bg-green-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-900/30 transition-colors">
              <Lock size={32} className="text-green-400" />
            </div>
            <h3 className="text-xl font-heading text-white mb-2 tracking-wide">STAFF</h3>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">Manage attendance, schedule classes, and update records.</p>
            <div className="flex items-center text-green-400 text-sm font-medium">
              Login as Staff <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Admin */}
          <Link to="/login/admin" className="group bg-white/5 border border-white/10 hover:border-accent/50 p-8 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10">
            <div className="w-16 h-16 bg-red-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-900/30 transition-colors">
              <Shield size={32} className="text-red-500" />
            </div>
            <h3 className="text-xl font-heading text-white mb-2 tracking-wide">ADMIN</h3>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">System administration, content management, and settings.</p>
            <div className="flex items-center text-red-500 text-sm font-medium">
              Login as Admin <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection;
