
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Plus, Pencil, Eye, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  level: string;
  fee: string;
  status: 'draft' | 'published';
  created_at: string;
}

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Cast the status field to the correct type
      const typedData = data?.map(course => ({
        ...course,
        status: course.status as 'draft' | 'published'
      })) || [];

      setCourses(typedData);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: 'Error',
        description: 'Failed to load courses',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCourseStatus = async (id: string, status: 'draft' | 'published') => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setCourses(courses.map(c => c.id === id ? { ...c, status } : c));

      toast({
        title: `Course ${status === 'published' ? 'published' : 'unpublished'}`,
        description: `The course has been ${status === 'published' ? 'published' : 'set to draft'}.`,
      });
    } catch (error) {
      console.error(`Error updating course status:`, error);
      toast({
        title: 'Error',
        description: `Failed to update course status`,
        variant: 'destructive',
      });
    }
  };

  const deleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCourses(courses.filter(c => c.id !== id));

      toast({
        title: 'Course deleted',
        description: 'The course has been permanently deleted.',
      });
    } catch (error) {
      console.error('Error deleting course:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete course',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500">Published</Badge>;
      default:
        return <Badge variant="secondary">Draft</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Course Management</h1>
          <p className="text-muted-foreground">Create and manage courses</p>
        </div>
        <Button onClick={() => navigate('/admin/courses/add')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      <div className="bg-white rounded-md shadow">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses found</p>
            <Button className="mt-4" onClick={() => navigate('/admin/courses/add')}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Course
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>{course.duration || 'Not set'}</TableCell>
                  <TableCell>{course.level || 'Not set'}</TableCell>
                  <TableCell>{getStatusBadge(course.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => navigate(`/courses/${course.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => navigate(`/admin/courses/edit/${course.id}`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => deleteCourse(course.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={course.status === 'published' ? 'outline' : 'default'}
                        size="sm"
                        onClick={() => updateCourseStatus(course.id, course.status === 'published' ? 'draft' : 'published')}
                      >
                        {course.status === 'published' ? 'Unpublish' : 'Publish'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCoursesPage;
