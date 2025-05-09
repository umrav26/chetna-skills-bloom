
import Layout from '../components/Layout';
import SectionTitle from '../components/SectionTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Users, Award, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Rajat Kumar',
      role: 'Founder & Lead Trainer',
      bio: 'Educational expert with 8+ years of experience in skill development programs.',
      image: '/placeholder.svg'
    },
    {
      name: 'Priya Singh',
      role: 'Program Director',
      bio: 'Former teacher with passion for bringing tech education to rural communities.',
      image: '/placeholder.svg'
    },
    {
      name: 'Amit Gogoi',
      role: 'Technical Instructor',
      bio: 'Software developer turned educator with expertise in web technologies.',
      image: '/placeholder.svg'
    }
  ];

  const whyChooseReasons = [
    {
      icon: <GraduationCap className="h-8 w-8 text-primary" />,
      title: 'Practical Learning',
      description: 'Hands-on projects and real-world applications in every course.'
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Local-to-Global Approach',
      description: 'Courses designed for local needs with global skill standards.'
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: 'Industry-Aligned',
      description: 'Curriculum developed with input from industry professionals.'
    },
    {
      icon: <Handshake className="h-8 w-8 text-primary" />,
      title: 'Mentorship Network',
      description: 'Ongoing support from experienced mentors even after course completion.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h1 className="heading-lg mb-4">About Chetna Academy</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Empowering youth across India with practical skills through affordable, hands-on training and mentorship.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle 
                title="Our Story" 
                subtitle="From a small classroom in Kokrajhar to a vision that spans across India."
                centered={false}
              />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Chetna Academy was founded in 2023 with a simple mission: to bridge the gap between traditional education and the skills needed in today's job market, particularly for youth from rural and semi-urban regions of India.
                </p>
                <p>
                  What started as a small initiative in Kokrajhar, Assam, quickly grew as we witnessed the transformative impact of practical skill training on students' lives. Many of our first batch of students went on to secure jobs or start freelance careers within months of completing their training.
                </p>
                <p>
                  Today, we're expanding our reach across multiple states, while maintaining our core principles of affordability, practicality, and community-centered approach to education.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-6 lg:p-8">
              <h3 className="font-heading text-xl font-semibold mb-4">The Problem We're Solving</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">1</div>
                  <div>
                    <strong className="font-medium">Skills Gap</strong>
                    <p className="text-muted-foreground">Traditional education often fails to equip students with practical, industry-relevant skills.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">2</div>
                  <div>
                    <strong className="font-medium">Digital Divide</strong>
                    <p className="text-muted-foreground">Rural areas lag behind in access to tech education and digital literacy.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">3</div>
                  <div>
                    <strong className="font-medium">Local Relevance</strong>
                    <p className="text-muted-foreground">Generic online courses often ignore local context and language barriers.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">4</div>
                  <div>
                    <strong className="font-medium">Mentorship Deficit</strong>
                    <p className="text-muted-foreground">Students need ongoing support, not just course content.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Chetna */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <SectionTitle 
            title="Why Choose Chetna Academy" 
            subtitle="More than just courses - a complete learning ecosystem designed for your success."
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {whyChooseReasons.map((reason, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-primary/5 rounded-full">
                    {reason.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                  <p className="text-muted-foreground">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container">
          <SectionTitle 
            title="Our Team" 
            subtitle="Meet the people behind Chetna Academy's mission to transform skill education."
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden card-hover">
                <div className="h-48 bg-muted">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">Our Impact</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-4xl font-bold text-primary-foreground mb-2">500+</div>
              <p className="text-primary-foreground/80">Students Trained</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-foreground mb-2">85%</div>
              <p className="text-primary-foreground/80">Placement Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-foreground mb-2">12</div>
              <p className="text-primary-foreground/80">Districts Covered</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-foreground mb-2">20+</div>
              <p className="text-primary-foreground/80">Partner Organizations</p>
            </div>
          </div>
          
          <Button asChild variant="secondary" size="lg">
            <Link to="/success-stories">View Success Stories</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container text-center">
          <h2 className="heading-lg mb-4">Join Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Whether you're a student looking to gain new skills, an educator wanting to make an impact, or a partner organization - there's a place for you in the Chetna community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/courses">Explore Courses</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/join-trainer">Join as Trainer</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/contact">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
