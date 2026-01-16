import { Download, FileText, BookOpen, Newspaper, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import GoldDivider from "@/components/GoldDivider";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const examPatterns = [
  {
    exam: "NDA Written Examination",
    papers: [
      { name: "Mathematics", marks: 300, duration: "2.5 Hours" },
      { name: "General Ability Test", marks: 600, duration: "2.5 Hours" },
    ],
    totalMarks: 900
  },
  {
    exam: "CDS Written Examination",
    papers: [
      { name: "English", marks: 100, duration: "2 Hours" },
      { name: "General Knowledge", marks: 100, duration: "2 Hours" },
      { name: "Elementary Mathematics", marks: 100, duration: "2 Hours" },
    ],
    totalMarks: 300
  },
  {
    exam: "Sainik School Entrance Test",
    papers: [
      { name: "Mathematics", marks: 150, duration: "2 Hours" },
      { name: "Intelligence", marks: 50, duration: "45 Minutes" },
      { name: "Language", marks: 100, duration: "1.5 Hours" },
      { name: "General Knowledge", marks: 50, duration: "45 Minutes" },
    ],
    totalMarks: 350
  }
];

const StudentCorner = () => {
  const { data: magazines = [], isLoading: loadingMagazines } = useQuery({
    queryKey: ['magazines'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('magazines')
        .select('id, title, topic, pages')
        .eq('status', 'Published')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: news = [], isLoading: loadingNews } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('defence_news')
        .select('id, title, date, category')
        .order('created_at', { ascending: false })
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  const { data: syllabus = [], isLoading: loadingSyllabus } = useQuery({
    queryKey: ['syllabus'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('syllabus_downloads')
        .select('id, name, size')
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  if (loadingMagazines || loadingNews || loadingSyllabus) {
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
              STUDENT <span className="text-accent">CORNER</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Your comprehensive resource hub for magazines, defence news,
              exam patterns, and study materials.
            </p>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Magazine Archive */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading
            title="Magazine Archive"
            subtitle="Monthly editions of Defence Digest with exam strategies and current affairs"
          />

          {/* CMS: Magazine */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {magazines.map((magazine, index) => (
              <div
                key={index}
                className="bg-card border border-border hover:border-accent/50 transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen size={48} className="text-muted-foreground mx-auto mb-2" />
                    <span className="text-xs text-muted-foreground">{magazine.pages} Pages</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-heading text-sm tracking-wide mb-1">{magazine.title}</h4>
                  <p className="text-xs text-muted-foreground mb-4">{magazine.topic}</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <Download size={14} />
                      Download PDF
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Defence News */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <SectionHeading
            title="Defence News"
            subtitle="Latest updates on examinations, notifications, and defence sector"
          />

          <div className="max-w-4xl mx-auto space-y-4">
            {news.map((item, index) => (
              <div
                key={index}
                className="bg-background border border-border p-4 md:p-6 hover:border-accent/50 transition-colors flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-muted flex items-center justify-center shrink-0">
                    <Newspaper size={18} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-heading text-sm tracking-wide mb-1">{item.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {item.date}
                      </span>
                      <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="link" size="sm" className="self-start md:self-center">
                  Read More →
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Exam Patterns */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading
            title="Exam Patterns"
            subtitle="Understand the structure and marking scheme of each examination"
          />

          <div className="space-y-8">
            {examPatterns.map((exam, index) => (
              <div
                key={index}
                className="bg-card border border-border overflow-hidden"
              >
                <div className="bg-muted/50 px-6 py-4 border-b border-border">
                  <h3 className="font-heading text-lg tracking-wide flex items-center gap-3">
                    <FileText size={18} className="text-accent" />
                    {exam.exam}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-heading text-sm tracking-wide">Paper</th>
                          <th className="text-center py-3 px-4 font-heading text-sm tracking-wide">Marks</th>
                          <th className="text-center py-3 px-4 font-heading text-sm tracking-wide">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exam.papers.map((paper, i) => (
                          <tr key={i} className="border-b border-border/50">
                            <td className="py-3 px-4 text-sm">{paper.name}</td>
                            <td className="py-3 px-4 text-sm text-center text-accent">{paper.marks}</td>
                            <td className="py-3 px-4 text-sm text-center text-muted-foreground">{paper.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-muted/30">
                          <td className="py-3 px-4 font-heading text-sm tracking-wide">Total</td>
                          <td className="py-3 px-4 text-sm text-center font-bold text-accent">{exam.totalMarks}</td>
                          <td className="py-3 px-4"></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Syllabus Downloads */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <SectionHeading
            title="Syllabus Downloads"
            subtitle="Complete syllabi for all defence examinations"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "NDA Syllabus 2024", size: "2.4 MB" },
              { name: "CDS Syllabus 2024", size: "1.8 MB" },
              { name: "Sainik School Syllabus", size: "1.2 MB" },
            ].map((file, index) => (
              <div
                key={index}
                className="bg-background border border-border p-6 text-center hover:border-accent/50 transition-colors"
              >
                <FileText size={32} className="text-accent mx-auto mb-3" />
                <h4 className="font-heading text-sm tracking-wide mb-1">{file.name}</h4>
                <p className="text-xs text-muted-foreground mb-4">{file.size}</p>
                <Button variant="outline" size="sm" asChild>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <Download size={14} />
                    Download
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default StudentCorner;
