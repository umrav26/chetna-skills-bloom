
import AdminLayout from '@/components/admin/AdminLayout';
import TestimonialForm from '@/components/admin/TestimonialForm';

const AddTestimonialPage = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Testimonial</h1>
        <p className="text-muted-foreground">Create a new success story</p>
      </div>
      
      <TestimonialForm />
    </AdminLayout>
  );
};

export default AddTestimonialPage;
