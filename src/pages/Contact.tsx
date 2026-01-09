import { useState } from "react";
import { MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import GoldDivider from "@/components/GoldDivider";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only - form submission placeholder
    alert("Thank you for your message. We'll respond within 24 hours.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="pt-16 md:pt-20 pb-20 lg:pb-0">
      {/* Hero */}
      <section className="section-padding bg-card">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="heading-display text-foreground mb-6">
              CONTACT <span className="text-accent">US</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Get in touch with our team for admissions, campus visits,
              or any queries about our programs.
            </p>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Contact Info & Form */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <SectionHeading
                title="Get in Touch"
                subtitle="Our doors are always open for aspiring defence officers"
                align="left"
              />

              <div className="space-y-4">
                <div className="bg-card border border-border p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm tracking-wide mb-1">ADDRESS</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Defence Simplified Academy<br />
                      Plot No. 45, Defence Academy Road<br />
                      Sector 12, New Delhi - 110001
                    </p>
                  </div>
                </div>

                <div className="bg-card border border-border p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm tracking-wide mb-1">PHONE</h3>
                    <p className="text-muted-foreground text-sm">
                      Admissions: +91 98765 43210<br />
                      General: +91 11 2345 6789
                    </p>
                  </div>
                </div>

                <div className="bg-card border border-border p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm tracking-wide mb-1">EMAIL</h3>
                    <p className="text-muted-foreground text-sm">
                      Admissions: admissions@defencesimplified.com<br />
                      General: info@defencesimplified.com
                    </p>
                  </div>
                </div>

                <div className="bg-card border border-border p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm tracking-wide mb-1">OFFICE HOURS</h3>
                    <p className="text-muted-foreground text-sm">
                      Monday - Saturday: 8:00 AM - 8:00 PM<br />
                      Sunday: By Appointment Only
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="bg-card border border-border p-6 md:p-8">
                <h3 className="font-heading text-xl tracking-wide mb-6">SEND US A MESSAGE</h3>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-heading tracking-wide mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-muted-foreground"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-heading tracking-wide mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-muted-foreground"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-heading tracking-wide mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-muted-foreground"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-heading tracking-wide mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-muted-foreground"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-heading tracking-wide mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-muted-foreground resize-none"
                      placeholder="Type your message here..."
                    />
                  </div>

                  <Button type="submit" variant="command" size="lg" className="w-full">
                    Send Message
                    <ChevronRight size={18} />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Map Placeholder */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <SectionHeading
            title="Visit Our Campus"
            subtitle="Located in the heart of New Delhi with excellent connectivity"
          />

          {/* Map Integration */}
          <div className="h-[450px] w-full rounded-xl overflow-hidden border border-border shadow-lg relative bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3493.3285143942576!2d75.329298!3d19.8706258!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb99005b6b2979%3A0x6cd128d6e472e1a2!2sDefence%20Simplified!5e1!3m2!1sen!2sin!4v1767809883082!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Schedule Visit CTA */}
      <section className="section-padding">
        <div className="container mx-auto text-center">
          <h2 className="heading-section text-foreground mb-4">
            SCHEDULE A CAMPUS VISIT
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience our facilities first-hand. Book a campus tour and meet our faculty
            to understand how we can help you achieve your defence career goals.
          </p>
          <Button variant="command" size="lg">
            Book Campus Tour
            <ChevronRight size={18} />
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Contact;
