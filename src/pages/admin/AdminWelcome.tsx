import { useEffect, useState } from "react";
import { Shield } from "lucide-react";

const AdminWelcome = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const phrase1 = "WELCOME, ";
  const phrase2 = "COMMANDER.";

  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    let index1 = 0;
    let index2 = 0;

    // Typing Phase 1
    const timer1 = setInterval(() => {
      if (index1 <= phrase1.length) {
        setText1(phrase1.slice(0, index1));
        index1++;
      } else {
        clearInterval(timer1);

        // Typing Phase 2 (Starts after Phase 1)
        const timer2 = setInterval(() => {
          if (index2 <= phrase2.length) {
            setText2(phrase2.slice(0, index2));
            index2++;
          } else {
            clearInterval(timer2);
            setTimeout(() => setShowSubtext(true), 500);
          }
        }, 150); // Slightly slower for dramatic effect on "COMMANDER"
      }
    }, 50); // Faster for "WELCOME"

    return () => {
      clearInterval(timer1);
    };
  }, []);

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col items-center justify-center relative overflow-hidden bg-black">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in shadow-2xl shadow-accent/10 overflow-hidden">
          <img src="/logo.jpg" alt="Defence Simplified" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-heading tracking-wider text-white min-h-[60px]">
            {text1}
            <span className="text-accent drop-shadow-[0_0_10px_rgba(215,59,62,0.5)]">
              {text2}
            </span>
            <span className="animate-pulse text-accent ml-1">_</span>
          </h1>

          <p className={`text-neutral-400 text-lg tracking-wide font-mono transition-all duration-1000 transform ${showSubtext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            SYSTEM READY. AWAITING ORDERS.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 transition-all duration-1000 delay-500 transform ${showSubtext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { label: "SYSTEM STATUS", value: "ONLINE", color: "text-green-400" },
            { label: "SECURITY LEVEL", value: "ALPHA", color: "text-accent" },
            { label: "DATA STREAM", value: "SECURE", color: "text-blue-400" },
            { label: "LAST LOGIN", value: "TODAY", color: "text-neutral-200" },
          ].map((stat, i) => (
            <div key={i} className="px-6 py-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-[10px] text-neutral-500 tracking-widest mb-1">{stat.label}</div>
              <div className={`font-mono text-sm ${stat.color} shadow-accent/20`}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminWelcome;
