
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Layout from '../components/Layout';
import SectionTitle from '../components/SectionTitle';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, BookOpen, Clock, Users, Award, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define course types
type CourseCategory = 'tech' | 'soft' | 'foundational';
type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
type CourseDuration = '1-month' | '3-month' | '6-month' | '9-month';
type CourseLanguage = 'english' | 'hindi' | 'assamese' | 'bodo';

interface Module {
  title: string;
  description: string;
  topics: string[];
}

interface PricingOption {
  duration: string;
  fee: number;
  features: string[];
}

interface Course {
  id: string;
  name: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: CourseDuration;
  languages: CourseLanguage[];
  description: string;
  longDescription: string;
  fee: number;
  imageUrl: string;
  skills: string[];
  modules: Module[];
  pricing: PricingOption[];
  instructors?: string[];
  prerequisites?: string[];
  certification?: string;
}

// Dummy course data - would be replaced with actual data from API/database
const coursesData: Record<string, Course> = {
  'web-dev': {
    id: 'web-dev',
    name: 'Web Development',
    category: 'tech',
    level: 'beginner',
    duration: '3-month',
    languages: ['english', 'hindi'],
    description: 'Learn HTML, CSS, JavaScript and build responsive websites from scratch.',
    longDescription: 'This comprehensive web development course is designed for beginners who want to learn how to build modern, responsive websites. Starting with HTML and CSS fundamentals, you\'ll progress to JavaScript programming and eventually learn how to create dynamic web applications. By the end of this course, you\'ll have built multiple real-world projects that you can add to your portfolio.',
    fee: 5000,
    imageUrl: '/placeholder.svg',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    modules: [
      {
        title: 'HTML & CSS Basics',
        description: 'Learn the fundamentals of web page structure and styling',
        topics: ['HTML document structure', 'CSS selectors and properties', 'Box model', 'Flexbox layout', 'CSS Grid']
      },
      {
        title: 'JavaScript Fundamentals',
        description: 'Master core JavaScript concepts and DOM manipulation',
        topics: ['JavaScript syntax', 'Variables and data types', 'Functions and events', 'DOM manipulation', 'JSON and fetch API']
      },
      {
        title: 'Responsive Web Design',
        description: 'Create websites that work on all devices and screen sizes',
        topics: ['Media queries', 'Viewport units', 'Mobile-first approach', 'CSS frameworks', 'Responsive layouts']
      },
      {
        title: 'Web Projects',
        description: 'Build real-world websites and applications',
        topics: ['Project planning', 'Git version control', 'Portfolio website', 'E-commerce website', 'Deployment']
      }
    ],
    pricing: [
      {
        duration: '3-month',
        fee: 5000,
        features: ['Basic curriculum access', 'Weekly assignments', 'Community forum access']
      },
      {
        duration: '6-month',
        fee: 9000,
        features: ['Complete curriculum access', 'Weekly assignments', 'Community forum access', '2 one-on-one sessions', 'Project reviews']
      },
      {
        duration: '9-month',
        fee: 12000,
        features: ['Complete curriculum access', 'Weekly assignments', 'Community forum access', '5 one-on-one sessions', 'Project reviews', 'Job preparation', 'Internship opportunities']
      }
    ],
    prerequisites: ['Basic computer skills', 'Familiarity with internet browsing'],
    certification: 'Chetna Academy Web Development Certificate'
  },
  'digital-marketing': {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    category: 'tech',
    level: 'beginner',
    duration: '3-month',
    languages: ['english', 'hindi', 'assamese'],
    description: 'Master social media marketing, SEO, SEM, and content strategies.',
    longDescription: 'This digital marketing course covers everything you need to know to market products and services online effectively. From search engine optimization to social media marketing and paid advertising campaigns, you\'ll learn practical skills that are in high demand. This course combines theory with hands-on practice to give you real-world experience.',
    fee: 4500,
    imageUrl: '/placeholder.svg',
    skills: ['Social Media', 'SEO', 'Content Marketing', 'Google Ads'],
    modules: [
      {
        title: 'Digital Marketing Fundamentals',
        description: 'Understand the digital marketing landscape and key concepts',
        topics: ['Marketing principles', 'Digital channels overview', 'Target audience', 'Marketing funnel', 'Analytics basics']
      },
      {
        title: 'Search Engine Optimization (SEO)',
        description: 'Learn how to improve website ranking on search engines',
        topics: ['On-page SEO', 'Off-page SEO', 'Technical SEO', 'Keyword research', 'SEO tools']
      },
      {
        title: 'Social Media Marketing',
        description: 'Create effective social media strategies across platforms',
        topics: ['Platform selection', 'Content creation', 'Community management', 'Paid social advertising', 'Analytics and reporting']
      },
      {
        title: 'Content Marketing',
        description: 'Develop content strategies that drive engagement and conversions',
        topics: ['Content planning', 'Blogging', 'Video marketing', 'Email marketing', 'Content distribution']
      }
    ],
    pricing: [
      {
        duration: '3-month',
        fee: 4500,
        features: ['Core modules', 'Practice assignments', 'Digital marketing tools introduction']
      },
      {
        duration: '6-month',
        fee: 8000,
        features: ['All core modules', 'Advanced topics', 'Real campaign experience', 'Marketing tools access', 'One-on-one mentorship']
      },
      {
        duration: '9-month',
        fee: 11000,
        features: ['Complete curriculum', 'Advanced certification prep', 'Portfolio development', 'Internship placement', 'Career counseling']
      }
    ],
    prerequisites: ['Basic internet knowledge', 'Social media familiarity'],
    certification: 'Chetna Academy Digital Marketing Certificate'
  },
  'comm-skills': {
    id: 'comm-skills',
    name: 'Communication Skills',
    category: 'soft',
    level: 'beginner',
    duration: '1-month',
    languages: ['english', 'hindi', 'assamese', 'bodo'],
    description: 'Develop effective communication for professional environments.',
    longDescription: 'Strong communication skills are essential in today\'s workplace. This course will help you improve both verbal and written communication, build confidence in public speaking, and enhance your interpersonal skills. You\'ll learn through practical exercises, role-playing, and real-world scenarios.',
    fee: 3000,
    imageUrl: '/placeholder.svg',
    skills: ['Public Speaking', 'Email Writing', 'Presentation', 'Interpersonal Skills'],
    modules: [
      {
        title: 'Verbal Communication',
        description: 'Improve speaking clarity, confidence and impact',
        topics: ['Voice modulation', 'Active listening', 'Conversation skills', 'Public speaking', 'Storytelling']
      },
      {
        title: 'Written Communication',
        description: 'Master professional writing for various contexts',
        topics: ['Email etiquette', 'Business writing', 'Report writing', 'Digital communication', 'Grammar essentials']
      },
      {
        title: 'Presentation Skills',
        description: 'Create and deliver compelling presentations',
        topics: ['Structure and planning', 'Visual aids', 'Delivery techniques', 'Handling Q&A', 'Technical presentations']
      },
      {
        title: 'Interpersonal Communication',
        description: 'Build stronger professional relationships',
        topics: ['Team communication', 'Conflict resolution', 'Negotiation skills', 'Feedback techniques', 'Cultural awareness']
      }
    ],
    pricing: [
      {
        duration: '1-month',
        fee: 3000,
        features: ['Fundamental communication principles', 'Basic exercises', 'Group practice sessions']
      },
      {
        duration: '3-month',
        fee: 7500,
        features: ['Comprehensive curriculum', 'Video recording analysis', 'Personalized feedback', 'Mock interviews', 'Communication toolkit']
      },
      {
        duration: '6-month',
        fee: 12000,
        features: ['Advanced communication techniques', 'Leadership communication', 'Industry-specific scenarios', 'Personal branding', 'Individual coaching']
      }
    ],
    instructors: ['Priya Sharma', 'Rajiv Kalita'],
    certification: 'Chetna Academy Communication Excellence Certificate'
  }
};

// Helper functions from CoursesPage
const getCategoryLabel = (category: CourseCategory): string => {
  switch(category) {
    case 'tech': return 'Tech Skills';
    case 'soft': return 'Soft Skills';
    case 'foundational': return 'Foundational';
    default: return 'Unknown';
  }
};

const getLevelBadgeVariant = (level: CourseLevel): "default" | "secondary" | "outline" => {
  switch(level) {
    case 'beginner': return 'outline';
    case 'intermediate': return 'secondary';
    case 'advanced': return 'default';
    default: return 'outline';
  }
};

const CourseDetailsPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [selectedTab, setSelectedTab] = useState<string>('overview');
  const [selectedPricing, setSelectedPricing] = useState<string>('3-month');
  
  // Get course data or show not found
  const course = coursesData[courseId || ''];
  
  if (!course) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
          <p className="mb-8">The course you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/courses">Browse Courses</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Get pricing options
  const currentPricing = course.pricing.find(p => p.duration === selectedPricing) || course.pricing[0];

  return (
    <Layout>
      {/* Course Header */}
      <section className="bg-muted/30 py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex gap-2 mb-4">
                <Badge variant="outline" className="bg-primary/5 text-primary">
                  {getCategoryLabel(course.category)}
                </Badge>
                <Badge variant={getLevelBadgeVariant(course.level)}>
                  {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.name}</h1>
              <p className="text-lg text-muted-foreground mb-6">{course.longDescription}</p>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <span><strong>Duration:</strong> {course.duration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  <span><strong>Languages:</strong> {course.languages.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  <span><strong>Certificate:</strong> Yes</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="border shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-2xl mb-2">₹{currentPricing.fee}</h3>
                  <p className="text-muted-foreground mb-4">For {currentPricing.duration} package</p>
                  
                  <div className="flex gap-2 mb-6">
                    {course.pricing.map((price) => (
                      <Button 
                        key={price.duration}
                        variant={selectedPricing === price.duration ? 'default' : 'outline'} 
                        onClick={() => setSelectedPricing(price.duration)}
                        className="flex-1"
                      >
                        {price.duration}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {currentPricing.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-primary shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full" asChild>
                    <Link to="/apply">Apply Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Course Content Tabs */}
      <section className="py-12">
        <div className="container">
          <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none mb-6 bg-transparent p-0 h-auto">
              <div className="flex overflow-x-auto">
                <TabsTrigger 
                  value="overview" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="curriculum" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Curriculum
                </TabsTrigger>
                <TabsTrigger 
                  value="instructors" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Instructors
                </TabsTrigger>
                <TabsTrigger 
                  value="faq" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  FAQ
                </TabsTrigger>
              </div>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-semibold mb-4">Course Overview</h2>
                  <p className="mb-6">{course.longDescription}</p>
                  
                  <h3 className="text-xl font-medium mb-3">Skills You'll Gain</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                  
                  {course.prerequisites && (
                    <>
                      <h3 className="text-xl font-medium mb-3">Prerequisites</h3>
                      <ul className="list-disc pl-5 mb-6">
                        {course.prerequisites.map((prereq, index) => (
                          <li key={index} className="mb-1">{prereq}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {course.certification && (
                    <>
                      <h3 className="text-xl font-medium mb-3">Certification</h3>
                      <p className="mb-6">
                        Upon successful completion of this course, you will receive:
                        <span className="block mt-2 font-medium">{course.certification}</span>
                      </p>
                    </>
                  )}
                </div>
                
                <div className="md:col-span-1">
                  <Card className="bg-muted/30">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-medium mb-4">Course Highlights</h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Calendar className="h-5 w-5 mr-3 text-primary" />
                          <div>
                            <h4 className="font-medium">Course Duration</h4>
                            <p className="text-muted-foreground">Options for 3, 6, or 9 months</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <BookOpen className="h-5 w-5 mr-3 text-primary" />
                          <div>
                            <h4 className="font-medium">Learning Format</h4>
                            <p className="text-muted-foreground">Interactive modules with practical assignments</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Users className="h-5 w-5 mr-3 text-primary" />
                          <div>
                            <h4 className="font-medium">Batch Size</h4>
                            <p className="text-muted-foreground">Limited to ensure personal attention</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Award className="h-5 w-5 mr-3 text-primary" />
                          <div>
                            <h4 className="font-medium">Certification</h4>
                            <p className="text-muted-foreground">Industry-recognized certificate</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="curriculum" className="mt-0">
              <h2 className="text-2xl font-semibold mb-6">Course Curriculum</h2>
              <div className="space-y-6">
                {course.modules.map((module, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-medium mb-2">Module {index + 1}: {module.title}</h3>
                      <p className="text-muted-foreground mb-4">{module.description}</p>
                      <h4 className="text-sm font-medium uppercase text-muted-foreground mb-2">Topics Covered</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {module.topics.map((topic, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="mb-4 text-muted-foreground">Ready to start your learning journey?</p>
                <Button className="px-8" asChild>
                  <Link to="/apply">Apply Now</Link>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="instructors" className="mt-0">
              <h2 className="text-2xl font-semibold mb-6">Course Instructors</h2>
              {course.instructors && course.instructors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {course.instructors.map((instructor, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="aspect-square bg-muted flex items-center justify-center">
                        <span className="text-4xl opacity-20">{instructor.charAt(0)}</span>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-medium mb-2">{instructor}</h3>
                        <p className="text-muted-foreground mb-3">Expert Instructor</p>
                        <p>Our instructors have years of industry and teaching experience, ensuring you receive practical, relevant training.</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-muted/30">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
                    <p>Our team of expert instructors is being assembled. We'll announce our faculty before course launch.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="faq" className="mt-0">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-5">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-2">When will courses start?</h3>
                    <p className="text-muted-foreground">Our courses are being prepared for launch. Join the waitlist to be notified as soon as enrollment opens.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-2">What is the difference between course durations?</h3>
                    <p className="text-muted-foreground">Longer durations offer more in-depth content, additional projects, one-on-one mentoring sessions, and career support services. Choose based on your learning goals and available time commitment.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-2">Are there any prerequisites for these courses?</h3>
                    <p className="text-muted-foreground">Prerequisites vary by course. Basic courses typically require only fundamental computer skills, while advanced courses may require specific prior knowledge or experience.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-2">Will I receive certification after completing the course?</h3>
                    <p className="text-muted-foreground">Yes, upon successful completion of course requirements, you will receive a Chetna Academy certificate that you can add to your resume and professional profiles.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-2">How can I apply for a course?</h3>
                    <p className="text-muted-foreground">Currently, you can join our waitlist. Once courses are open for enrollment, we will notify you with application instructions.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Related Courses */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-semibold mb-6">Related Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(coursesData)
              .filter(c => c.id !== course.id && c.category === course.category)
              .slice(0, 3)
              .map((relatedCourse) => (
                <Card key={relatedCourse.id} className="overflow-hidden">
                  <div className="p-4 border-b">
                    <Badge variant="outline" className="mb-2">
                      {getCategoryLabel(relatedCourse.category)}
                    </Badge>
                    <h3 className="text-lg font-medium mb-2">{relatedCourse.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{relatedCourse.description}</p>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{relatedCourse.duration}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-background">
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/courses/${relatedCourse.id}`}>View Details</Link>
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CourseDetailsPage;
