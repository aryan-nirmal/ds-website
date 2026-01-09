import { Star, Award, TrendingUp, Medal } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import GoldDivider from "@/components/GoldDivider";

const achievers = [
  {
    name: "Cadet Arjun Singh",
    rank: "AIR 23",
    exam: "NDA I 2024",
    branch: "Indian Army",
    story: "A determined aspirant who cleared NDA in his first attempt after 18 months of rigorous preparation at Defence Simplified."
  },
  {
    name: "Cadet Priya Sharma",
    rank: "AIR 45",
    exam: "CDS I 2024",
    branch: "Indian Air Force",
    story: "Despite coming from a non-military background, Priya's dedication and our structured training helped her achieve her dream."
  },
  {
    name: "Cadet Vikram Reddy",
    rank: "AIR 12",
    exam: "NDA II 2023",
    branch: "Indian Navy",
    story: "Vikram's exceptional performance in both written and SSB is a testament to our comprehensive preparation approach."
  },
  {
    name: "Cadet Ananya Patel",
    rank: "AIR 8",
    exam: "CDS II 2023",
    branch: "Indian Army",
    story: "Balancing her graduation with defence preparation, Ananya emerged as one of our top performers in CDS."
  },
  {
    name: "Cadet Rohan Mehta",
    rank: "AIR 56",
    exam: "NDA I 2023",
    branch: "Indian Air Force",
    story: "After improving his physical fitness scores significantly, Rohan successfully cleared NDA on his second attempt."
  },
  {
    name: "Cadet Kavya Krishnan",
    rank: "AIR 31",
    exam: "CDS I 2023",
    branch: "Indian Navy",
    story: "Our SSB interview coaching played a crucial role in Kavya's success, as she excelled in all interview stages."
  },
  {
    name: "Cadet Aditya Verma",
    rank: "Selected",
    exam: "Sainik School 2023",
    branch: "Korukonda",
    story: "One of our youngest success stories, Aditya's selection to Sainik School marks the beginning of his defence journey."
  },
  {
    name: "Cadet Shreya Das",
    rank: "AIR 67",
    exam: "NDA II 2023",
    branch: "Indian Army",
    story: "Shreya's journey from a small town to NDA selection inspires many aspirants at our institute."
  },
];

const stats = [
  { number: "450+", label: "Officers Produced" },
  { number: "85%", label: "Selection Rate" },
  { number: "50+", label: "Top 100 Ranks" },
  { number: "12", label: "Years of Excellence" },
];

const Results = () => {
  return (
    <main className="pt-16 md:pt-20 pb-20 lg:pb-0">
      {/* Hero */}
      <section className="section-padding bg-card">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="heading-display text-foreground mb-6">
              HALL OF <span className="text-accent">FAME</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Celebrating our cadets who have earned their place in the Indian Armed Forces
              through dedication, discipline, and unwavering commitment.
            </p>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Stats */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-card border border-border"
              >
                <div className="text-4xl md:text-5xl font-heading text-accent mb-2">
                  {stat.number}
                </div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Achievers Grid */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <SectionHeading
            title="Recent Achievers"
            subtitle="Our cadets who have successfully cleared defence examinations"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievers.map((student, index) => (
              <div
                key={index}
                className="group bg-background border border-border hover:border-accent/50 transition-all duration-300 overflow-hidden"
              >
                <div className="h-1 bg-gradient-to-r from-accent/50 via-accent to-accent/50" />
                <div className="p-6">
                  <div className="w-20 h-20 bg-muted mx-auto mb-4 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                    <Star size={32} className="text-accent" />
                  </div>
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 text-xs font-heading bg-accent text-accent-foreground mb-3">
                      {student.rank}
                    </span>
                    <h4 className="font-heading text-lg tracking-wide mb-1">{student.name}</h4>
                    <p className="text-sm text-muted-foreground">{student.exam}</p>
                    <p className="text-sm text-accent mt-1">{student.branch}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Success Stories */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading
            title="Success Stories"
            subtitle="Inspiring journeys of determination and achievement"
          />

          <div className="space-y-6 max-w-4xl mx-auto">
            {achievers.slice(0, 4).map((student, index) => (
              <div
                key={index}
                className="bg-card border border-border p-6 md:p-8 hover:border-accent/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-20 h-20 bg-muted shrink-0 flex items-center justify-center">
                    <Award size={32} className="text-accent" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h4 className="font-heading text-lg tracking-wide">{student.name}</h4>
                      <span className="px-2 py-0.5 text-xs bg-accent text-accent-foreground font-heading">
                        {student.rank}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {student.exam} • {student.branch}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      "{student.story}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="section-padding">
        <div className="container mx-auto text-center">
          <Medal size={48} className="text-accent mx-auto mb-6" />
          <h2 className="heading-section text-foreground mb-4">
            YOUR NAME COULD BE NEXT
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join Defence Simplified and become part of our legacy of success.
            The path to becoming a defence officer starts here.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Results;
