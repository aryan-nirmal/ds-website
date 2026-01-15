import { Link } from "react-router-dom";
import { Download, ChevronRight, Clock, Users, BookOpen, Target, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import GoldDivider from "@/components/GoldDivider";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const Courses = () => {
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: true }); // Maintain order

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }
  return (
    <main className="pt-16 md:pt-20 pb-20 lg:pb-0">
      {/* Hero */}
      <section className="section-padding bg-card">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="heading-display text-foreground mb-6">
              OUR <span className="text-accent">PROGRAMS</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Structured training programs designed to prepare you for every aspect of
              defence examinations — from written tests to SSB interviews.
            </p>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Courses */}
      {courses.map((course, index) => (
        <div key={course.id}>
          <section className={`section-padding ${index % 2 === 0 ? '' : 'bg-card'}`}>
            <div className="container mx-auto">
              {/* CMS: Course Data */}
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <span className="text-xs text-accent tracking-wider uppercase">{course.subtitle}</span>
                      <h2 className="heading-section text-foreground mt-1">{course.title}</h2>
                      <div className="w-16 h-1 bg-accent mt-4" />
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {course.description}
                    </p>

                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-accent" />
                        <span className="text-sm">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={18} className="text-accent" />
                        <span className="text-sm">{course.batch_size}</span>
                      </div>
                    </div>

                    {/* Eligibility */}
                    <div className="bg-muted/50 border border-border p-6">
                      <h3 className="font-heading text-lg tracking-wide mb-4 flex items-center gap-2">
                        <Target size={18} className="text-accent" />
                        ELIGIBILITY
                      </h3>
                      <ul className="space-y-2">
                        {course.eligibility.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-accent mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Syllabus */}
                    <div className="bg-muted/50 border border-border p-6">
                      <h3 className="font-heading text-lg tracking-wide mb-4 flex items-center gap-2">
                        <BookOpen size={18} className="text-accent" />
                        SYLLABUS HIGHLIGHTS
                      </h3>
                      <ul className="space-y-2">
                        {course.syllabus.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-accent mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    <div className="bg-muted/50 border border-border p-6">
                      <h4 className="font-heading text-sm tracking-wide mb-4">PROGRAM FEATURES</h4>
                      <ul className="space-y-3">
                        {course.features.map((feature, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-1 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <Button variant="command" className="w-full" asChild>
                        <Link to="/contact">
                          Apply Now
                          <ChevronRight size={16} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {index < courses.length - 1 && <GoldDivider />}
        </div>
      ))}

      <GoldDivider />

      {/* CTA */}
      <section className="section-padding">
        <div className="container mx-auto text-center">
          <h2 className="heading-section text-foreground mb-4">
            READY TO BEGIN YOUR JOURNEY?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get in touch with our admissions team to learn more about our programs
            and find the right course for your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="command" size="lg" asChild>
              <Link to="/admissions">Apply for Admission</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Admissions</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Courses;
