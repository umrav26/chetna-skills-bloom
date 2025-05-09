
import { Handshake, Award, Users } from 'lucide-react';
import SectionTitle from '../SectionTitle';
import { Card, CardContent } from '@/components/ui/card';

const Mission = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-bottom">
            <SectionTitle 
              title="Our Mission"
              subtitle="To empower youth across India — especially in underserved regions — with real-world, practical skills through affordable, hands-on training and mentorship, making them self-reliant and employable."
            />
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Handshake className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="heading-sm mb-1">Industry-Aligned Training</h3>
                  <p className="text-muted-foreground">Our courses are designed with real-world applications in mind, created in collaboration with industry experts.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="heading-sm mb-1">Inclusive Learning</h3>
                  <p className="text-muted-foreground">We offer courses in multiple languages to ensure education is accessible to all, regardless of background.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="heading-sm mb-1">Project-Based Approach</h3>
                  <p className="text-muted-foreground">Learn by doing with our hands-on projects that build your portfolio and practical experience.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-in-bottom" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-6">
                  <div className="font-heading text-5xl font-bold text-primary mb-2">5k+</div>
                  <h3 className="text-lg font-medium mb-1">Students Trained</h3>
                  <p className="text-sm text-muted-foreground">Across rural and semi-urban regions of India</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
                <CardContent className="p-6">
                  <div className="font-heading text-5xl font-bold text-secondary mb-2">85%</div>
                  <h3 className="text-lg font-medium mb-1">Placement Rate</h3>
                  <p className="text-sm text-muted-foreground">In relevant industries and roles</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
                <CardContent className="p-6">
                  <div className="font-heading text-5xl font-bold text-accent-foreground mb-2">20+</div>
                  <h3 className="text-lg font-medium mb-1">Industry Partners</h3>
                  <p className="text-sm text-muted-foreground">Collaborating for training and placement</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="font-heading text-5xl font-bold text-blue-600 mb-2">4</div>
                  <h3 className="text-lg font-medium mb-1">Training Centers</h3>
                  <p className="text-sm text-muted-foreground">Across Northeast India</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
