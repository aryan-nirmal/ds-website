import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Trash2, Plus, BookOpen, Clock, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface Course {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  batch_size: string;
  description: string;
  features: string[];
  eligibility: string[];
  syllabus: string[];
}

const CoursesManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    duration: "",
    batch_size: "",
    description: "",
    features: "",
    eligibility: "",
    syllabus: ""
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setCourses(data || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (course?: Course) => {
    if (course) {
      setEditingId(course.id);
      setFormData({
        title: course.title,
        subtitle: course.subtitle || "",
        duration: course.duration,
        batch_size: course.batch_size || "",
        description: course.description,
        features: Array.isArray(course.features) ? course.features.join('\n') : "",
        eligibility: Array.isArray(course.eligibility) ? course.eligibility.join('\n') : "",
        syllabus: Array.isArray(course.syllabus) ? course.syllabus.join('\n') : ""
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        subtitle: "",
        duration: "",
        batch_size: "",
        description: "",
        features: "",
        eligibility: "",
        syllabus: ""
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.duration) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        title: formData.title,
        subtitle: formData.subtitle,
        duration: formData.duration,
        batch_size: formData.batch_size,
        description: formData.description,
        features: formData.features.split('\n').filter(line => line.trim() !== ""),
        eligibility: formData.eligibility.split('\n').filter(line => line.trim() !== ""),
        syllabus: formData.syllabus.split('\n').filter(line => line.trim() !== "")
      };

      if (editingId) {
        // Update
        const { error } = await supabase
          .from('courses')
          .update(payload)
          .eq('id', editingId);

        if (error) throw error;

        // Optimistic update
        setCourses(courses.map(c => c.id === editingId ? { ...c, id: editingId, ...payload } : c));
        toast.success("Course updated");
      } else {
        // Insert
        const { data, error } = await supabase
          .from('courses')
          .insert([payload])
          .select()
          .single();

        if (error) throw error;

        setCourses([...courses, data]);
        toast.success("Course added");
      }
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setCourses(courses.filter(c => c.id !== id));
      toast.success("Course deleted");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading text-white mb-1">Course Management</h2>
          <p className="text-neutral-400 text-sm">Create and edit training programs</p>
        </div>
        <Button
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => handleOpenDialog()}
        >
          <Plus size={18} className="mr-2" />
          Add New Course
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#111] border-white/10 text-white sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Course" : "Add New Course"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="c-title" className="text-neutral-300">Course Title</Label>
                <Input
                  id="c-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. NDA Foundation"
                  className="bg-black/50 border-white/10 text-white placeholder:text-neutral-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-subtitle" className="text-neutral-300">Subtitle</Label>
                <Input
                  id="c-subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. 2 YEAR PROGRAM"
                  className="bg-black/50 border-white/10 text-white placeholder:text-neutral-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="c-duration" className="text-neutral-300">Duration</Label>
                <Input
                  id="c-duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g. 12 Months"
                  className="bg-black/50 border-white/10 text-white placeholder:text-neutral-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-batch" className="text-neutral-300">Batch Size</Label>
                <Input
                  id="c-batch"
                  value={formData.batch_size}
                  onChange={(e) => setFormData({ ...formData, batch_size: e.target.value })}
                  placeholder="e.g. 30 Students"
                  className="bg-black/50 border-white/10 text-white placeholder:text-neutral-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-desc" className="text-neutral-300">Description</Label>
              <Textarea
                id="c-desc"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Course details..."
                className="bg-black/50 border-white/10 text-white placeholder:text-neutral-500 min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-features" className="text-neutral-300">Program Features (One per line)</Label>
              <Textarea
                id="c-features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                className="bg-black/50 border-white/10 text-white placeholder:text-neutral-500 min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="c-eligibility" className="text-neutral-300">Eligibility (One per line)</Label>
                <Textarea
                  id="c-eligibility"
                  value={formData.eligibility}
                  onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                  placeholder="Criteria 1&#10;Criteria 2"
                  className="bg-black/50 border-white/10 text-white placeholder:text-neutral-500 min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-syllabus" className="text-neutral-300">Syllabus Highlights (One per line)</Label>
                <Textarea
                  id="c-syllabus"
                  value={formData.syllabus}
                  onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
                  placeholder="Topic 1&#10;Topic 2"
                  className="bg-black/50 border-white/10 text-white placeholder:text-neutral-500 min-h-[100px]"
                />
              </div>
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
              disabled={saving}
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : (editingId ? "Update" : "Create")}
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
          {courses.map((course) => (
            <div key={course.id} className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded bg-blue-900/20 flex items-center justify-center text-blue-400">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="text-white font-heading tracking-wide text-lg">{course.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={14} />
                      {course.batch_size}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/10 hover:bg-white/5 text-neutral-300"
                  onClick={() => handleOpenDialog(course)}
                >
                  <Edit2 size={16} className="mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline" size="sm"
                  className="border-red-900/30 hover:bg-red-950/30 text-red-500 hover:text-red-400"
                  onClick={() => handleDelete(course.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && courses.length === 0 && (
        <div className="text-center py-12 text-neutral-500">
          No courses found. Create one to get started.
        </div>
      )}
    </div>
  );
};

export default CoursesManagement;
