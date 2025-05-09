
import Layout from '../components/Layout';
import SectionTitle from '../components/SectionTitle';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Briefcase, GraduationCap } from 'lucide-react';
import { useState } from 'react';

// Define story types
type StoryCategory = 'placement' | 'freelance' | 'entrepreneurship' | 'education';

interface SuccessStory {
  id: string;
  name: string;
  age: number;
  location: string;
  course: string;
  category: StoryCategory;
  story: string;
  outcome: string;
  quote: string;
  image?: string;
}

const SuccessStoriesPage = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Sample success stories
  const stories: SuccessStory[] = [
    {
      id: 'story1',
      name: 'Priyanka Das',
      age: 23,
      location: 'Kokrajhar',
      course: 'Web Development',
      category: 'placement',
      story: 'After completing her degree, Priyanka struggled to find employment due to lack of practical skills. She joined our 3-month Web Development course and learned HTML, CSS, JavaScript, and React. With dedicated practice and project work, she built a portfolio that impressed employers.',
      outcome: 'Hired as a Junior Web Developer at a tech startup in Guwahati with a competitive salary.',
      quote: 'The practical approach at Chetna Academy gave me confidence and skills that my degree couldn\'t. I can now build real projects that solve real problems.',
      image: '/placeholder.svg'
    },
    {
      id: 'story2',
      name: 'Rahul Sharma',
      age: 20,
      location: 'Dibrugarh',
      course: 'Digital Marketing',
      category: 'freelance',
      story: 'Rahul was a college student looking for ways to earn while studying. He enrolled in our Digital Marketing course and quickly grasped concepts like social media marketing, SEO, and content creation. He started by helping local businesses with their online presence.',
      outcome: 'Now manages social media accounts for 5 local businesses as a freelancer, earning enough to support himself through college.',
      quote: 'I never thought I could earn a decent income while still in college. The skills I learned at Chetna Academy opened a whole new career path for me.',
      image: '/placeholder.svg'
    },
    {
      id: 'story3',
      name: 'Meena Borah',
      age: 25,
      location: 'Tezpur',
      course: 'Graphic Design',
      category: 'entrepreneurship',
      story: 'After working odd jobs, Meena discovered her passion for design through our Graphic Design course. She learned fundamentals of design, software skills, and business practices. After completing the course, she started creating designs for local events.',
      outcome: 'Founded her own small design studio that now serves clients across Assam, employing two other Chetna Academy graduates.',
      quote: 'The mentorship I received didn\'t just teach me design, but also how to turn my skills into a business that supports my family.',
      image: '/placeholder.svg'
    },
    {
      id: 'story4',
      name: 'Akash Gogoi',
      age: 19,
      location: 'Jorhat',
      course: 'Basic Computer Skills',
      category: 'education',
      story: 'Coming from a village with limited exposure to technology, Akash initially struggled with basic computer operations. After completing our foundational course, he not only mastered computers but developed a passion for technology.',
      outcome: 'Secured admission in a reputed Computer Science program with a scholarship, becoming the first in his family to attend college.',
      quote: 'Before joining Chetna Academy, I had never used a computer properly. Today, I\'m pursuing my dream of becoming a software engineer.',
      image: '/placeholder.svg'
    },
    {
      id: 'story5',
      name: 'Nirmali Deka',
      age: 22,
      location: 'Bongaigaon',
      course: 'Communication Skills',
      category: 'placement',
      story: 'Despite having technical knowledge, Nirmali struggled in interviews due to communication barriers. Our Communication Skills course helped her develop confidence, interview techniques, and professional communication abilities.',
      outcome: 'Successfully cleared interviews at multiple companies and secured a position at a multinational corporation.',
      quote: 'Learning to express myself confidently was the missing piece in my career journey. The practical interview simulations were incredibly helpful.',
      image: '/placeholder.svg'
    }
  ];

  // Filter stories based on active tab
  const filteredStories = activeTab === 'all' 
    ? stories 
    : stories.filter(story => story.category === activeTab);

  const getCategoryLabel = (category: StoryCategory): string => {
    switch(category) {
      case 'placement': return 'Job Placement';
      case 'freelance': return 'Freelancing Success';
      case 'entrepreneurship': return 'Started Business';
      case 'education': return 'Educational Achievement';
      default: return '';
    }
  };

  const getCategoryIcon = (category: StoryCategory) => {
    switch(category) {
      case 'placement': return <Briefcase className="h-5 w-5" />;
      case 'freelance': return <Star className="h-5 w-5" />;
      case 'entrepreneurship': return <Briefcase className="h-5 w-5" />;
      case 'education': return <GraduationCap className="h-5 w-5" />;
      default: return null;
    }
  };

  const getBadgeColor = (category: StoryCategory): "default" | "secondary" | "outline" => {
    switch(category) {
      case 'placement': return 'default';
      case 'freelance': return 'secondary';
      case 'entrepreneurship': return 'default';
      case 'education': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h1 className="heading-lg mb-4">Success Stories</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Real transformations and achievements from our students across Assam and beyond.
          </p>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16">
        <div className="container">
          <SectionTitle 
            title="From Learning to Earning" 
            subtitle="Discover how our students transformed their skills into careers, businesses, and opportunities."
            centered={true}
          />

          {/* Category Tabs */}
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="mb-8">
            <TabsList className="mb-8 flex flex-wrap justify-center">
              <TabsTrigger value="all">All Stories</TabsTrigger>
              <TabsTrigger value="placement">Job Placements</TabsTrigger>
              <TabsTrigger value="freelance">Freelancing</TabsTrigger>
              <TabsTrigger value="entrepreneurship">Entrepreneurship</TabsTrigger>
              <TabsTrigger value="education">Educational</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="space-y-8">
                {filteredStories.map((story) => (
                  <StoryCard key={story.id} story={story} getCategoryLabel={getCategoryLabel} getCategoryIcon={getCategoryIcon} getBadgeColor={getBadgeColor} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="placement" className="mt-0">
              <div className="space-y-8">
                {filteredStories.map((story) => (
                  <StoryCard key={story.id} story={story} getCategoryLabel={getCategoryLabel} getCategoryIcon={getCategoryIcon} getBadgeColor={getBadgeColor} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="freelance" className="mt-0">
              <div className="space-y-8">
                {filteredStories.map((story) => (
                  <StoryCard key={story.id} story={story} getCategoryLabel={getCategoryLabel} getCategoryIcon={getCategoryIcon} getBadgeColor={getBadgeColor} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="entrepreneurship" className="mt-0">
              <div className="space-y-8">
                {filteredStories.map((story) => (
                  <StoryCard key={story.id} story={story} getCategoryLabel={getCategoryLabel} getCategoryIcon={getCategoryIcon} getBadgeColor={getBadgeColor} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="education" className="mt-0">
              <div className="space-y-8">
                {filteredStories.map((story) => (
                  <StoryCard key={story.id} story={story} getCategoryLabel={getCategoryLabel} getCategoryIcon={getCategoryIcon} getBadgeColor={getBadgeColor} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-foreground mb-2">500+</div>
              <p className="text-primary-foreground/80">Students Trained</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-foreground mb-2">85%</div>
              <p className="text-primary-foreground/80">Job Placement Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-foreground mb-2">150+</div>
              <p className="text-primary-foreground/80">Freelance Success Stories</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-foreground mb-2">35+</div>
              <p className="text-primary-foreground/80">Businesses Started</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16">
        <div className="container">
          <SectionTitle 
            title="Video Success Stories" 
            subtitle="Watch our students share their journey and transformation in their own words."
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-hidden card-hover">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-muted-foreground">Video Placeholder</div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">Student Name</h3>
                  <p className="text-sm text-muted-foreground">Web Development Graduate</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <SectionTitle 
            title="Before & After" 
            subtitle="See the tangible impact of skill development on our students' lives and careers."
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="relative">
                <div className="absolute -left-4 -top-4 bg-primary text-primary-foreground text-sm px-3 py-1 rounded-md">BEFORE</div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Deepak, 24 - Digital Marketing Graduate</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        Struggling to find employment after graduation
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        No practical skills despite academic knowledge
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        Financial dependence on family
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        Low confidence in professional settings
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        Limited digital literacy despite Gen-Z status
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <div className="relative">
                <div className="absolute -left-4 -top-4 bg-green-600 text-white text-sm px-3 py-1 rounded-md">AFTER</div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Deepak, 24 - Digital Marketing Graduate</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        Working as Digital Marketing Specialist at an agency
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        Managing campaigns for multiple clients
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        Financially independent with steady income
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        Confident in presenting ideas to clients
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        Mentoring other students in their digital journey
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="relative">
                <div className="absolute -left-4 -top-4 bg-primary text-primary-foreground text-sm px-3 py-1 rounded-md">BEFORE</div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Ritika, 21 - Graphic Design Graduate</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        Rural background with limited tech exposure
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        Artistic talent but no formal training
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        No knowledge of design software
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        Uncertain career path after high school
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        Limited awareness of creative career options
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <div className="relative">
                <div className="absolute -left-4 -top-4 bg-green-600 text-white text-sm px-3 py-1 rounded-md">AFTER</div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Ritika, 21 - Graphic Design Graduate</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        Professional freelance graphic designer
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        Created brand identities for 10+ local businesses
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        Proficient in industry-standard design software
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        Building a diverse design portfolio
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-lg">•</span>
                        Teaching basic design to youth in her village
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="container max-w-3xl">
          <h2 className="heading-lg mb-6">Write Your Own Success Story</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students who have transformed their lives through practical skill development at Chetna Academy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/courses" className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors">
              Explore Courses
            </a>
            <a href="/contact" className="px-6 py-3 border border-input bg-background rounded-md font-medium hover:bg-muted transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Story Card Component
const StoryCard = ({ 
  story,
  getCategoryLabel,
  getCategoryIcon,
  getBadgeColor
}: { 
  story: SuccessStory, 
  getCategoryLabel: (category: StoryCategory) => string,
  getCategoryIcon: (category: StoryCategory) => JSX.Element | null,
  getBadgeColor: (category: StoryCategory) => "default" | "secondary" | "outline"
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image section */}
        {story.image && (
          <div className="md:w-1/3">
            <div className="h-full bg-muted">
              <img 
                src={story.image} 
                alt={story.name} 
                className="object-cover w-full h-full min-h-[200px]"
              />
            </div>
          </div>
        )}
        
        {/* Content section */}
        <div className={`${story.image ? 'md:w-2/3' : 'w-full'} p-6`}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold">{story.name}</h3>
            <Badge variant={getBadgeColor(story.category)} className="flex items-center gap-1">
              {getCategoryIcon(story.category)}
              {getCategoryLabel(story.category)}
            </Badge>
          </div>
          
          <div className="text-sm text-muted-foreground mb-4">
            <span>{story.age} years, {story.location}</span>
            <span className="mx-2">•</span>
            <span className="font-medium text-primary">{story.course} Graduate</span>
          </div>
          
          <div className="my-4">
            <p className="text-muted-foreground mb-2">{story.story}</p>
            <p className="font-medium">{story.outcome}</p>
          </div>
          
          <div className="mt-6 border-l-4 border-primary pl-4 italic text-muted-foreground">
            "{story.quote}"
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SuccessStoriesPage;
