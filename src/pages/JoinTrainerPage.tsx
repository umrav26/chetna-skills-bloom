
import Layout from '../components/Layout';
import SectionTitle from '../components/SectionTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Award, Book, BookOpen, Users } from 'lucide-react';

const JoinTrainerPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Application received!",
        description: "Thank you for your interest in joining Chetna Academy as a trainer. We'll review your application and get back to you soon.",
      });
      setIsSubmitting(false);
      // Reset form fields if needed
    }, 1500);
  };

  const benefits = [
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Teaching Experience",
      description: "Build your teaching portfolio while making a difference in students' lives."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Community Impact",
      description: "Directly contribute to upskilling youth in underserved communities."
    },
    {
      icon: <Book className="h-10 w-10 text-primary" />,
      title: "Continuous Learning",
      description: "Access to training resources and professional development opportunities."
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Career Growth",
      description: "Start as an intern trainer and grow into senior roles with Chetna Academy."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h1 className="heading-lg mb-4">Join as a Trainer</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Share your skills and experience to empower the next generation of learners.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle 
                title="Teach, Mentor, Impact" 
                subtitle="Join our mission to bridge the skills gap for youth across India."
                centered={false}
              />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Chetna Academy follows an "Interns to Mentors" model, where passionate individuals with expertise in various domains can join our teaching team. Whether you're an industry professional, a recent graduate, or someone with valuable skills to share, there's a place for you in our community.
                </p>
                <p>
                  Our trainers don't just teach - they mentor, guide, and inspire students to achieve their potential through practical, hands-on learning experiences.
                </p>
                <h3 className="text-xl font-medium text-foreground mt-8 mb-4">Who can apply?</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Industry professionals with practical experience</li>
                  <li>Recent graduates with strong skills in relevant domains</li>
                  <li>Educators passionate about practical, hands-on teaching</li>
                  <li>Freelancers and entrepreneurs willing to share their journey</li>
                  <li>Subject matter experts in technology, design, business, or communication</li>
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Areas */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <SectionTitle 
            title="Areas We're Looking For Trainers" 
            subtitle="Join our teaching team in any of these domains or suggest your expertise area."
            centered={true}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Web Development", "Digital Marketing", "Graphic Design", 
              "Content Writing", "Basic Computer Skills", "Communication Skills",
              "Leadership & Management", "Video Editing", "Mobile App Development",
              "Data Analysis", "Social Media Management", "Entrepreneurship",
              "Financial Literacy", "English Language", "Office Software"
            ].map((area, index) => (
              <div 
                key={index} 
                className="p-4 bg-white rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors text-center"
              >
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <SectionTitle 
            title="Apply to Join Our Teaching Team" 
            subtitle="Fill out the form below and we'll get in touch with next steps."
            centered={true}
          />
          
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Your first name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Your last name" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email address" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="Your phone number" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expertise">Area of Expertise</Label>
                  <select 
                    id="expertise" 
                    className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md"
                    required
                  >
                    <option value="">Select your primary expertise area</option>
                    <option value="web-development">Web Development</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="graphic-design">Graphic Design</option>
                    <option value="content-writing">Content Writing</option>
                    <option value="basic-computer">Basic Computer Skills</option>
                    <option value="communication">Communication Skills</option>
                    <option value="other">Other (Please specify)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <select 
                    id="experience" 
                    className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md"
                    required
                  >
                    <option value="">Select your experience level</option>
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio URL (if applicable)</Label>
                  <Input id="portfolio" type="url" placeholder="https://your-portfolio.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile (if applicable)</Label>
                  <Input id="linkedin" type="url" placeholder="https://linkedin.com/in/your-profile" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="about">Tell us about yourself</Label>
                  <Textarea 
                    id="about" 
                    placeholder="Share your background, experience, and why you want to join Chetna Academy as a trainer."
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="approach">Your teaching approach</Label>
                  <Textarea 
                    id="approach" 
                    placeholder="Describe your teaching philosophy and approach to skill development."
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="resume">Upload Resume/CV</Label>
                  <Input id="resume" type="file" className="cursor-pointer" required />
                  <p className="text-sm text-muted-foreground">
                    PDF or Word document, maximum size: 5MB
                  </p>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Input type="checkbox" id="terms" className="mt-1 h-4 w-4" required />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the <a href="#" className="text-primary hover:underline">Privacy Policy</a> and consent to Chetna Academy contacting me about this application.
                  </Label>
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials from Trainers */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <SectionTitle 
            title="What Our Trainers Say" 
            subtitle="Hear from the educators who are making an impact with Chetna Academy."
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="text-4xl text-muted-foreground/30 font-serif mb-4">"</div>
                  <p className="text-muted-foreground mb-6">
                    Joining Chetna Academy as a trainer has been incredibly fulfilling. The students are eager to learn, and seeing their transformation as they gain new skills is the most rewarding experience.
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-muted mr-3"></div>
                    <div className="text-left">
                      <div className="font-medium">Trainer Name</div>
                      <div className="text-sm text-muted-foreground">Web Development Trainer</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <SectionTitle 
            title="Frequently Asked Questions" 
            subtitle="Common questions about joining Chetna Academy as a trainer."
            centered={true}
          />
          
          <div className="space-y-6">
            {[
              {
                q: "What is the time commitment required?",
                a: "We offer flexible arrangements depending on your availability - from part-time (few hours per week) to full-time positions. We'll discuss this during the interview process."
              },
              {
                q: "Do I need formal teaching experience?",
                a: "No, we value practical knowledge and the ability to communicate concepts clearly. We provide orientation and training for new trainers on effective teaching methods."
              },
              {
                q: "Is there compensation for trainers?",
                a: "Yes, we offer competitive compensation based on your experience level, course type, and time commitment. Details will be discussed during the interview process."
              },
              {
                q: "Can I teach remotely or do I need to be physically present?",
                a: "We offer both options. Some courses are delivered in-person at our centers or partner locations, while others can be taught remotely. This depends on the course requirements."
              },
              {
                q: "What is the selection process like?",
                a: "After reviewing your application, we'll schedule an interview, followed by a short teaching demonstration to assess your communication skills and teaching style."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-border pb-4">
                <h3 className="text-lg font-medium mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">Still have questions about joining our team?</p>
            <Button variant="outline">Contact Us</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default JoinTrainerPage;
