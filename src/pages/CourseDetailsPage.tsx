
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Layout from '../components/Layout';
import SectionTitle from '../components/SectionTitle';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  Users, 
  Award, 
  Calendar,
  Code,
  Shield,
  Database,
  Lightbulb,
  Calculator,
  BarChart,
  Camera,
  Megaphone,
  GraduationCap,
  Briefcase,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Define course types
type CourseCategory = 'tech' | 'soft' | 'business' | 'creative';
type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
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
  curriculum: Module[];
}

interface Course {
  id: string;
  name: string;
  category: CourseCategory;
  level: CourseLevel;
  languages: CourseLanguage[];
  description: string;
  longDescription: string;
  imageUrl: string;
  skills: string[];
  icon: React.ReactNode;
  pricing: PricingOption[];
  prerequisites?: string[];
  certification?: string;
  instructors?: string[];
}

// Updated course data
const coursesData: Record<string, Course> = {
  'full-stack-development': {
    id: 'full-stack-development',
    name: 'Full Stack Development',
    category: 'tech',
    level: 'beginner',
    languages: ['english', 'hindi'],
    description: 'Master web development from frontend to backend with HTML, CSS, JavaScript, React, Node.js and more.',
    longDescription: 'This comprehensive course covers all aspects of web development from the fundamentals of HTML/CSS to advanced concepts in React and Node.js. You\'ll build real-world projects, learn version control with GitHub, and gain experience with modern deployment methods. The course also introduces you to AI tools that can enhance your development workflow and productivity.',
    imageUrl: '/placeholder.svg',
    icon: <Code className="h-5 w-5" />,
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'GitHub', 'Deployment', 'AI tools', 'Projects', 'Freelancing', 'Internship'],
    prerequisites: ['Basic computer knowledge', 'Interest in logical thinking'],
    certification: 'Chetna Academy Full Stack Developer Certificate',
    pricing: [
      {
        duration: '3-month',
        fee: 6000,
        features: [
          'HTML & CSS fundamentals',
          'Basic JavaScript',
          'Simple website projects',
          'Introduction to GitHub',
          'Community forum access',
          'Group practice sessions'
        ],
        curriculum: [
          {
            title: 'HTML & CSS Foundations',
            description: 'Learn the basics of web page structure and styling',
            topics: ['HTML document structure', 'CSS selectors', 'Box model', 'Responsive basics', 'Forms']
          },
          {
            title: 'JavaScript Essentials',
            description: 'Introduction to programming with JavaScript',
            topics: ['Variables & data types', 'Functions', 'DOM manipulation', 'Events', 'Simple projects']
          },
          {
            title: 'Web Projects',
            description: 'Build simple but complete websites',
            topics: ['Portfolio page', 'Landing page', 'GitHub basics', 'Deployment basics']
          }
        ]
      },
      {
        duration: '6-month',
        fee: 10000,
        features: [
          'Everything in the 3-month plan',
          'React fundamentals',
          'Basic backend with Node.js',
          'Database concepts',
          'More complex projects',
          'One-on-one mentoring sessions',
          'Code reviews'
        ],
        curriculum: [
          {
            title: 'HTML & CSS Advanced',
            description: 'Master advanced styling and layouts',
            topics: ['Flexbox', 'CSS Grid', 'Animations', 'SASS/SCSS', 'Responsive design patterns']
          },
          {
            title: 'JavaScript Advanced',
            description: 'Deeper dive into JavaScript concepts',
            topics: ['ES6+ features', 'Asynchronous JS', 'Fetch API', 'Local storage', 'JavaScript libraries']
          },
          {
            title: 'React Fundamentals',
            description: 'Learn the most popular frontend library',
            topics: ['Components', 'Props & state', 'Hooks', 'React Router', 'Simple React apps']
          },
          {
            title: 'Backend Basics',
            description: 'Introduction to server-side programming',
            topics: ['Node.js basics', 'Express.js', 'RESTful APIs', 'Basic database operations']
          }
        ]
      },
      {
        duration: '9-month',
        fee: 13000,
        features: [
          'Everything in the 6-month plan',
          'Advanced React concepts',
          'Full stack development',
          'Comprehensive projects',
          'MongoDB & SQL databases',
          'Authentication/Authorization',
          'Advanced deployment',
          'AI tools integration',
          'Freelancing preparation',
          'Internship opportunities'
        ],
        curriculum: [
          {
            title: 'HTML & CSS Mastery',
            description: 'Professional-level frontend styling and layout',
            topics: ['CSS architecture', 'Component design', 'Advanced animations', 'CSS frameworks', 'Accessibility']
          },
          {
            title: 'JavaScript Expert',
            description: 'Advanced JavaScript concepts and patterns',
            topics: ['Design patterns', 'Testing', 'Performance optimization', 'TypeScript basics', 'Advanced debugging']
          },
          {
            title: 'React Advanced',
            description: 'Enterprise-level React development',
            topics: ['Context API', 'Redux', 'Performance optimization', 'Custom hooks', 'Testing']
          },
          {
            title: 'Full Backend Development',
            description: 'Comprehensive server-side programming',
            topics: ['RESTful API design', 'Database design', 'Authentication', 'File uploads', 'Deployment']
          },
          {
            title: 'Full Stack Projects',
            description: 'End-to-end application development',
            topics: ['E-commerce site', 'Social media app', 'Project planning', 'Team collaboration', 'CI/CD basics']
          },
          {
            title: 'Career Preparation',
            description: 'Preparing for the job market',
            topics: ['Portfolio building', 'GitHub profile', 'Freelancing basics', 'Interview preparation', 'Internship guidance']
          }
        ]
      }
    ]
  },
  'digital-marketing': {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    category: 'tech',
    level: 'beginner',
    languages: ['english', 'hindi', 'assamese'],
    description: 'Master SEO, social media marketing, content marketing, Google Ads and analytics.',
    longDescription: 'This digital marketing course will equip you with the skills needed to promote products and services online effectively. From search engine optimization to social media marketing and paid advertising campaigns, you\'ll learn practical techniques that businesses need. The course also covers analytics for measuring campaign effectiveness and AI tools that can enhance your marketing efforts.',
    imageUrl: '/placeholder.svg',
    icon: <BarChart className="h-5 w-5" />,
    skills: ['SEO', 'SMM', 'Content Marketing', 'Google Ads', 'Analytics', 'AI Tools'],
    prerequisites: ['Basic internet knowledge', 'Social media familiarity'],
    certification: 'Chetna Academy Digital Marketing Certificate',
    pricing: [
      {
        duration: '3-month',
        fee: 6000,
        features: [
          'Digital marketing fundamentals',
          'Basic SEO',
          'Social media basics',
          'Content creation basics',
          'Introduction to analytics',
          'Practice exercises'
        ],
        curriculum: [
          {
            title: 'Digital Marketing Overview',
            description: 'Understanding the digital marketing landscape',
            topics: ['Digital marketing channels', 'Marketing funnel basics', 'Target audience', 'Brand presence', 'Marketing goals']
          },
          {
            title: 'SEO Fundamentals',
            description: 'Learn the basics of search engine optimization',
            topics: ['Keyword research', 'On-page SEO', 'Basic technical SEO', 'Content optimization', 'Local SEO basics']
          },
          {
            title: 'Social Media Marketing',
            description: 'Introduction to marketing through social platforms',
            topics: ['Platform selection', 'Content types', 'Posting strategies', 'Audience engagement', 'Basic analytics']
          }
        ]
      },
      {
        duration: '6-month',
        fee: 10000,
        features: [
          'Everything in the 3-month plan',
          'Advanced SEO techniques',
          'Social media strategy',
          'Email marketing',
          'Basic Google Ads',
          'Comprehensive analytics',
          'Content marketing strategies'
        ],
        curriculum: [
          {
            title: 'Advanced SEO',
            description: 'In-depth search engine optimization techniques',
            topics: ['Competitive analysis', 'Link building', 'Technical SEO', 'Core Web Vitals', 'SEO audit']
          },
          {
            title: 'Social Media Strategy',
            description: 'Develop comprehensive social media marketing plans',
            topics: ['Channel strategy', 'Content calendars', 'Community management', 'Paid social basics', 'Influencer marketing']
          },
          {
            title: 'Email Marketing',
            description: 'Build and manage effective email campaigns',
            topics: ['List building', 'Email design', 'Automation', 'A/B testing', 'Analytics']
          },
          {
            title: 'Google Ads Fundamentals',
            description: 'Learn the basics of paid search advertising',
            topics: ['Campaign structure', 'Keyword research', 'Ad creation', 'Budgeting', 'Performance tracking']
          }
        ]
      },
      {
        duration: '9-month',
        fee: 13000,
        features: [
          'Everything in the 6-month plan',
          'Advanced Google Ads',
          'Marketing automation',
          'Conversion optimization',
          'Digital marketing strategy',
          'Advanced analytics',
          'Agency-level project work',
          'Client management',
          'Internship opportunities'
        ],
        curriculum: [
          {
            title: 'Digital Marketing Strategy',
            description: 'Develop comprehensive marketing strategies',
            topics: ['Marketing plans', 'Budget allocation', 'Channel integration', 'Performance metrics', 'ROI analysis']
          },
          {
            title: 'Advanced Google Ads',
            description: 'Master paid search and display advertising',
            topics: ['Advanced targeting', 'Remarketing', 'Display network', 'Video ads', 'Shopping ads']
          },
          {
            title: 'Marketing Automation',
            description: 'Implement automated marketing workflows',
            topics: ['Automation tools', 'Customer journey mapping', 'Lead nurturing', 'Segmentation', 'Personalization']
          },
          {
            title: 'Conversion Rate Optimization',
            description: 'Improve website and landing page performance',
            topics: ['Landing page design', 'A/B testing', 'User experience', 'Funnel analysis', 'Behavioral marketing']
          },
          {
            title: 'Analytics & Reporting',
            description: 'Advanced measurement and analytics',
            topics: ['Google Analytics mastery', 'Custom reports', 'Data visualization', 'Attribution models', 'Dashboarding']
          },
          {
            title: 'Client Management',
            description: 'Learn to manage marketing clients',
            topics: ['Proposal writing', 'Client reporting', 'Expectations management', 'Results presentation', 'Agency operations']
          }
        ]
      }
    ]
  },
  'ui-ux-design': {
    id: 'ui-ux-design',
    name: 'UI/UX Design',
    category: 'creative',
    level: 'intermediate',
    languages: ['english', 'hindi'],
    description: 'Create seamless user experiences through wireframing, prototyping, user research and UI systems.',
    longDescription: 'This UI/UX Design course will teach you how to create user interfaces that are both beautiful and functional. You\'ll learn design principles, wireframing techniques, prototyping tools like Figma, and user research methods to validate your designs. The course also covers how to leverage AI tools to enhance your design process and productivity.',
    imageUrl: '/placeholder.svg',
    icon: <Lightbulb className="h-5 w-5" />,
    skills: ['Wireframing', 'Figma', 'User Research', 'Prototyping', 'UI Systems', 'AI-assisted Design'],
    prerequisites: ['Basic computer skills', 'Interest in visual design', 'Problem-solving mindset'],
    certification: 'Chetna Academy UI/UX Designer Certificate',
    pricing: [
      {
        duration: '3-month',
        fee: 6000,
        features: [
          'Design fundamentals',
          'Basic wireframing',
          'Introduction to Figma',
          'UI elements & components',
          'Simple prototyping',
          'Design principles'
        ],
        curriculum: [
          {
            title: 'Design Fundamentals',
            description: 'Learn the core principles of visual design',
            topics: ['Color theory', 'Typography', 'Layout principles', 'Visual hierarchy', 'Design systems basics']
          },
          {
            title: 'Wireframing & UI Elements',
            description: 'Create basic wireframes and UI components',
            topics: ['Wireframing tools', 'Common UI patterns', 'Navigation design', 'Responsive considerations', 'Mobile design basics']
          },
          {
            title: 'Figma Essentials',
            description: 'Learn the fundamentals of using Figma',
            topics: ['Interface navigation', 'Creating frames', 'Basic components', 'Simple interactions', 'Design assets']
          }
        ]
      },
      {
        duration: '6-month',
        fee: 10000,
        features: [
          'Everything in the 3-month plan',
          'Advanced UI design',
          'UX research methods',
          'Interactive prototypes',
          'Usability testing',
          'Design systems',
          'Portfolio projects',
          'AI-assisted design techniques'
        ],
        curriculum: [
          {
            title: 'Advanced UI Design',
            description: 'Create sophisticated and polished interfaces',
            topics: ['Advanced color theory', 'Microinteractions', 'Animation principles', 'Visual storytelling', 'Brand integration']
          },
          {
            title: 'UX Research & Strategy',
            description: 'Incorporate user research into the design process',
            topics: ['User interviews', 'Usability testing', 'Personas', 'User journeys', 'Information architecture']
          },
          {
            title: 'Prototyping & Interaction',
            description: 'Build interactive and animated prototypes',
            topics: ['Advanced Figma prototyping', 'Interaction design', 'Testing prototypes', 'Feedback collection', 'Iteration processes']
          },
          {
            title: 'Design Systems',
            description: 'Create and maintain scalable design systems',
            topics: ['Component libraries', 'Documentation', 'Style guides', 'Design tokens', 'System maintenance']
          },
          {
            title: 'Portfolio Development',
            description: 'Create a professional UI/UX design portfolio',
            topics: ['Case studies', 'Process documentation', 'Presentation skills', 'Portfolio website', 'Design challenges']
          }
        ]
      }
    ]
  },
  'communication-skills': {
    id: 'communication-skills',
    name: 'Communication Skills',
    category: 'soft',
    level: 'beginner',
    languages: ['english', 'hindi', 'assamese', 'bodo'],
    description: 'Develop effective verbal, written and presentation skills for professional environments.',
    longDescription: 'This course will help you master important communication skills needed in today\'s workplace. You\'ll learn how to express yourself clearly in both verbal and written forms, deliver compelling presentations, write professional emails, and collaborate effectively in teams. Through practical exercises and real-world scenarios, you\'ll gain confidence in your communication abilities.',
    imageUrl: '/placeholder.svg',
    icon: <Megaphone className="h-5 w-5" />,
    skills: ['Verbal', 'Written', 'Presentation', 'Email Writing', 'Team Collaboration'],
    prerequisites: ['Basic language proficiency'],
    certification: 'Chetna Academy Communication Skills Certificate',
    instructors: ['Priya Sharma', 'Rajiv Kalita'],
    pricing: [
      {
        duration: '1.5-month',
        fee: 3500,
        features: [
          'Communication fundamentals',
          'Basic speaking skills',
          'Simple writing exercises',
          'Introduction to presentations',
          'Group discussions'
        ],
        curriculum: [
          {
            title: 'Communication Fundamentals',
            description: 'Learn the basics of effective communication',
            topics: ['Communication process', 'Active listening', 'Non-verbal communication', 'Barriers to communication', 'Communication styles']
          },
          {
            title: 'Speaking Skills',
            description: 'Develop confidence and clarity in verbal communication',
            topics: ['Voice modulation', 'Pronunciation', 'Fluency development', 'Conversation skills', 'Simple presentations']
          },
          {
            title: 'Basic Writing Skills',
            description: 'Learn to write clear and concise messages',
            topics: ['Grammar essentials', 'Sentence structure', 'Email basics', 'Simple reports', 'Message clarity']
          }
        ]
      },
      {
        duration: '3-month',
        fee: 6000,
        features: [
          'Everything in the 1.5-month plan',
          'Advanced presentation skills',
          'Business writing',
          'Meeting facilitation',
          'Conflict resolution',
          'Personal communication style',
          'Professional email writing',
          'Interview preparation'
        ],
        curriculum: [
          {
            title: 'Advanced Verbal Communication',
            description: 'Master complex verbal communication scenarios',
            topics: ['Persuasive speaking', 'Impromptu speaking', 'Storytelling techniques', 'Handling difficult conversations', 'Cultural sensitivities']
          },
          {
            title: 'Professional Writing',
            description: 'Develop skills for various business writing needs',
            topics: ['Email etiquette', 'Business reports', 'Proposals', 'Documentation', 'Digital communication']
          },
          {
            title: 'Presentation Mastery',
            description: 'Create and deliver impactful presentations',
            topics: ['Structure and planning', 'Visual aids', 'Delivery techniques', 'Q&A handling', 'Technology use']
          },
          {
            title: 'Interpersonal Communication',
            description: 'Build effective relationships through communication',
            topics: ['Teamwork communication', 'Conflict management', 'Giving feedback', 'Receiving criticism', 'Negotiation basics']
          },
          {
            title: 'Professional Applications',
            description: 'Apply communication skills in professional contexts',
            topics: ['Job interviews', 'Networking', 'Client interactions', 'Leadership communication', 'Personal branding']
          }
        ]
      }
    ]
  }
};

// Helper functions
const getCategoryLabel = (category: CourseCategory): string => {
  switch(category) {
    case 'tech': return 'Tech Skills';
    case 'soft': return 'Soft Skills';
    case 'business': return 'Business';
    case 'creative': return 'Creative';
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
  const [selectedPricing, setSelectedPricing] = useState<string>('');
  
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

  // Set default pricing option if not selected
  if (!selectedPricing && course.pricing.length > 0) {
    setSelectedPricing(course.pricing[0].duration);
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
                  <span><strong>Duration Options:</strong> {course.pricing.map(p => p.duration).join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  <span><strong>Languages:</strong> {course.languages.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  <span><strong>Certificate:</strong> Yes (Upon Completion)</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="border shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      {course.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">Select Your Plan</h3>
                      <p className="text-muted-foreground text-sm">Coming soon - Join waitlist</p>
                    </div>
                  </div>
                  
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
                  
                  <h3 className="font-semibold text-2xl mb-1">₹{currentPricing.fee.toLocaleString()}</h3>
                  <p className="text-muted-foreground mb-4">For {currentPricing.duration} package</p>
                  
                  <div className="space-y-2 mb-6">
                    {currentPricing.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-primary shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full" asChild>
                    <Link to="/apply">Join Waitlist</Link>
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
                            <h4 className="font-medium">Multiple Duration Options</h4>
                            <p className="text-muted-foreground">Choose the plan that fits your schedule and goals</p>
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
                            <p className="text-muted-foreground">Industry-recognized certificate upon completion</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="curriculum" className="mt-0">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Course Curriculum</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground mr-2">Compare plans:</span>
                  {course.pricing.map((price) => (
                    <Button 
                      key={price.duration}
                      variant={selectedPricing === price.duration ? 'default' : 'outline'} 
                      onClick={() => setSelectedPricing(price.duration)}
                      size="sm"
                    >
                      {price.duration}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {currentPricing.curriculum.map((module, index) => (
                  <Accordion key={index} type="single" collapsible className="border rounded-md">
                    <AccordionItem value={`module-${index}`} className="border-0">
                      <AccordionTrigger className="px-4 py-3 hover:bg-muted/50">
                        <div>
                          <div className="font-medium text-lg">Module {index + 1}: {module.title}</div>
                          <div className="text-sm text-muted-foreground">{module.description}</div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <h4 className="text-sm font-medium uppercase text-muted-foreground mb-3">Topics Covered</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {module.topics.map((topic, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="mb-4 text-muted-foreground">Ready to start your learning journey?</p>
                <Button className="px-8" asChild>
                  <Link to="/apply">Join Waitlist</Link>
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
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>When will courses start?</AccordionTrigger>
                    <AccordionContent>
                      Our courses are being prepared for launch. Join the waitlist to be notified as soon as enrollment opens.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What is the difference between course durations?</AccordionTrigger>
                    <AccordionContent>
                      Longer durations offer more in-depth content, additional projects, one-on-one mentoring sessions, and career support services. 
                      Choose based on your learning goals and available time commitment. Each plan builds on the previous one, adding more advanced topics and skills.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Are there any prerequisites for these courses?</AccordionTrigger>
                    <AccordionContent>
                      Prerequisites vary by course. Basic courses typically require only fundamental computer skills, while advanced courses may require specific prior knowledge or experience. 
                      Check the specific course overview for detailed prerequisites.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Will I receive certification after completing the course?</AccordionTrigger>
                    <AccordionContent>
                      Yes, upon successful completion of course requirements, you will receive a Chetna Academy certificate that you can add to your resume and professional profiles.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How can I apply for a course?</AccordionTrigger>
                    <AccordionContent>
                      Currently, you can join our waitlist. Once courses are open for enrollment, we will notify you with application instructions.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {relatedCourse.icon}
                      </div>
                      <Badge variant="outline">
                        {getCategoryLabel(relatedCourse.category)}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-medium mb-2">{relatedCourse.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{relatedCourse.description}</p>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{relatedCourse.pricing.map(p => p.duration).join(', ')}</span>
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
