import { Link } from "react-router-dom";
import { Download, ChevronRight, Clock, Users, BookOpen, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import GoldDivider from "@/components/GoldDivider";

const courses = [
  {
    id: "spi",
    title: "SPI Foundation",
    subtitle: "Sainik School Entrance Preparation",
    description: "A comprehensive program designed for students aspiring to join Sainik Schools across India. This foundation course builds strong academic fundamentals while developing the personality traits essential for a career in defence.",
    duration: "12 Months",
    batchSize: "30 Students",
    eligibility: [
      "Students in Class 5 (for Class 6 entry)",
      "Students in Class 8 (for Class 9 entry)",
      "Age as per Sainik School norms",
      "Basic proficiency in English and Mathematics"
    ],
    syllabus: [
      "Mathematics - Arithmetic, Algebra, Geometry",
      "English - Grammar, Comprehension, Writing",
      "General Knowledge - Current Affairs, Static GK",
      "Intelligence & Reasoning",
      "Personality Development Sessions"
    ],
    features: [
      "Weekly mock tests",
      "Individual progress tracking",
      "Parent counseling sessions",
      "Physical fitness activities"
    ]
  },
  {
    id: "nda",
    title: "NDA Core",
    subtitle: "National Defence Academy Preparation",
    description: "Intensive training program for students appearing in the NDA examination. This comprehensive course covers written examination preparation, physical fitness, and SSB interview coaching to ensure complete readiness.",
    duration: "18 Months",
    batchSize: "40 Students",
    eligibility: [
      "12th Pass or appearing (Science/Commerce/Arts)",
      "Age: 16.5 to 19.5 years",
      "Unmarried male/female candidates",
      "Physically fit as per NDA standards"
    ],
    syllabus: [
      "Mathematics - Advanced topics for Paper I",
      "General Ability Test - English, GK, Physics, Chemistry",
      "SSB Interview Preparation",
      "Physical Fitness & Endurance Training",
      "Group Discussion & Lecturette"
    ],
    features: [
      "Full-length mock NDA tests",
      "SSB screening simulation",
      "Physical training 5 days/week",
      "Mentorship from ex-servicemen"
    ]
  },
  {
    id: "cds",
    title: "CDS Graduate Wing",
    subtitle: "Combined Defence Services Preparation",
    description: "Specialized coaching for graduates aspiring to join the Indian Armed Forces through the CDS examination. The program is tailored for working professionals and final-year students with flexible batch timings.",
    duration: "12 Months",
    batchSize: "35 Students",
    eligibility: [
      "Graduate from recognized university",
      "Age: 19 to 25 years (varies by entry)",
      "Unmarried candidates",
      "Physically & mentally fit"
    ],
    syllabus: [
      "English - Vocabulary, Grammar, Comprehension",
      "General Knowledge - Current Affairs, History, Geography",
      "Elementary Mathematics",
      "SSB Interview Training",
      "Psychological Tests Preparation"
    ],
    features: [
      "Weekend batches available",
      "Online doubt clearing sessions",
      "Current affairs daily updates",
      "Mock SSB interviews"
    ]
  }
];

const Courses = () => {
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
                        <span className="text-sm">{course.batchSize}</span>
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
                      <Button variant="outline" className="w-full" asChild>
                        <a href="#" onClick={(e) => e.preventDefault()}>
                          <Download size={16} />
                          Download Syllabus
                        </a>
                      </Button>
                      <Button variant="command" className="w-full" asChild>
                        <Link to="/admissions">
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
