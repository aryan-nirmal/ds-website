import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthProvider";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Courses", path: "/courses" },
  { name: "Student Corner", path: "/student-corner" },
  { name: "Hall of Fame", path: "/results" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { user, signOut, isAdmin, profile } = useAuth();
  const isStaff = profile?.role === 'staff';
  const hasAdminAccess = isAdmin || isStaff;
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredRect, setHoveredRect] = useState<{ left: number; width: number; opacity: number }>({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = e.currentTarget.getBoundingClientRect();

    setHoveredRect({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setHoveredRect(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav
          className={`
            transition-all duration-500 ease-in-out
            backdrop-blur-md border border-white/5 shadow-2xl rounded-full
            ${scrolled
              ? "bg-black/90 py-2 sm:py-3 px-6"
              : "bg-black/70 py-3 sm:py-4 px-8"
            }
          `}
        >
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-accent/20 group-hover:border-accent transition-colors bg-black">
                <img src="/logo.jpg" alt="DS Logo" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block">
                <span className="font-heading text-lg tracking-wider text-foreground group-hover:text-white transition-colors">
                  DEFENCE SIMPLIFIED
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Pill Shape Container */}
            <div className="hidden lg:flex items-center relative gap-1" ref={navRef} onMouseLeave={handleMouseLeave}>
              {/* Sliding Background */}
              <div
                className="absolute top-1/2 -translate-y-1/2 bg-white/10 rounded-full transition-all duration-700 pointer-events-none"
                style={{
                  left: hoveredRect.left,
                  width: hoveredRect.width,
                  opacity: hoveredRect.opacity,
                  height: '80%',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={handleMouseEnter}
                  className={`relative px-6 py-2 rounded-full font-heading text-xs tracking-wider uppercase transition-colors z-10 ${location.pathname === link.path ? "text-white font-bold" : "text-neutral-400 hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA & Login */}
            <div className="hidden lg:flex items-center gap-4 ml-auto">
              <div className="h-6 w-px bg-white/10" /> {/* Divider */}

              {user ? (
                <div className="flex items-center gap-4">
                  {hasAdminAccess ? (
                    <Button variant="outline" size="sm" asChild className="border-accent text-accent hover:bg-accent hover:text-white transition-colors">
                      <Link to="/admin">
                        Admin Panel
                      </Link>
                    </Button>
                  ) : (
                    <span className="text-xs font-heading text-white uppercase tracking-wider">
                      Student
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="text-xs font-heading text-neutral-400 hover:text-red-400 transition-colors uppercase tracking-wider hover:bg-transparent"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/login" className="text-xs font-heading text-neutral-400 hover:text-white transition-colors uppercase tracking-wider">
                  Login
                </Link>
              )}

              <Button variant="command" size="sm" asChild className="rounded-full shadow-lg hover:shadow-accent/20 transition-all duration-300">
                <Link to="/contact">Apply Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Button - Pushed to right */}
            <div className="lg:hidden ml-auto">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 text-foreground hover:text-accent transition-colors bg-white/5 rounded-full"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown */}
          {isOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 mt-3 bg-[#0f0f0f] border border-[rgba(255,255,255,0.08)] rounded-3xl p-4 shadow-2xl backdrop-blur-xl animate-fade-in block mx-0">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-full font-heading text-sm tracking-wider uppercase transition-colors ${location.pathname === link.path
                      ? "text-accent bg-white/5"
                      : "text-foreground/80 hover:text-accent hover:bg-white/5"
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-2 mt-2 border-t border-white/10 flex flex-col gap-3">
                  {user ? (
                    <button
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className="block w-full px-4 py-3 text-center rounded-full bg-red-900/10 text-red-400 hover:bg-red-900/20 transition-colors font-heading text-sm tracking-wider uppercase"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="block px-4 py-3 text-center rounded-full bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors font-heading text-sm tracking-wider uppercase"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                  <Button variant="command" className="w-full rounded-full" asChild>
                    <Link to="/contact" onClick={() => setIsOpen(false)}>
                      Apply Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>

    </>
  );
};

export default Navbar;
