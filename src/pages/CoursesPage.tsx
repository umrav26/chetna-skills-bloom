
import { useState } from 'react';
import Layout from '../components/Layout';
import SectionTitle from '../components/SectionTitle';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Clock, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define course types
type CourseCategory = 'tech' | 'soft' | 'foundational';
type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
type CourseDuration = '1-month' | '3-month' | '6-month' | '9-month';
type CourseLanguage = 'english' | 'hindi' | 'assamese' | 'bodo';

interface Course {
  id: string;
  name: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: CourseDuration;
  languages: CourseLanguage[];
  description: string;
  fee: number;
  imageUrl: string;
  skills: string[];
}

// Helper function for category label
const getCategoryLabel = (category: CourseCategory): string => {
  switch(category) {
    case 'tech': return 'Tech Skills';
    case 'soft': return 'Soft Skills';
    case 'foundational': return 'Foundational';
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

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Sample course data
  const courses: Course[] = [
    {
      id: 'web-dev',
      name: 'Web Development',
      category: 'tech',
      level: 'beginner',
      duration: '3-month',
      languages: ['english', 'hindi'],
      description: 'Learn HTML, CSS, JavaScript and build responsive websites from scratch.',
      fee: 5000,
      imageUrl: '/placeholder.svg',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design']
    },
    {
      id: 'digital-marketing',
      name: 'Digital Marketing',
      category: 'tech',
      level: 'beginner',
      duration: '3-month',
      languages: ['english', 'hindi', 'assamese'],
      description: 'Master social media marketing, SEO, SEM, and content strategies.',
      fee: 4500,
      imageUrl: '/placeholder.svg',
      skills: ['Social Media', 'SEO', 'Content Marketing', 'Google Ads']
    },
    {
      id: 'comm-skills',
      name: 'Communication Skills',
      category: 'soft',
      level: 'beginner',
      duration: '1-month',
      languages: ['english', 'hindi', 'assamese', 'bodo'],
      description: 'Develop effective communication for professional environments.',
      fee: 3000,
      imageUrl: '/placeholder.svg',
      skills: ['Public Speaking', 'Email Writing', 'Presentation', 'Interpersonal Skills']
    },
    {
      id: 'basic-computer',
      name: 'Basic Computer Skills',
      category: 'foundational',
      level: 'beginner',
      duration: '1-month',
      languages: ['english', 'hindi', 'assamese', 'bodo'],
      description: 'Get started with computer basics, typing, and office software.',
      fee: 2500,
      imageUrl: '/placeholder.svg',
      skills: ['MS Office', 'Computer Basics', 'Typing', 'Email']
    },
    {
      id: 'graphic-design',
      name: 'Graphic Design',
      category: 'tech',
      level: 'intermediate',
      duration: '6-month',
      languages: ['english', 'hindi'],
      description: 'Create stunning visuals using industry-standard design tools.',
      fee: 6000,
      imageUrl: '/placeholder.svg',
      skills: ['Photoshop', 'Illustrator', 'Design Principles', 'Logo Design']
    },
    {
      id: 'leadership',
      name: 'Leadership & Management',
      category: 'soft',
      level: 'advanced',
      duration: '3-month',
      languages: ['english', 'hindi'],
      description: 'Develop leadership skills to manage teams and projects effectively.',
      fee: 5500,
      imageUrl: '/placeholder.svg',
      skills: ['Team Management', 'Decision Making', 'Conflict Resolution', 'Planning']
    }
  ];

  // Filter courses based on active category and search query
  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Helper function for category label
  const getCategoryLabel = (category: CourseCategory): string => {
    switch(category) {
      case 'tech': return 'Tech Skills';
      case 'soft': return 'Soft Skills';
      case 'foundational': return 'Foundational';
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

  return (
    <Layout>
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <SectionTitle
            title="Explore Our Courses"
            subtitle="Discover practical, industry-relevant courses designed to help you develop in-demand skills."
            centered
          />

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search courses by name or keyword..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </Button>
          </div>

          {/* Category Tabs */}
          <Tabs defaultValue="all" onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="tech">Tech Skills</TabsTrigger>
              <TabsTrigger value="soft">Soft Skills</TabsTrigger>
              <TabsTrigger value="foundational">Foundational</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="tech" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="soft" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="foundational" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

// Course Card Component
const CourseCard = ({ course }: { course: Course }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow card-hover">
      <div className="aspect-w-16 aspect-h-9 bg-muted">
        <img 
          src={course.imageUrl} 
          alt={course.name} 
          className="object-cover w-full h-48"
        />
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="bg-primary/5 text-primary">
            {getCategoryLabel(course.category)}
          </Badge>
          <Badge variant={getLevelBadgeVariant(course.level)}>
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </Badge>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>{course.duration}</span>
          <div className="mx-2 h-1 w-1 rounded-full bg-muted-foreground/30"></div>
          <BookOpen className="h-4 w-4 mr-1" />
          <span>{course.languages.length} languages</span>
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
        
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-lg font-semibold">₹{course.fee}</span>
            <span className="text-muted-foreground text-sm"> /course</span>
          </div>
          
          <Button asChild>
            <Link to={`/courses/${course.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursesPage;
