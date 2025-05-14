import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

// Testimonial schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  role: z.string().optional(),
  content: z.string().min(10, { message: 'Content must be at least 10 characters long' }),
  rating: z.number().min(1).max(5).default(5),
  course: z.string().optional(),
  location: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export interface TestimonialFormProps {
  testimonialId?: string;
  defaultValues?: FormValues;
  initialData?: FormValues;
}

const TestimonialForm = ({ testimonialId, defaultValues, initialData }: TestimonialFormProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Use initialData for backward compatibility
  const formInitialValues = initialData || defaultValues;
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formInitialValues || {
      name: '',
      role: '',
      content: '',
      rating: 5,
      course: '',
      location: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      // Ensure all required fields are present
      const testimonialData = {
        name: data.name,
        role: data.role || '',
        content: data.content,
        rating: data.rating,
        course: data.course || '',
        location: data.location || '',
      };
      
      if (testimonialId) {
        const { error } = await supabase
          .from('testimonials')
          .update(testimonialData)
          .eq('id', testimonialId);
        
        if (error) throw error;
        
        toast({
          title: 'Testimonial updated',
          description: 'The testimonial has been updated successfully.',
        });
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert(testimonialData);
        
        if (error) throw error;
        
        toast({
          title: 'Testimonial created',
          description: 'The testimonial has been created successfully.',
        });
      }
      
      navigate('/admin/success-stories');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'There was a problem saving the testimonial.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder="Student / Professional / etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Testimonial Content</FormLabel>
              <FormControl>
                <Textarea placeholder="What they said about us..." rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating (1-5)</FormLabel>
                <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={String(field.value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">★ (1)</SelectItem>
                    <SelectItem value="2">★★ (2)</SelectItem>
                    <SelectItem value="3">★★★ (3)</SelectItem>
                    <SelectItem value="4">★★★★ (4)</SelectItem>
                    <SelectItem value="5">★★★★★ (5)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Which course they took" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="City/Region" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/success-stories')}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {testimonialId ? 'Update Testimonial' : 'Create Testimonial'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TestimonialForm;
