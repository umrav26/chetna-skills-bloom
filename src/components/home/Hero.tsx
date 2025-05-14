
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
const Hero = () => {
  return <section className="relative bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-20 w-64 h-64 rounded-full bg-chetna-blue/10 animate-float" />
        <div className="absolute left-20 bottom-20 w-48 h-48 rounded-full bg-chetna-red/10 animate-float" style={{
        animationDelay: '1s'
      }} />
        <div className="absolute top-40 left-1/4 w-32 h-32 rounded-full bg-chetna-peach/10 animate-float" style={{
        animationDelay: '2s'
      }} />
      </div>
      
      <div className="container relative section-padding min-h-[85vh] flex flex-col items-center justify-center text-center">
        <h1 className="heading-xl mb-6 animate-fade-in max-w-4xl">
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Practical Skills. Real Careers.</span>
          <br />Rural to Global.
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl animate-fade-in" style={{
        animationDelay: '0.2s'
      }}>
          We're preparing to empower youth across India with hands-on training and mentorship in tech and soft skills. Be among the first to join.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{
        animationDelay: '0.4s'
      }}>
          <Button asChild size="lg" className="text-base px-6">
            <Link to="/courses">
              Preview Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-base px-6">
            <Link to="/apply">Join Waitlist</Link>
          </Button>
        </div>

        <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-fade-in" style={{
        animationDelay: '0.6s'
      }}>
          <div className="px-6 py-3 bg-white/70 backdrop-blur-sm rounded-full shadow-sm">
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span>Launching Soon</span>
              </span>
              <span className="w-px h-4 bg-gray-300"></span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span>10+ Courses Planned</span>
              </span>
              <span className="w-px h-4 bg-gray-300"></span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                <span>Industry Partnerships</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
