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

// Schema for the form validation
const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  category: z.string().min(1, { message: 'Please select a category' }),
  description: z.string().optional(),
  duration: z.string().optional(),
  fee: z.string().optional(),
  level: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export interface CourseFormProps {
  courseId?: string;
  defaultValues?: FormValues;
  initialData?: FormValues;
}

const CourseForm = ({ courseId, defaultValues, initialData }: CourseFormProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Use initialData for backward compatibility
  const formInitialValues = initialData || defaultValues;
  
  // Initialize the form with default values or empty values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formInitialValues || {
      title: '',
      category: '',
      description: '',
      duration: '',
      fee: '',
      level: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      // Ensure all required fields are present
      const courseData = {
        title: data.title,
        category: data.category,
        description: data.description || '',
        duration: data.duration || '',
        fee: data.fee || '',
        level: data.level || '',
        status: 'draft', // Default status
      };
      
      if (courseId) {
        const { error } = await supabase
          .from('courses')
          .update(courseData)
          .eq('id', courseId);
        
        if (error) throw error;
        
        toast({
          title: 'Course updated',
          description: 'The course has been updated successfully.',
        });
      } else {
        const { error } = await supabase
          .from('courses')
          .insert(courseData);
        
        if (error) throw error;
        
        toast({
          title: 'Course created',
          description: 'The course has been created successfully.',
        });
      }
      
      navigate('/admin/courses');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'There was a problem saving the course.',
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Course title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="tech">Tech Skills</SelectItem>
                  <SelectItem value="soft">Soft Skills</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Course description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 3 months" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fee (₹)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 10000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/courses')}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {courseId ? 'Update Course' : 'Create Course'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CourseForm;
