import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Upload, Trash2, Download, Loader2, Plus, X, Edit2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface Magazine {
  id: number;
  title: string;
  month: string;
  status: "Published" | "Archived" | "Draft";
  pdf_url: string | null;
}

const MagazineManagement = () => {
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [startFile, setSelectedFile] = useState<File | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchMagazines();
  }, []);

  const fetchMagazines = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('magazines')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      setMagazines(data || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAuthDialog = (mag?: Magazine) => {
    if (mag) {
      setEditingId(mag.id);
      setNewTitle(mag.title);
    } else {
      setEditingId(null);
      setNewTitle("");
      setSelectedFile(null);
    }
    setIsDialogOpen(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = async () => {
    if (!newTitle) {
      toast.error("Please provide a title");
      return;
    }

    if (!editingId && !startFile) {
      toast.error("Please provide a PDF file");
      return;
    }

    try {
      setUploading(true);

      if (editingId) {
        // Update Mode
        const { error } = await supabase
          .from('magazines')
          .update({ title: newTitle })
          .eq('id', editingId);

        if (error) throw error;

        setMagazines(magazines.map(m => m.id === editingId ? { ...m, title: newTitle } : m));
        toast.success("Magazine updated successfully");
      } else {
        // Create Mode
        if (!startFile) return;

        // 1. Upload PDF
        const fileExt = startFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, startFile);

        if (uploadError) throw uploadError;

        // 2. Get Public URL
        const { data: { publicUrl } } = supabase.storage
          .from('documents')
          .getPublicUrl(filePath);

        // 3. Insert Record
        const { data, error: dbError } = await supabase
          .from('magazines')
          .insert([{
            title: newTitle,
            month: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            status: "Draft",
            pdf_url: publicUrl
          }])
          .select()
          .single();

        if (dbError) throw dbError;

        setMagazines([data, ...magazines]);
        toast.success("Magazine uploaded successfully");
      }

      setIsDialogOpen(false);
      setNewTitle("");
      setSelectedFile(null);
    } catch (error: any) {
      toast.error(error.message || "Error processing request");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('magazines')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMagazines(magazines.filter(m => m.id !== id));
      toast.success("Magazine deleted");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleStatusToggle = async (mag: Magazine) => {
    try {
      const newStatus = mag.status === "Published" ? "Archived" : "Published";
      const { error } = await supabase
        .from('magazines')
        .update({ status: newStatus })
        .eq('id', mag.id);

      if (error) throw error;

      setMagazines(magazines.map(m =>
        m.id === mag.id ? { ...m, status: newStatus } : m
      ));
      toast.success("Status updated");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading text-white mb-1">Magazine Management</h2>
          <p className="text-neutral-400 text-sm">Upload monthly Defence Digest PDFs</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => handleOpenAuthDialog()}
          >
            <Upload size={18} className="mr-2" />
            Upload New Magazine
          </Button>
          <DialogContent className="bg-[#111] border-white/10 text-white sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Magazine" : "Upload Defence Digest"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-neutral-300">Issue Title</Label>
                <Input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. January 2024 Edition"
                  className="bg-black/50 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pdf" className="text-neutral-300">
                  {editingId ? "Replace PDF (Optional)" : "PDF File"}
                </Label>
                <Input
                  id="pdf"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="bg-black/50 border-white/10 text-white file:bg-white/10 file:text-white file:border-0 hover:file:bg-white/20 cursor-pointer"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-white/10 text-neutral-300 hover:text-white hover:bg-white/5"
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUploadSubmit}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    {editingId ? "Updating..." : "Uploading..."}
                  </>
                ) : (
                  editingId ? "Save Changes" : "Upload"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto" />
        </div>
      ) : (
        <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-4 pl-6 text-xs font-heading text-neutral-400 tracking-wider">ISSUE NAME</th>
                <th className="p-4 text-xs font-heading text-neutral-400 tracking-wider">MONTH</th>
                <th className="p-4 text-xs font-heading text-neutral-400 tracking-wider">STATUS</th>
                <th className="p-4 text-right pr-6 text-xs font-heading text-neutral-400 tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {magazines.map((mag) => (
                <tr key={mag.id} className="group hover:bg-white/5 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-red-900/20 flex items-center justify-center text-red-400">
                        <FileText size={16} />
                      </div>
                      <span className="text-white font-medium">{mag.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-neutral-400 text-sm">{mag.month}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer ${mag.status === "Published" ? "bg-green-900/30 text-green-400" :
                        mag.status === "Draft" ? "bg-yellow-900/30 text-yellow-400" :
                          "bg-neutral-800 text-neutral-400"
                        }`}
                      onClick={() => handleStatusToggle(mag)}
                    >
                      {mag.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost" className="h-8 text-neutral-400 hover:text-white" title="Download">
                        <Download size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 text-neutral-400 hover:text-white"
                        title="Edit Name"
                        onClick={() => handleOpenAuthDialog(mag)}
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 text-neutral-400 hover:text-blue-400"
                        title="Update Status"
                        onClick={() => handleStatusToggle(mag)}
                      >
                        <Upload size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 text-red-500 hover:text-red-400 hover:bg-red-950/20"
                        title="Delete"
                        onClick={() => handleDelete(mag.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && magazines.length === 0 && (
        <div className="text-center py-12 text-neutral-500">
          No magazines found.
        </div>
      )}
    </div>
  );
};

export default MagazineManagement;
