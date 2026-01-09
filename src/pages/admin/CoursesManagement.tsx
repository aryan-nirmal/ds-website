import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Plus, BookOpen, Clock, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface Course {
  id: number;
  name: string;
  duration: string;
  students_enrolled: number;
  description: string;
}

const CoursesManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleAdd = async () => {
    const name = prompt("Enter course name:");
    if (!name) return;

    // Simplistic text prompt for demo speed, normally a modal form
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert([{
          name,
          duration: "12 Months",
          students_enrolled: 0,
          description: "New course description placeholder"
        }])
        .select()
        .single();

      if (error) throw error;
      setCourses([...courses, data]);
      toast.success("Course added");
    } catch (error: any) {
      toast.error(error.message);
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
          onClick={handleAdd}
        >
          <Plus size={18} className="mr-2" />
          Add New Course
        </Button>
      </div>

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
                  <h3 className="text-white font-heading tracking-wide text-lg">{course.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={14} />
                      {course.students_enrolled} Enrolled
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5 text-neutral-300">
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
