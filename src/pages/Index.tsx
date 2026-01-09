import { Link } from "react-router-dom";
import { Shield, Target, Users, Award, BookOpen, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import GoldDivider from "@/components/GoldDivider";

const Index = () => {
  return (
    <main className="pt-16 md:pt-20 pb-20 lg:pb-0">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-light/70 to-background z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595760780346-f972eb49f094?q=80&w=2515&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay z-0" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10 text-center">
          <div className="animate-fade-in-up">
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 border border-border rounded mb-8">
              <Shield size={18} className="text-accent" />
              <span className="text-sm text-muted-foreground tracking-wide">PREMIER DEFENCE PREPARATION INSTITUTE</span>
            </div> */ }
            <div className="mb-16"></div>

            <h1 className="heading-display text-foreground mb-6 leading-tight">
              DISCIPLINE.<br />
              <span className="text-accent">STRATEGY.</span><br />
              SELECTION.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Elite preparation for SPI, NDA & CDS aspirants committed to serving the nation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="command" size="lg" asChild>
                <Link to="/admissions">
                  Apply for Admission
                  <ChevronRight size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/courses">View Courses</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      </section>

      <GoldDivider />

      {/* Why Defence Simplified */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading
            title="Why Defence Simplified"
            subtitle="Built on the principles of military excellence and disciplined training"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: Target,
                title: "Mission-Focused",
                description: "Every lesson, drill, and assessment is designed with one objective: your selection."
              },
              {
                icon: Users,
                title: "Expert Faculty",
                description: "Learn from ex-servicemen and selection board veterans who know the system inside out."
              },
              {
                icon: Award,
                title: "Proven Results",
                description: "Consistently high selection rates across SPI, NDA, and CDS examinations."
              },
              {
                icon: BookOpen,
                title: "Comprehensive Prep",
                description: "Complete coverage of written exams, physical fitness, and SSB interviews."
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group p-6 bg-card border border-border hover:border-accent/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-muted flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                  <item.icon size={24} className="text-accent" />
                </div>
                <h3 className="font-heading text-lg tracking-wide mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Courses Overview */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <SectionHeading
            title="Our Programs"
            subtitle="Structured training programs designed for each defence examination"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "SPI Foundation",
                subtitle: "Sainik School Entrance",
                description: "Comprehensive preparation for Sainik School entrance examinations with focus on academics and personality development.",
                duration: "12 Months"
              },
              {
                title: "NDA Core",
                subtitle: "National Defence Academy",
                description: "Intensive training for NDA written examination and SSB interview with physical fitness programs.",
                duration: "18 Months"
              },
              {
                title: "CDS Graduate Wing",
                subtitle: "Combined Defence Services",
                description: "Specialized coaching for graduates aspiring to join the Indian Armed Forces through CDS examination.",
                duration: "12 Months"
              }
            ].map((course, index) => (
              <div
                key={index}
                className="group bg-background border border-border hover:border-accent/50 transition-all duration-300 overflow-hidden"
              >
                <div className="h-2 bg-gradient-to-r from-accent/50 via-accent to-accent/50" />
                <div className="p-6">
                  <span className="text-xs text-accent tracking-wider uppercase">{course.subtitle}</span>
                  <h3 className="font-heading text-xl tracking-wide mt-1 mb-3">{course.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{course.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">Duration: {course.duration}</span>
                    <Button variant="link" size="sm" className="p-0" asChild>
                      <Link to="/courses">Learn More →</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Hall of Fame Preview */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading
            title="Hall of Fame"
            subtitle="Our cadets who have earned their place in the defence services"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              { name: "Cadet Arjun Singh", rank: "AIR 23", exam: "NDA 2024", branch: "Indian Army" },
              { name: "Cadet Priya Sharma", rank: "AIR 45", exam: "CDS 2024", branch: "Indian Air Force" },
              { name: "Cadet Vikram Reddy", rank: "AIR 12", exam: "NDA 2023", branch: "Indian Navy" },
              { name: "Cadet Ananya Patel", rank: "AIR 8", exam: "CDS 2023", branch: "Indian Army" },
            ].map((student, index) => (
              <div
                key={index}
                className="group bg-card border border-border p-4 hover:border-accent/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-muted mx-auto mb-3 flex items-center justify-center">
                  <Star size={24} className="text-accent" />
                </div>
                <div className="text-center">
                  <span className="inline-block px-2 py-1 text-xs font-heading bg-accent text-accent-foreground mb-2">
                    {student.rank}
                  </span>
                  <h4 className="font-heading text-sm tracking-wide mb-1">{student.name}</h4>
                  <p className="text-xs text-muted-foreground">{student.exam}</p>
                  <p className="text-xs text-accent mt-1">{student.branch}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/results">View All Achievers</Link>
            </Button>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Magazine Preview */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <SectionHeading
            title="Defence Digest"
            subtitle="Stay updated with our monthly magazine covering defence news and exam strategies"
          />

          {/* CMS: Magazine */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "January 2024 Edition", topic: "NDA Preparation Strategy" },
              { title: "December 2023 Edition", topic: "SSB Interview Insights" },
              { title: "November 2023 Edition", topic: "Physical Fitness Guide" },
            ].map((magazine, index) => (
              <div
                key={index}
                className="bg-background border border-border p-6 hover:border-accent/50 transition-all duration-300"
              >
                <div className="aspect-[3/4] bg-muted mb-4 flex items-center justify-center">
                  <BookOpen size={48} className="text-muted-foreground" />
                </div>
                <h4 className="font-heading text-sm tracking-wide mb-1">{magazine.title}</h4>
                <p className="text-xs text-muted-foreground">{magazine.topic}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/student-corner">Browse Magazine Archive</Link>
            </Button>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Final CTA */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-section text-foreground mb-4">
              YOUR MISSION BEGINS HERE
            </h2>
            <p className="text-muted-foreground mb-8">
              Take the first step towards serving your nation. Apply for admission to Defence Simplified
              and begin your journey to becoming a defence officer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="command" size="lg" asChild>
                <Link to="/admissions">
                  Start Your Application
                  <ChevronRight size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
