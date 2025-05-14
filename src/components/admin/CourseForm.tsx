import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const courseSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  category: z.string().min(2, { message: 'Category is required' }),
  duration: z.string().optional(),
  level: z.string().optional(),
  fee: z.string().optional(),
});

type CourseFormValues = z.infer<typeof courseSchema>;

interface CourseFormProps {
  initialData?: CourseFormValues & { id?: string };
  onSuccess?: () => void;
}

const CourseForm = ({ initialData, onSuccess }: CourseFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isEditing = !!initialData?.id;

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      category: '',
      duration: '',
      level: '',
      fee: '',
    }
  });

  const onSubmit = async (data: CourseFormValues) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        const { error } = await supabase
          .from('courses')
          .update(data)
          .eq('id', initialData.id);
        
        if (error) throw error;
        
        toast({
          title: 'Course updated',
          description: 'The course has been successfully updated'
        });
      } else {
        const { error } = await supabase
          .from('courses')
          .insert(data);
        
        if (error) throw error;
        
        toast({
          title: 'Course created',
          description: 'The new course has been successfully added'
        });
      }
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/admin/courses');
      }
    } catch (error) {
      console.error('Error saving course:', error);
      toast({
        title: 'Error',
        description: 'There was a problem saving the course',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
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
                  <FormControl>
                    <Input placeholder="Course category" {...field} />
                  </FormControl>
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
                    <Textarea 
                      placeholder="Course description" 
                      className="min-h-[120px]" 
                      {...field} 
                    />
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
                      <Input placeholder="e.g. 4 weeks" {...field} />
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
                    <FormControl>
                      <Input placeholder="e.g. Beginner" {...field} />
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
                    <FormLabel>Fee</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. ₹2000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin/courses')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  isEditing ? 'Update Course' : 'Create Course'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CourseForm;
