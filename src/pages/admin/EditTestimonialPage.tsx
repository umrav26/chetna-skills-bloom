
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import TestimonialForm from '@/components/admin/TestimonialForm';
import { Loader2 } from 'lucide-react';

const EditTestimonialPage = () => {
  const { testimonialId } = useParams<{ testimonialId: string }>();
  const [testimonial, setTestimonial] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonial = async () => {
      if (!testimonialId) return;
      
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('id', testimonialId)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setTestimonial(data);
        } else {
          toast({
            title: 'Testimonial not found',
            description: 'The requested testimonial could not be found',
            variant: 'destructive',
          });
          navigate('/admin/success-stories');
        }
      } catch (error) {
        console.error('Error fetching testimonial:', error);
        toast({
          title: 'Error',
          description: 'Failed to load testimonial details',
          variant: 'destructive',
        });
        navigate('/admin/success-stories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonial();
  }, [testimonialId, navigate]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Testimonial</h1>
        <p className="text-muted-foreground">Update success story details</p>
      </div>
      
      <TestimonialForm initialData={testimonial} />
    </AdminLayout>
  );
};

export default EditTestimonialPage;
