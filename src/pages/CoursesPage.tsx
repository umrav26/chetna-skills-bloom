import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SectionTitle from '../components/SectionTitle';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Clock, BookOpen, Code, Shield, Database, Lightbulb, Calculator, BarChart, Camera, Megaphone, GraduationCap, Briefcase, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Define course types
type CourseCategory = 'tech' | 'soft' | 'business' | 'creative';
type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
type CourseLanguage = 'english' | 'hindi' | 'assamese' | 'bodo';

interface Course {
  id: string;
  name?: string;
  title: string;
  category: CourseCategory;
  level: CourseLevel;
  durations?: {
    duration: string;
    fee: number;
  }[];
  languages: string[] | CourseLanguage[]; // Updated to accept either string[] or CourseLanguage[]
  description: string;
  imageUrl?: string;
  skills: string[];
  icon?: React.ReactNode;
  fee?: string;
  duration?: string;
}

// Helper function for category label
const getCategoryLabel = (category: CourseCategory): string => {
  switch(category) {
    case 'tech': return 'Tech Skills';
    case 'soft': return 'Soft Skills';
    case 'business': return 'Business';
    case 'creative': return 'Creative';
    default: return 'Unknown';
  }
};

// Helper function for level badge color
const getLevelBadgeVariant = (level: CourseLevel): "default" | "secondary" | "outline" => {
  switch(level) {
    case 'beginner': return 'outline';
    case 'intermediate': return 'secondary';
    case 'advanced': return 'default';
    default: return 'outline';
  }
};

// Define some fallback courses if database is empty
const fallbackCourses: Course[] = [
  {
    id: 'full-stack-development',
    name: 'Full Stack Development',
    title: 'Full Stack Development',
    category: 'tech',
    level: 'beginner',
    durations: [
      { duration: '3-month', fee: 6000 },
      { duration: '6-month', fee: 10000 },
      { duration: '9-month', fee: 13000 }
    ],
    languages: ['english', 'hindi'],
    description: 'Master web development from frontend to backend with HTML, CSS, JavaScript, React, Node.js and more.',
    imageUrl: '/placeholder.svg',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'GitHub', 'Deployment', 'AI tools'],
    icon: <Code className="h-5 w-5" />
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    title: 'Graphic Design',
    category: 'creative',
    level: 'beginner',
    durations: [
      { duration: '3-month', fee: 5000 },
      { duration: '6-month', fee: 10000 }
    ],
    languages: ['english', 'hindi'],
    description: 'Learn to create stunning visuals with Canva, Photoshop, Illustrator and AI image tools.',
    imageUrl: '/placeholder.svg',
    skills: ['Canva', 'Photoshop', 'Illustrator', 'Visual Communication', 'Portfolio Design', 'AI image tools'],
    icon: <Lightbulb className="h-5 w-5" />
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity (Basic Level)',
    title: 'Cybersecurity (Basic Level)',
    category: 'tech',
    level: 'beginner',
    durations: [
      { duration: '3-month', fee: 7000 }
    ],
    languages: ['english', 'hindi'],
    description: 'Learn the basics of ethical hacking, phishing attack prevention, firewalls, and system security.',
    imageUrl: '/placeholder.svg',
    skills: ['Ethical Hacking Basics', 'Phishing Attacks', 'Firewalls', 'System Security', 'Labs & Demos'],
    icon: <Shield className="h-5 w-5" />
  },
  {
    id: 'basic-computer',
    name: 'Basic Computer Literacy',
    title: 'Basic Computer Literacy',
    category: 'tech',
    level: 'beginner',
    durations: [
      { duration: '1.5-month', fee: 2000 },
      { duration: '3-month', fee: 3500 }
    ],
    languages: ['english', 'hindi', 'assamese', 'bodo'],
    description: 'Get started with essential computer skills like using MS Office, email, internet browsing and file management.',
    imageUrl: '/placeholder.svg',
    skills: ['MS Office', 'Email', 'File Management', 'Internet Safety', 'Local Language Assistance'],
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    title: 'Data Analysis',
    category: 'tech',
    level: 'intermediate',
    durations: [
      { duration: '3-month', fee: 7000 },
      { duration: '6-month', fee: 10000 }
    ],
    languages: ['english', 'hindi'],
    description: 'Master data analysis with Excel, Power BI, SQL and Python basics to create powerful data projects.',
    imageUrl: '/placeholder.svg',
    skills: ['Excel', 'Power BI Dashboards', 'SQL', 'Python Basics', 'Data Projects', 'AI tools'],
    icon: <Database className="h-5 w-5" />
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX Design',
    title: 'UI/UX Design',
    category: 'creative',
    level: 'intermediate',
    durations: [
      { duration: '3-month', fee: 6000 },
      { duration: '6-month', fee: 10000 }
    ],
    languages: ['english', 'hindi'],
    description: 'Create seamless user experiences through wireframing, prototyping, user research and UI systems.',
    imageUrl: '/placeholder.svg',
    skills: ['Wireframing', 'Figma', 'User Research', 'Prototyping', 'UI Systems', 'AI-assisted Design'],
    icon: <Lightbulb className="h-5 w-5" />
  },
  {
    id: 'excel-business',
    name: 'Excel for Business',
    title: 'Excel for Business',
    category: 'business',
    level: 'beginner',
    durations: [
      { duration: '1.5-month', fee: 3500 },
      { duration: '3-month', fee: 6000 }
    ],
    languages: ['english', 'hindi'],
    description: 'Master Excel formulas, MIS reports, pivot tables, dashboards and AI tools for business.',
    imageUrl: '/placeholder.svg',
    skills: ['Formulas', 'MIS Reports', 'Pivot Tables', 'Dashboards', 'Excel + AI Tools'],
    icon: <Calculator className="h-5 w-5" />
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    title: 'Digital Marketing',
    category: 'tech',
    level: 'beginner',
    durations: [
      { duration: '3-month', fee: 6000 },
      { duration: '6-month', fee: 10000 },
      { duration: '9-month', fee: 13000 }
    ],
    languages: ['english', 'hindi', 'assamese'],
    description: 'Master SEO, social media marketing, content marketing, Google Ads and analytics.',
    imageUrl: '/placeholder.svg',
    skills: ['SEO', 'SMM', 'Content Marketing', 'Google Ads', 'Analytics', 'AI Tools'],
    icon: <BarChart className="h-5 w-5" />
  },
  {
    id: 'photography',
    name: 'Photography (Mobile + DSLR)',
    title: 'Photography (Mobile + DSLR)',
    category: 'creative',
    level: 'beginner',
    durations: [
      { duration: '1.5-month', fee: 4000 },
      { duration: '3-month', fee: 6500 }
    ],
    languages: ['english', 'hindi'],
    description: 'Learn composition, editing, equipment handling with outdoor practice sessions.',
    imageUrl: '/placeholder.svg',
    skills: ['Composition', 'Editing', 'Equipment Handling', 'Outdoor Practice', 'Visual Storytelling'],
    icon: <Camera className="h-5 w-5" />
  },
  {
    id: 'communication-skills',
    name: 'Communication Skills',
    title: 'Communication Skills',
    category: 'soft',
    level: 'beginner',
    durations: [
      { duration: '1.5-month', fee: 3500 },
      { duration: '3-month', fee: 6000 }
    ],
    languages: ['english', 'hindi', 'assamese', 'bodo'],
    description: 'Develop effective verbal, written and presentation skills for professional environments.',
    imageUrl: '/placeholder.svg',
    skills: ['Verbal', 'Written', 'Presentation', 'Email Writing', 'Team Collaboration'],
    icon: <Megaphone className="h-5 w-5" />
  },
  {
    id: 'spoken-english',
    name: 'Spoken English & Communication',
    title: 'Spoken English & Communication',
    category: 'soft',
    level: 'beginner',
    durations: [
      { duration: '1.5-month', fee: 4500 },
      { duration: '3-month', fee: 8500 }
    ],
    languages: ['english', 'hindi', 'assamese', 'bodo'],
    description: 'Improve grammar, fluency, public speaking skills with real-life practice.',
    imageUrl: '/placeholder.svg',
    skills: ['Grammar', 'Fluency', 'Group Discussions', 'Public Speaking', 'Real-life Practice'],
    icon: <GraduationCap className="h-5 w-5" />
  },
  {
    id: 'freelancing',
    name: 'Freelancing & Client Handling',
    title: 'Freelancing & Client Handling',
    category: 'business',
    level: 'intermediate',
    durations: [
      { duration: '1-month', fee: 2000 }
    ],
    languages: ['english', 'hindi'],
    description: 'Learn proposal writing, platform usage, pricing strategies and client communication.',
    imageUrl: '/placeholder.svg',
    skills: ['Proposal Writing', 'Platforms (Fiverr/Upwork)', 'Pricing', 'Client Communication'],
    icon: <Briefcase className="h-5 w-5" />
  }
];

const CoursesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [animateCards, setAnimateCards] = useState(false);
  const [coursesFromDB, setCoursesFromDB] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('status', 'published');
        
        if (error) {
          console.error('Error fetching courses:', error);
          return;
        }

        // Transform database courses to match our Course interface
        const formattedCourses: Course[] = data.map(course => {
          // Determine the icon based on category
          let icon = <BookOpen className="h-5 w-5" />;
          if (course.category === 'tech') icon = <Code className="h-5 w-5" />;
          if (course.category === 'soft') icon = <Megaphone className="h-5 w-5" />;
          if (course.category === 'business') icon = <Briefcase className="h-5 w-5" />;
          if (course.category === 'creative') icon = <Lightbulb className="h-5 w-5" />;

          // Format durations and fees
          const durations = [{
            duration: course.duration || '3-month',
            fee: parseInt(course.fee?.replace(/[^\d]/g, '') || '0', 10)
          }];

          return {
            id: course.id,
            title: course.title,
            category: course.category as CourseCategory,
            level: course.level as CourseLevel || 'beginner',
            durations,
            languages: course.languages || ['english'],
            description: course.description || '',
            imageUrl: '/placeholder.svg',
            skills: course.skills || [],
            icon,
            fee: course.fee,
            duration: course.duration
          };
        });
        
        setCoursesFromDB(formattedCourses);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourses();
  }, []);
  
  // Extract category from URL path
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    if (pathParts.length > 2) {
      const urlCategory = pathParts[2];
      if (['tech', 'soft', 'business', 'creative'].includes(urlCategory)) {
        setActiveCategory(urlCategory);
      }
    }
  }, [location.pathname]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveCategory(value);
    if (value === 'all') {
      navigate('/courses');
    } else {
      navigate(`/courses/${value}`);
    }
  };

  // Trigger animation after component mounts
  useEffect(() => {
    setAnimateCards(true);
  }, []);

  // Use fetched courses or fallback if none are available
  const displayCourses = coursesFromDB.length > 0 ? coursesFromDB : fallbackCourses;
  
  // Filter courses based on active category and search query
  const filteredCourses = displayCourses.filter(course => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const courseName = course.title || '';
    const courseDesc = course.description || '';
    const matchesSearch = courseName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         courseDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full animate-fade-in">
              Course Catalog
            </span>
            <SectionTitle
              title="Explore Our Courses"
              subtitle="Discover practical, industry-relevant courses designed to help you develop in-demand skills for today's job market."
              centered
            />
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search courses by name or keyword..."
                className="pl-10 bg-background border-muted"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 border-muted">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Tabs 
              value={activeCategory} 
              onValueChange={handleTabChange} 
              className="mb-12"
            >
              <TabsList className="mb-8 bg-transparent p-1 flex flex-wrap justify-center gap-2">
                <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  All Courses
                </TabsTrigger>
                <TabsTrigger value="tech" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Tech Skills
                </TabsTrigger>
                <TabsTrigger value="creative" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Creative
                </TabsTrigger>
                <TabsTrigger value="business" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Business
                </TabsTrigger>
                <TabsTrigger value="soft" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Soft Skills
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map((course, index) => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      animate={animateCards} 
                      index={index}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="tech" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map((course, index) => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      animate={animateCards} 
                      index={index}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="creative" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map((course, index) => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      animate={animateCards} 
                      index={index}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="business" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map((course, index) => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      animate={animateCards} 
                      index={index}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="soft" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map((course, index) => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      animate={animateCards} 
                      index={index}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Course Card Component
interface CourseCardProps {
  course: Course;
  animate: boolean;
  index: number;
}

const CourseCard = ({ course, animate, index }: CourseCardProps) => {
  return (
    <Card 
      className={`overflow-hidden hover:shadow-lg transition-all duration-300 border-muted ${
        animate ? 'animate-fade-in' : 'opacity-0'
      }`} 
      style={{ 
        animationDelay: `${0.1 * (index + 1)}s`,
        transform: animate ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      <div className="aspect-w-16 aspect-h-9 bg-muted/30 flex items-center justify-center p-4 group relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center z-10 group-hover:scale-110 transition-all duration-300">
          {course.icon}
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-70"></div>
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <Badge variant="outline" className="bg-primary/5 text-primary">
            {getCategoryLabel(course.category)}
          </Badge>
          <Badge variant={getLevelBadgeVariant(course.level)}>
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </Badge>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>
            {course.duration || (course.durations && course.durations.length > 0 ? 
              (course.durations.length === 1 
                ? course.durations[0].duration 
                : `${course.durations[0].duration} to ${course.durations[course.durations.length - 1].duration}`
              ) : 'N/A')}
          </span>
          <div className="mx-2 h-1 w-1 rounded-full bg-muted-foreground/30"></div>
          <BookOpen className="h-4 w-4 mr-1" />
          <span>{(course.languages as string[]).length} languages</span>
        </div>
        
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">Skills you'll gain:</div>
          <div className="flex flex-wrap gap-1">
            {course.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="font-normal">
                {skill}
              </Badge>
            ))}
            {course.skills.length > 3 && (
              <Badge variant="secondary" className="font-normal">+{course.skills.length - 3}</Badge>
            )}
          </div>
        </div>
        
        <div className="mt-4">
          <div className="mb-2 flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-sm font-medium">Available plans:</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {course.fee ? (
              <Badge variant="outline" className="font-normal">
                {course.duration || '3-month'}: ₹{course.fee}
              </Badge>
            ) : course.durations && course.durations.map((plan) => (
              <Badge key={plan.duration} variant="outline" className="font-normal">
                {plan.duration}: ₹{plan.fee.toLocaleString()}
              </Badge>
            ))}
          </div>
          
          <Button asChild className="w-full mt-2 bg-primary hover:bg-primary/90 transition-all duration-300">
            <Link to={`/courses/${course.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursesPage;
