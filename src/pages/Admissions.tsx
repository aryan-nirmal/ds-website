import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, AlertCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import GoldDivider from "@/components/GoldDivider";

const eligibilityCriteria = [
  {
    program: "SPI Foundation",
    criteria: [
      "Students in Class 5 (for Class 6 entry) or Class 8 (for Class 9 entry)",
      "Age as per Sainik School admission norms",
      "Indian nationality",
      "Basic proficiency in English and Mathematics"
    ]
  },
  {
    program: "NDA Core",
    criteria: [
      "12th Pass or appearing (any stream)",
      "Age: 16.5 to 19.5 years",
      "Unmarried male/female candidates",
      "Physically fit as per NDA medical standards"
    ]
  },
  {
    program: "CDS Graduate Wing",
    criteria: [
      "Graduate from a recognized university",
      "Age: 19 to 25 years (varies by entry type)",
      "Unmarried candidates",
      "Physically and mentally fit"
    ]
  }
];

const feeStructure = [
  { program: "SPI Foundation (12 Months)", tuition: "₹1,20,000", hostel: "₹60,000", total: "₹1,80,000" },
  { program: "NDA Core (18 Months)", tuition: "₹1,80,000", hostel: "₹90,000", total: "₹2,70,000" },
  { program: "CDS Graduate Wing (12 Months)", tuition: "₹1,50,000", hostel: "₹60,000", total: "₹2,10,000" },
];

const Admissions = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    qualification: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only - form submission placeholder
    alert("Thank you for your inquiry. Our admissions team will contact you shortly.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="pt-16 md:pt-20 pb-20 lg:pb-0">
      {/* Hero */}
      <section className="section-padding bg-card">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="heading-display text-foreground mb-6">
              <span className="text-accent">ADMISSIONS</span> 2024
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Begin your journey towards a career in the Indian Armed Forces.
              Applications are now open for all programs.
            </p>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Eligibility */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading
            title="Eligibility Criteria"
            subtitle="Requirements for admission to each program"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eligibilityCriteria.map((item, index) => (
              <div
                key={index}
                className="bg-card border border-border p-6 hover:border-accent/50 transition-colors"
              >
                <h3 className="font-heading text-lg tracking-wide mb-4 pb-4 border-b border-border">
                  {item.program}
                </h3>
                <ul className="space-y-3">
                  {item.criteria.map((criterion, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle size={16} className="text-accent mt-0.5 shrink-0" />
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Inquiry Form */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading
            title="Admission Inquiry"
            subtitle="Fill in your details and we'll get back to you within 24 hours"
          />

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-card border border-border p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-heading tracking-wide mb-2">
                    Full Name *
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

                <div>
                  <label className="block text-sm font-heading tracking-wide mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-muted-foreground"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

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
                    Program of Interest *
                  </label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none text-foreground"
                  >
                    <option value="">Select a program</option>
                    <option value="spi">SPI Foundation</option>
                    <option value="nda">NDA Core</option>
                    <option value="cds">CDS Graduate Wing</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-heading tracking-wide mb-2">
                    Current Qualification
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-muted-foreground"
                    placeholder="e.g., Class 12 Science, B.Com Graduate"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-heading tracking-wide mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-muted-foreground resize-none"
                    placeholder="Any specific queries or information you'd like to share..."
                  />
                </div>
              </div>

              <div className="mt-8">
                <Button type="submit" variant="command" size="lg" className="w-full">
                  Submit Inquiry
                  <ChevronRight size={18} />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Contact CTA */}
      <section className="section-padding bg-card">
        <div className="container mx-auto text-center">
          <h2 className="heading-section text-foreground mb-4">
            NEED MORE INFORMATION?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Visit our campus for a personal counseling session or contact our admissions office directly.
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link to="/contact">Contact Admissions Office</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Admissions;
