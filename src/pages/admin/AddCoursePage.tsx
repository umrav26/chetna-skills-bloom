
import AdminLayout from '@/components/admin/AdminLayout';
import CourseForm from '@/components/admin/CourseForm';

const AddCoursePage = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Course</h1>
        <p className="text-muted-foreground">Create a new course</p>
      </div>
      
      <CourseForm />
    </AdminLayout>
  );
};

export default AddCoursePage;
