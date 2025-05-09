
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="section-padding bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="lg:w-2/3 text-center lg:text-left">
            <h2 className="heading-lg mb-4">Stay Updated with Our News & Events</h2>
            <p className="text-lg text-muted-foreground mb-6 lg:max-w-2xl">
              Subscribe to our newsletter for updates on new courses, workshops, success stories, and skill development tips.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="heading-sm mb-4">Connect With Us</h3>
              <p className="text-muted-foreground mb-6">
                Have questions about our courses or want personalized guidance? Reach out to us directly.
              </p>
              
              <div className="space-y-4">
                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 border rounded-lg hover:bg-accent/10 transition-colors"
                >
                  <MessageSquare className="h-5 w-5 mr-3 text-green-600" />
                  <div>
                    <div className="font-medium">WhatsApp Us</div>
                    <div className="text-sm text-muted-foreground">Quick responses within hours</div>
                  </div>
                </a>
                
                <a 
                  href="mailto:info@chetnaacademy.com"
                  className="flex items-center p-4 border rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <div className="font-medium">Email Us</div>
                    <div className="text-sm text-muted-foreground">info@chetnaacademy.com</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
