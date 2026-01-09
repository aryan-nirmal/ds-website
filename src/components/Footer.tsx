import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                <img src="/logo.jpg" alt="DS Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-heading text-lg tracking-wider">DEFENCE SIMPLIFIED</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Elite preparation for aspirants committed to serving the nation through SPI, NDA & CDS.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-accent text-sm tracking-wider mb-4">QUICK LINKS</h4>
            <ul className="space-y-2">
              {[
                { name: "About Us", path: "/about" },
                { name: "Courses", path: "/courses" },
                { name: "Admissions", path: "/admissions" },
                { name: "Hall of Fame", path: "/results" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-heading text-accent text-sm tracking-wider mb-4">PROGRAMS</h4>
            <ul className="space-y-2">
              {["SPI Foundation", "NDA Core", "CDS Graduate Wing", "SSB Interview Prep"].map((program) => (
                <li key={program}>
                  <Link
                    to="/courses"
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {program}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-accent text-sm tracking-wider mb-4">CONTACT</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                <span>Defence Academy Road, Sector 12, New Delhi - 110001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone size={16} className="text-accent shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={16} className="text-accent shrink-0" />
                <span>info@defencesimplified.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock size={16} className="text-accent shrink-0" />
                <span>Mon - Sat: 8:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="gold-divider mt-10 mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Defence Simplified. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
