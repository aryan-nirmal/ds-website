import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Lock, ArrowLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthProvider";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Sign Up Logic
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone: phone
            }
          }
        });

        if (error) throw error;

        if (data.user) {
          // Create Profile
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: data.user.id,
                email: email,
                full_name: fullName,
                phone: phone,
                role: 'student' // Default role
              }
            ]);

          if (profileError) {
            console.error("Profile creation error:", profileError);
            // Note: trigger might handle this, but explicit insert is safer if no trigger exists.
            // If duplicate key error (trigger exists), we ignore or handle gracefully.
          }

          toast.success("Account created! Please log in.");
          setIsSignUp(false); // Switch back to login
        }
      } else {
        // Login Logic
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();

          toast.success("Welcome back!");

          if (profile?.role === 'admin') {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
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
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="heading-section text-white mb-2">{isSignUp ? "CREATE ACCOUNT" : "WELCOME BACK"}</h1>
          <p className="text-neutral-400">{isSignUp ? "Join Defence Simplified today" : "Sign in to your account"}</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleAuth} className="space-y-5">
            {isSignUp && (
              <>
                <div>
                  <label className="block text-xs font-heading tracking-widest text-neutral-400 mb-2 uppercase">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 focus:border-accent/50 focus:outline-none text-white rounded-lg"
                    placeholder="Cadet Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading tracking-widest text-neutral-400 mb-2 uppercase">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 focus:border-accent/50 focus:outline-none text-white rounded-lg"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-heading tracking-widest text-neutral-400 mb-2 uppercase">
                Email
              </label>
              <div className="relative group">
                <Shield size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-accent transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 focus:outline-none text-white placeholder:text-neutral-600 rounded-lg transition-all"
                  placeholder="name@example.com"
                  required
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="command"
              className="w-full py-6 rounded-lg shadow-lg hover:shadow-accent/25 transition-all mt-4"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <>{isSignUp ? "SIGN UP" : "LOGIN"} <ChevronRight size={18} /></>}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-neutral-400 hover:text-white transition-colors underline decoration-dotted"
            >
              {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
