import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Trash2, Download, Loader2 } from "lucide-react";
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

  const handleUpload = async () => {
    // Simplified for demo: Just creating a draft record
    // Real impl would have file upload similar to Gallery
    const title = prompt("Magazine Title:");
    if (!title) return;

    try {
      const { data, error } = await supabase
        .from('magazines')
        .insert([{
          title,
          month: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          status: "Draft"
        }])
        .select()
        .single();

      if (error) throw error;
      setMagazines([data, ...magazines]);
      toast.success("Magazine draft created");
    } catch (error: any) {
      toast.error(error.message);
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
        <Button
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={handleUpload}
        >
          <Upload size={18} className="mr-2" />
          Upload New Issue
        </Button>
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
                        className="h-8 text-neutral-400 hover:text-blue-400"
                        title="Update"
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
