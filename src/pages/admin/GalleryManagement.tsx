import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Image, Trash2, Upload, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface GalleryImage {
  id: number;
  title: string | null;
  url: string;
  created_at: string;
}

const GalleryManagement = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error: any) {
      toast.error(error.message || "Error fetching images");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      // 1. Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      // 3. Insert into Database
      const { error: dbError } = await supabase
        .from('gallery_images')
        .insert([{ title: file.name, url: publicUrl }]);

      if (dbError) throw dbError;

      toast.success("Image uploaded successfully");
      fetchImages();
    } catch (error: any) {
      toast.error(error.message || "Error uploading image");
    } finally {
      setUploading(false);
      // Reset input ? Ref might be needed
    }
  };

  const handleDelete = async (id: number, url: string) => {
    // Note: To delete from storage, we'd need to extract the path from the URL.
    // For now, we only delete the DB record reference for simplicity/safety.
    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setImages(images.filter(item => item.id !== id));
      toast.success("Image deleted");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading text-white mb-1">Gallery Management</h2>
          <p className="text-neutral-400 text-sm">Upload and manage campus photos</p>
        </div>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="gallery-upload"
            onChange={handleUpload}
            disabled={uploading}
          />
          <Button
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            asChild
            disabled={uploading}
          >
            <label htmlFor="gallery-upload" className="cursor-pointer">
              {uploading ? <Loader2 size={18} className="mr-2 animate-spin" /> : <Plus size={18} className="mr-2" />}
              {uploading ? "Uploading..." : "Add New Image"}
            </label>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((item) => (
            <div key={item.id} className="group relative aspect-square bg-neutral-900 rounded-lg overflow-hidden border border-white/10">
              <img src={item.url} alt={item.title || "Gallery"} className="w-full h-full object-cover" />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="icon"
                  className="rounded-full"
                  onClick={() => handleDelete(item.id, item.url)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && images.length === 0 && (
        <div className="text-center py-12 text-neutral-500">
          No images in gallery. Upload some to get started.
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
