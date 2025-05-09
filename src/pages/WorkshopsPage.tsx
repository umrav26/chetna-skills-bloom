
import { useState } from 'react';
import Layout from '../components/Layout';
import SectionTitle from '../components/SectionTitle';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define workshop types
type WorkshopType = 'school' | 'college' | 'community';

interface Workshop {
  id: string;
  title: string;
  date: string;
  location: string;
  type: WorkshopType;
  description: string;
  capacity: number;
  registrations: number;
  free: boolean;
  image?: string;
}

const WorkshopsPage = () => {
  const [activeTab, setActiveTab] = useState<string>('upcoming');
  
  // Sample workshop data
  const workshops: Workshop[] = [
    {
      id: 'ws1',
      title: 'Introduction to Web Development',
      date: 'June 15, 2025',
      location: 'Government College, Kokrajhar',
      type: 'college',
      description: 'A comprehensive introduction to modern web development technologies including HTML, CSS and JavaScript basics.',
      capacity: 50,
      registrations: 32,
      free: true,
      image: '/placeholder.svg'
    },
    {
      id: 'ws2',
      title: 'Digital Marketing Essentials',
      date: 'June 20, 2025',
      location: 'Community Hall, Guwahati',
      type: 'community',
      description: 'Learn the fundamentals of digital marketing including social media, SEO, and content creation strategies.',
      capacity: 40,
      registrations: 28,
      free: true,
      image: '/placeholder.svg'
    },
    {
      id: 'ws3',
      title: 'Career Skills for High School Students',
      date: 'June 25, 2025',
      location: 'Central School, Bongaigaon',
      type: 'school',
      description: 'Helping students prepare for future careers with essential soft skills and digital literacy training.',
      capacity: 60,
      registrations: 45,
      free: true,
      image: '/placeholder.svg'
    },
    {
      id: 'ws4',
      title: 'Communication Skills Workshop',
      date: 'July 5, 2025',
      location: 'Tech Hub, Dibrugarh',
      type: 'community',
      description: 'Improve your verbal and written communication skills for professional environments.',
      capacity: 30,
      registrations: 12,
      free: true,
      image: '/placeholder.svg'
    },
    {
      id: 'ws5',
      title: 'Basic Computer Skills',
      date: 'July 12, 2025',
      location: 'Government School, Tezpur',
      type: 'school',
      description: 'Introduction to computers, basic software usage and internet skills for beginners.',
      capacity: 35,
      registrations: 20,
      free: true,
      image: '/placeholder.svg'
    }
  ];

  // Past workshops (sample data)
  const pastWorkshops: Workshop[] = [
    {
      id: 'past1',
      title: 'Python for Beginners',
      date: 'May 10, 2025',
      location: 'Engineering College, Guwahati',
      type: 'college',
      description: 'Introduction to Python programming language and basic concepts.',
      capacity: 45,
      registrations: 45,
      free: true,
      image: '/placeholder.svg'
    },
    {
      id: 'past2',
      title: 'Resume Building Workshop',
      date: 'May 5, 2025',
      location: 'Youth Center, Silchar',
      type: 'community',
      description: 'Learn how to create effective resumes that stand out to employers.',
      capacity: 30,
      registrations: 28,
      free: true,
      image: '/placeholder.svg'
    }
  ];

  const getWorkshopTypeLabel = (type: WorkshopType): string => {
    switch(type) {
      case 'school': return 'School';
      case 'college': return 'College';
      case 'community': return 'Community';
      default: return 'Unknown';
    }
  };

  const getBadgeVariant = (type: WorkshopType): "default" | "secondary" | "outline" => {
    switch(type) {
      case 'school': return 'secondary';
      case 'college': return 'default';
      case 'community': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h1 className="heading-lg mb-4">Workshops & Seminars</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Free skill development workshops and seminars for schools, colleges, and communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <a href="#upcoming">Upcoming Workshops</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#host">Host a Workshop</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Workshops Listing */}
      <section id="upcoming" className="py-16">
        <div className="container">
          <SectionTitle 
            title="Workshops & Seminars" 
            subtitle="Free skill development sessions hosted at schools, colleges, and community centers."
            centered={true}
          />

          <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workshops.map((workshop) => (
                  <WorkshopCard 
                    key={workshop.id} 
                    workshop={workshop} 
                    getWorkshopTypeLabel={getWorkshopTypeLabel}
                    getBadgeVariant={getBadgeVariant}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="past" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastWorkshops.map((workshop) => (
                  <WorkshopCard 
                    key={workshop.id} 
                    workshop={workshop} 
                    getWorkshopTypeLabel={getWorkshopTypeLabel}
                    getBadgeVariant={getBadgeVariant}
                    isPast={true}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <SectionTitle 
            title="Workshop Gallery" 
            subtitle="Moments from our past workshops and the impact we've created together."
            centered={true}
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="aspect-square bg-muted rounded-md overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt={`Workshop gallery image ${index + 1}`} 
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline">
              View More Photos
            </Button>
          </div>
        </div>
      </section>

      {/* Host a Workshop Section */}
      <section id="host" className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle 
                title="Host a Workshop" 
                subtitle="Bring Chetna Academy's skill development workshops to your school, college, or community."
                centered={false}
              />
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">Who can request a workshop?</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Educational institutions (schools, colleges, universities)</li>
                    <li>Community organizations and NGOs</li>
                    <li>Government departments focusing on skill development</li>
                    <li>Youth groups and student organizations</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Available Workshop Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Basic Computer Skills</Badge>
                    <Badge>Digital Marketing</Badge>
                    <Badge>Web Development</Badge>
                    <Badge>Communication Skills</Badge>
                    <Badge>Career Guidance</Badge>
                    <Badge>Entrepreneurship</Badge>
                    <Badge>Financial Literacy</Badge>
                    <Badge>Graphic Design</Badge>
                  </div>
                </div>
                
                <Button asChild>
                  <Link to="/contact?subject=Host%20a%20Workshop">Request a Workshop</Link>
                </Button>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Workshop Request Form</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Organization Name</label>
                      <input 
                        id="name" 
                        type="text" 
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="School/College/Organization name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact" className="text-sm font-medium">Contact Person</label>
                      <input 
                        id="contact" 
                        type="text" 
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Full name"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input 
                      id="email" 
                      type="email" 
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Your email address"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                    <input 
                      id="phone" 
                      type="tel" 
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="topic" className="text-sm font-medium">Workshop Topic</label>
                    <select id="topic" className="w-full px-3 py-2 border rounded-md">
                      <option value="">Select a topic</option>
                      <option value="basic-computer">Basic Computer Skills</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="web-dev">Web Development</option>
                      <option value="communication">Communication Skills</option>
                      <option value="career">Career Guidance</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Additional Information</label>
                    <textarea 
                      id="message" 
                      rows={3}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Expected number of participants, location details, etc."
                    ></textarea>
                  </div>
                  
                  <Button type="submit" className="w-full">Submit Request</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h2 className="heading-lg mb-8">What Participants Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="text-4xl text-muted-foreground/30 font-serif mb-4">"</div>
                  <p className="text-muted-foreground mb-6">
                    The workshop was very informative and practical. I learned skills that I can immediately apply in my studies and future career. The trainers were knowledgeable and approachable.
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-muted mr-3"></div>
                    <div className="text-left">
                      <div className="font-medium">Student Name</div>
                      <div className="text-sm text-muted-foreground">College Student, Workshop Participant</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Workshop Card Component
const WorkshopCard = ({ 
  workshop, 
  getWorkshopTypeLabel, 
  getBadgeVariant,
  isPast = false
}: { 
  workshop: Workshop, 
  getWorkshopTypeLabel: (type: WorkshopType) => string,
  getBadgeVariant: (type: WorkshopType) => "default" | "secondary" | "outline",
  isPast?: boolean
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow card-hover">
      {workshop.image && (
        <div className="aspect-w-16 aspect-h-9 bg-muted">
          <img 
            src={workshop.image} 
            alt={workshop.title} 
            className="object-cover w-full h-48"
          />
        </div>
      )}
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <Badge variant={getBadgeVariant(workshop.type)}>
            {getWorkshopTypeLabel(workshop.type)}
          </Badge>
          {workshop.free && (
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
              Free
            </Badge>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-3">{workshop.title}</h3>
        
        <div className="space-y-2 text-muted-foreground mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{workshop.date}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{workshop.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            <span>{workshop.registrations} / {workshop.capacity} registered</span>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {workshop.description}
        </p>
        
        <div className="mt-4">
          {!isPast ? (
            <Button asChild className="w-full">
              <Link to={`/workshops/${workshop.id}`}>
                Register Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline" className="w-full">
              <Link to={`/workshops/${workshop.id}`}>
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkshopsPage;
