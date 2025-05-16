
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Calendar, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

// Define your course interface
interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  fee: string;
  languages: string[];
  skills: string[];
}

// Fallback courses for when the database doesn't return any courses
const fallbackCourses: Record<string, Course> = {
  'full-stack-development': {
    id: 'full-stack-development',
    title: 'Full Stack Development',
    category: 'Tech',
    duration: '3-9 months',
    level: 'Beginner to Advanced',
    languages: ['English', 'Hindi'],
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'GitHub', 'Deployment', 'AI tools'],
    description: 'Master web development from frontend to backend with HTML, CSS, JavaScript, React, Node.js and more.',
    fee: '6,000 - 13,000'
  },
  'digital-marketing': {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Tech',
    duration: '3-9 months',
    level: 'Beginner to Intermediate',
    languages: ['English', 'Hindi', 'Assamese'],
    skills: ['SEO', 'Social Media', 'Content Marketing', 'Google Ads', 'Analytics', 'AI Tools'],
    description: 'Master SEO, social media marketing, content marketing, Google Ads and analytics.',
    fee: '6,000 - 10,000'
  },
  'communication-skills': {
    id: 'communication-skills',
    title: 'Communication Skills',
    category: 'Soft Skills',
    duration: '1.5-3 months',
    level: 'All Levels',
    languages: ['English', 'Hindi', 'Assamese', 'Bodo'],
    skills: ['Public Speaking', 'Business Writing', 'Presentation', 'Email Writing', 'Team Collaboration'],
    description: 'Develop effective verbal, written and presentation skills for professional environments.',
    fee: '3,500 - 6,000'
  },
  'ui-ux-design': {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    category: 'Tech',
    duration: '3-6 months',
    level: 'Beginner to Intermediate',
    languages: ['English', 'Hindi'],
    skills: ['Wireframing', 'Figma', 'User Research', 'Prototyping', 'UI Systems', 'AI-assisted Design'],
    description: 'Create seamless user experiences through wireframing, prototyping, user research and UI systems.',
    fee: '6,000 - 10,000'
  }
};

const CourseDetailsPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      
      try {
        // Try to fetch from database first
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single();
        
        if (error) {
          // If there's a database error, try the fallback courses
          console.log('Trying fallback courses...');
          if (fallbackCourses[courseId]) {
            setCourse(fallbackCourses[courseId]);
          } else {
            console.error('Error fetching course details:', error);
            toast({
              title: "Course not found",
              description: "Could not find the requested course.",
              variant: "destructive",
            });
          }
          return;
        }
        
        setCourse(data as Course);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="flex justify-center items-center min-h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
            <p className="mb-6">We couldn't find the course you're looking for.</p>
            <Button asChild>
              <a href="/courses">Back to Courses</a>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-muted/20 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Badge variant="outline" className="mb-4 bg-primary/10 text-primary">
                {course.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground">{course.description}</p>
            </div>
            
            <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
              {/* Course Meta Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-muted/30">
                <div className="flex items-center gap-3">
                  <Calendar className="h-10 w-10 p-2 rounded-full bg-primary/10 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{course.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Award className="h-10 w-10 p-2 rounded-full bg-primary/10 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Level</p>
                    <p className="font-medium">{course.level}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 p-2 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    ₹
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fee (INR)</p>
                    <p className="font-medium">₹{course.fee}</p>
                  </div>
                </div>
              </div>
              
              {/* Course Details */}
              <div className="p-6">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Languages</h2>
                  <div className="flex flex-wrap gap-2">
                    {course.languages.map((language, index) => (
                      <Badge key={index} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Skills You'll Learn</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-10">
                  <Button size="lg" className="w-full sm:w-auto">
                    Apply For This Course
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetailsPage;
