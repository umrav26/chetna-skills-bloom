
import { useState } from 'react';
import Layout from '../components/Layout';
import SectionTitle from '../components/SectionTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: <Phone className="h-8 w-8 text-primary" />,
      title: "Call Us",
      value: "+91 98765 43210",
      link: "tel:+919876543210",
      description: "Mon-Sat, 9AM to 6PM"
    },
    {
      icon: <Mail className="h-8 w-8 text-primary" />,
      title: "Email Us",
      value: "info@chetnaacademy.com",
      link: "mailto:info@chetnaacademy.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "WhatsApp",
      value: "+91 98765 43210",
      link: "https://wa.me/919876543210",
      description: "Quick responses on WhatsApp"
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: "Visit Us",
      value: "Kokrajhar, Assam",
      link: "https://maps.google.com/?q=Kokrajhar,Assam",
      description: "Main center and administrative office"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h1 className="heading-lg mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get in touch with our team for inquiries, partnerships, or to learn more about our courses.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-primary/5 rounded-full">
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{method.title}</h3>
                  <a 
                    href={method.link} 
                    className="text-primary font-medium mb-1 hover:underline" 
                    target={method.title === "Visit Us" ? "_blank" : undefined}
                    rel={method.title === "Visit Us" ? "noopener noreferrer" : undefined}
                  >
                    {method.value}
                  </a>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div>
              <SectionTitle 
                title="Send Us a Message" 
                subtitle="Fill out the form below and we'll get back to you as soon as possible."
                centered={false}
              />
              
              <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="Enter your phone number" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      placeholder="What is this regarding?" 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you?" 
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required 
                  />
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
            
            {/* Map */}
            <div>
              <SectionTitle 
                title="Find Us" 
                subtitle="Visit our main center in Kokrajhar or connect with our satellite locations across Assam."
                centered={false}
              />
              
              <div className="h-[400px] mt-6 bg-muted rounded-lg overflow-hidden">
                <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <MapPin className="h-10 w-10 mx-auto mb-3 opacity-50" />
                    <p>Interactive Map Placeholder</p>
                    <p className="text-sm mt-2">Chetna Academy, Kokrajhar, Assam, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-3xl">
          <SectionTitle 
            title="Frequently Asked Questions" 
            subtitle="Quick answers to common questions about our courses and programs."
            centered={true}
          />
          
          <div className="space-y-6 mt-8">
            {[
              {
                q: "How can I enroll in a course?",
                a: "You can enroll in our courses by visiting the Courses page, selecting your preferred course, and clicking on the 'Apply Now' button. Alternatively, you can contact us directly via phone or WhatsApp."
              },
              {
                q: "Do you offer scholarships or financial assistance?",
                a: "Yes, we offer scholarships for deserving candidates from underprivileged backgrounds. We also provide flexible payment options and installment plans for all students."
              },
              {
                q: "Are the courses available online?",
                a: "Most of our courses are available in both offline (in-person) and online formats. Some practical courses require in-person attendance for certain sessions."
              },
              {
                q: "How do I request a workshop at my school or college?",
                a: "You can request a workshop by filling out the form on our Workshops page or by contacting us directly with details about your institution and preferred workshop topics."
              },
              {
                q: "Do you provide job placement assistance?",
                a: "Yes, we provide job placement assistance for all our students. We have partnerships with local businesses and organizations that frequently hire our graduates."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-border pb-4">
                <h3 className="text-lg font-medium mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-16">
        <div className="container text-center">
          <SectionTitle 
            title="Partner With Us" 
            subtitle="Collaborate with Chetna Academy to create impact through skill development."
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">For Businesses</h3>
                <p className="text-muted-foreground mb-6">
                  Partner with us for CSR initiatives, employee training, or to recruit skilled graduates.
                </p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">For Educational Institutions</h3>
                <p className="text-muted-foreground mb-6">
                  Collaborate on workshops, skill enhancement programs, and career readiness trainings.
                </p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">For NGOs & Government</h3>
                <p className="text-muted-foreground mb-6">
                  Work together on community development and large-scale skill building initiatives.
                </p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
