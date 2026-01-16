import { useQuery } from "@tanstack/react-query";
import { Loader2, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SectionHeading from "@/components/SectionHeading";
import GoldDivider from "@/components/GoldDivider";

interface GalleryImage {
  id: number;
  title: string | null;
  url: string;
  created_at: string;
}

const Gallery = () => {
  const { data: images = [], isLoading } = useQuery({
    queryKey: ['gallery_images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as GalleryImage[];
    },
  });

  return (
    <main className="pb-20 lg:pb-0 min-h-screen">
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 bg-card">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="heading-display text-foreground mb-6">
              INSTITUTE <span className="text-accent">GALLERY</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A glimpse into the daily life, training, and achievements at Defence Simplified.
            </p>
          </div>
        </div>
      </section>

      <GoldDivider />

      <section className="section-padding">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group relative aspect-video bg-muted overflow-hidden border border-border hover:border-accent/50 transition-colors rounded-sm"
                >
                  <img
                    src={image.url}
                    alt={image.title || "Gallery Image"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-heading tracking-wide text-sm truncate w-full">
                      {image.title || "Defence Simplified"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-border rounded-lg bg-card/50">
              <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No images found in the gallery.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Gallery;
