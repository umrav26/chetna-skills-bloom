
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
  const stories: SuccessStory[] = [{
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }];

  // Filter stories based on active tab
  const filteredStories = activeTab === 'all' ? stories : stories.filter(story => story.category === activeTab);
  const getCategoryLabel = (category: StoryCategory): string => {
    switch (category) {
      case 'placement':
        return 'Job Placement';
      case 'freelance':
        return 'Freelancing Success';
      case 'entrepreneurship':
        return 'Started Business';
      case 'education':
        return 'Educational Achievement';
      default:
        return '';
    }
  };
  const getCategoryIcon = (category: StoryCategory) => {
    switch (category) {
      case 'placement':
        return <Briefcase className="h-5 w-5" />;
      case 'freelance':
        return <Star className="h-5 w-5" />;
      case 'entrepreneurship':
        return <Briefcase className="h-5 w-5" />;
      case 'education':
        return <GraduationCap className="h-5 w-5" />;
      default:
        return null;
    }
  };
  const getBadgeColor = (category: StoryCategory): "default" | "secondary" | "outline" => {
    switch (category) {
      case 'placement':
        return 'default';
      case 'freelance':
        return 'secondary';
      case 'entrepreneurship':
        return 'default';
      case 'education':
        return 'outline';
      default:
        return 'outline';
    }
  };
  return (
    <Layout>
      <div>
        {/* Success Stories Section - Fixed the empty Layout by adding content */}
        <div className="container mx-auto py-12 px-4">
          <SectionTitle
            title="Success Stories" 
            subtitle="Real students, real transformations" 
            className="text-center mb-10"
          />
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-8">
              <TabsTrigger value="all">All Stories</TabsTrigger>
              <TabsTrigger value="placement">Job Placement</TabsTrigger>
              <TabsTrigger value="freelance">Freelancing</TabsTrigger>
              <TabsTrigger value="entrepreneurship">Business</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="space-y-6">
              {filteredStories.map(story => (
                <StoryCard 
                  key={story.id} 
                  story={story}
                  getCategoryLabel={getCategoryLabel}
                  getCategoryIcon={getCategoryIcon}
                  getBadgeColor={getBadgeColor}
                />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
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
  story: SuccessStory;
  getCategoryLabel: (category: StoryCategory) => string;
  getCategoryIcon: (category: StoryCategory) => JSX.Element | null;
  getBadgeColor: (category: StoryCategory) => "default" | "secondary" | "outline";
}) => {
  return <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image section */}
        {story.image && <div className="md:w-1/3">
            <div className="h-full bg-muted">
              <img src={story.image} alt={story.name} className="object-cover w-full h-full min-h-[200px]" />
            </div>
          </div>}
        
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
    </Card>;
};
export default SuccessStoriesPage;
