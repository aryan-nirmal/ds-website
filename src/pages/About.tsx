import { Shield, Target, Eye, Award, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import GoldDivider from "@/components/GoldDivider";

const About = () => {
  return (
    <main className="pt-16 md:pt-20 pb-20 lg:pb-0">
      {/* Hero */}
      <section className="section-padding bg-card">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="heading-display text-foreground mb-6">
              ABOUT <span className="text-accent">DEFENCE SIMPLIFIED</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Established with a singular mission: to prepare India's finest youth for a career
              in the armed forces through rigorous training and unwavering discipline.
            </p>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Philosophy */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading
            title="Our Philosophy"
            subtitle="The principles that guide our approach to defence preparation"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-card border border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0">
                    <Shield size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg tracking-wide mb-2">DISCIPLINE FIRST</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We instill military-grade discipline from day one. Our cadets learn to value punctuality,
                      respect, and commitment — qualities essential for any officer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0">
                    <Target size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg tracking-wide mb-2">STRATEGIC PREPARATION</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Every aspect of our curriculum is designed with selection in mind. We analyze exam patterns,
                      interview trends, and physical requirements to create targeted training modules.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0">
                    <Users size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg tracking-wide mb-2">BROTHERHOOD & TEAMWORK</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We foster a spirit of camaraderie and teamwork. Our cadets train together,
                      support each other, and grow together as a unit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CMS: Gallery */}
            <div className="bg-muted flex flex-col items-center justify-center min-h-[400px] border border-border p-8 text-center">
              <Shield size={64} className="text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-heading text-foreground mb-2">INSTITUTE GALLERY</h3>
              <p className="text-muted-foreground mb-6 max-w-xs">
                Explore our campus facilities, training grounds, and daily life at the academy.
              </p>
              <a
                href="/gallery"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground font-heading tracking-wide hover:bg-accent/90 transition-colors"
              >
                VIEW GALLERY
              </a>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Mission & Vision */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background border border-border p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-accent flex items-center justify-center">
                  <Target size={28} className="text-accent-foreground" />
                </div>
                <h2 className="font-heading text-2xl tracking-wide">OUR MISSION</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To provide world-class defence examination preparation that combines academic excellence
                with physical fitness and personality development, enabling aspirants to realize their
                dream of serving the nation as commissioned officers in the Indian Armed Forces.
              </p>
            </div>

            <div className="bg-background border border-border p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-accent flex items-center justify-center">
                  <Eye size={28} className="text-accent-foreground" />
                </div>
                <h2 className="font-heading text-2xl tracking-wide">OUR VISION</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To become India's most trusted defence preparation institute, known for producing
                officers of the highest caliber who embody integrity, courage, and leadership —
                officers who will lead the armed forces with distinction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Director's Profile */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading
            title="Leadership"
            subtitle="Meet the veteran who guides our institute"
          />

          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-40 h-48 bg-muted shrink-0 flex items-center justify-center">
                  <Award size={48} className="text-muted-foreground" />
                </div>
                <div>
                  <span className="text-xs text-accent tracking-wider uppercase">Founder & Director</span>
                  <h3 className="font-heading text-2xl tracking-wide mt-1 mb-2">
                    COL. (RETD.) RAJENDRA KUMAR SINGH
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Maha Vir Chakra • 32 Years of Distinguished Service • Former SSB President
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Colonel R.K. Singh (Retd.) brings over three decades of military experience to Defence Simplified.
                    A decorated officer who served with distinction in multiple theatres, he has dedicated his
                    post-retirement years to mentoring the next generation of defence officers.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    His deep understanding of the selection process, combined with his commitment to
                    developing complete officers, has made Defence Simplified a preferred choice for
                    serious aspirants across the country.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Infrastructure */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <SectionHeading
            title="Our Infrastructure"
            subtitle="State-of-the-art facilities designed for comprehensive training"
          />

          {/* CMS: Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Academic Block",
              "Physical Training Ground",
              "Library & Study Hall",
              "Hostel Facility",
              "Computer Lab",
              "Conference Hall",
              "Obstacle Course",
              "Indoor Sports"
            ].map((facility, index) => (
              <div
                key={index}
                className="aspect-square bg-background border border-border flex items-center justify-center hover:border-accent/50 transition-colors"
              >
                <span className="font-heading text-sm tracking-wide text-center px-4">{facility}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
