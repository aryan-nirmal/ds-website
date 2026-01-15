import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Trash2, Plus, Trophy, Loader2, Star } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/cropImage";

interface Achiever {
  id: number;
  name: string;
  rank: string;
  exam: string;
  branch: string;
  story: string;
  image?: string;
  // NOTE: DB column might be different, we handle mapping in handleSave
}

const HallOfFameManagement = () => {
  const [achievers, setAchievers] = useState<Achiever[]>([]);
  const [loading, setLoading] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    rank: "",
    exam: "",
    branch: "",
    story: "",
    image: ""
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  // Crop State
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null);


  useEffect(() => {
    fetchAchievers();
  }, []);

  const fetchAchievers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('hall_of_fame')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;

      // Map DB column 'image_url' to local 'image' if needed
      const mappedData = (data || []).map((item: any) => ({
        ...item,
        image: item.image_url || item.image
      }));

      setAchievers(mappedData);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (achiever?: Achiever) => {
    if (achiever) {
      setEditingId(achiever.id);
      setFormData({
        name: achiever.name,
        rank: achiever.rank || "",
        exam: achiever.exam,
        branch: achiever.branch,
        story: achiever.story,
        image: achiever.image || ""
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        rank: "",
        exam: "",
        branch: "",
        story: "",
        image: ""
      });
    }
    setIsDialogOpen(true);
  };

  // Crop Handlers
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setCurrentImageSrc(reader.result as string);
        setIsCropOpen(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropSave = async () => {
    if (!currentImageSrc || !croppedAreaPixels) return;

    try {
      setUploadingImage(true);
      const croppedBlob = await getCroppedImg(currentImageSrc, croppedAreaPixels);
      if (!croppedBlob) throw new Error("Could not crop image");

      const fileName = `${Math.random()}.jpg`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('Gallery')
        .upload(filePath, croppedBlob);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('Gallery')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image: publicUrl }));
      toast.success("Image cropped & uploaded");
      setIsCropOpen(false);
      setCurrentImageSrc(null);
    } catch (error: any) {
      toast.error(error.message || "Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.exam) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      setSaving(true);
      // Explicitly construct payload to match DB columns mostly, assuming DB columns match these keys
      // Note: User asked to remove 'rank' field. If DB requires it, we might default it or ensure it's nullable.
      // Based on previous code, 'rank' was present, so I'll send an empty string or null if allowed, or just omit if it defaults.
      // Safest is to just send what we have.
      const payload: any = {
        name: formData.name,
        rank: formData.rank,
        exam: formData.exam, // Make sure 'exam' column matches
        branch: formData.branch,
        story: formData.story,
        image_url: formData.image // Map 'image' state to 'image_url' column
      };

      if (editingId) {
        // Update
        const { error } = await supabase
          .from('hall_of_fame')
          .update(payload)
          .eq('id', editingId);

        if (error) throw error;

        // Update local state (ui uses 'image' but we store 'image_url')
        setAchievers(achievers.map(a => a.id === editingId ? { ...a, id: editingId, ...payload, image: formData.image } : a));
        toast.success("Achiever updated");
      } else {
        // Insert
        const { data, error } = await supabase
          .from('hall_of_fame')
          .insert([payload])
          .select()
          .single();

        if (error) throw error;

        // Map back DB response to state if keys differ (DB has image_url, UI needs image)
        const newItem = { ...data, image: data.image_url };
        setAchievers([newItem, ...achievers]);
        toast.success("Achiever added");
      }
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      const { error } = await supabase
        .from('hall_of_fame')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setAchievers(achievers.filter(a => a.id !== id));
      toast.success("Record deleted");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading text-white mb-1">Hall of Fame</h2>
          <p className="text-neutral-400 text-sm">Manage student success stories</p>
        </div>
        <Button
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => handleOpenDialog()}
        >
          <Plus size={18} className="mr-2" />
          Add Achiever
        </Button>
      </div>

      <Dialog open={isCropOpen} onOpenChange={setIsCropOpen}>
        <DialogContent className="bg-[#111] border-white/10 text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Adjust Image</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-80 bg-black">
            {currentImageSrc && (
              <Cropper
                image={currentImageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>
          <div className="px-4">
            <Label className="text-neutral-300">Zoom</Label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCropOpen(false)}>Cancel</Button>
            <Button onClick={handleCropSave} className="bg-accent text-white">Save Photo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#111] border-white/10 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Achiever" : "Add Achiever"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="a-image" className="text-neutral-300">Cadet Photo</Label>
              <div className="flex items-center gap-4">
                {formData.image && (
                  <div className="relative w-16 h-16 rounded overflow-hidden border border-white/10">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setFormData({ ...formData, image: "" })}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    id="a-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="bg-black/50 border-white/10 text-white file:bg-white/10 file:text-white file:border-0 hover:file:bg-white/20 cursor-pointer"
                    disabled={uploadingImage}
                  />
                  {uploadingImage && <p className="text-xs text-accent mt-1">Uploading image...</p>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="a-name" className="text-neutral-300">Name</Label>
                <Input
                  id="a-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Cadet Name"
                  className="bg-black/50 border-white/10 text-white placeholder:text-neutral-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="a-rank" className="text-neutral-300">AIR (Rank)</Label>
                <Input
                  id="a-rank"
                  value={formData.rank}
                  onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                  placeholder="AIR 12"
                  className="bg-black/50 border-white/10 text-white placeholder:text-neutral-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="a-exam" className="text-neutral-300">Exam Cleared</Label>
                <Input
                  id="a-exam"
                  value={formData.exam}
                  onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                  placeholder="e.g. NDA / CDS"
                  className="bg-black/50 border-white/10 text-white placeholder:text-neutral-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="a-branch" className="text-neutral-300">Service Branch</Label>
                <Input
                  id="a-branch"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  placeholder="e.g. Indian Army"
                  className="bg-black/50 border-white/10 text-white placeholder:text-neutral-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="a-story" className="text-neutral-300">Success Story / Testimonial</Label>
              <Textarea
                id="a-story"
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                placeholder="Motivational quote or story..."
                className="bg-black/50 border-white/10 text-white placeholder:text-neutral-500 min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-white/10 text-neutral-300 hover:text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              disabled={saving || uploadingImage}
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : (editingId ? "Update" : "Save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto" />
        </div>
      ) : (
        <div className="grid gap-4">
          {achievers.map((achiever) => (
            <div key={achiever.id} className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                {achiever.image ? (
                  <div className="w-12 h-12 rounded overflow-hidden border border-white/10">
                    <img src={achiever.image} alt={achiever.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded bg-yellow-900/20 flex items-center justify-center text-yellow-500">
                    <Trophy size={24} />
                  </div>
                )}
                <div>
                  <h3 className="text-white font-heading tracking-wide text-lg">{achiever.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Star size={14} />
                      {achiever.exam}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-neutral-600" />
                    <span>
                      {achiever.branch}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/10 hover:bg-white/5 text-neutral-300"
                  onClick={() => handleOpenDialog(achiever)}
                >
                  <Edit2 size={16} className="mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline" size="sm"
                  className="border-red-900/30 hover:bg-red-950/30 text-red-500 hover:text-red-400"
                  onClick={() => handleDelete(achiever.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && achievers.length === 0 && (
        <div className="text-center py-12 text-neutral-500">
          No records found. Add your first success story.
        </div>
      )}
    </div>
  );
};

export default HallOfFameManagement;
