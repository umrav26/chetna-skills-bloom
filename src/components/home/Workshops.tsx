
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionTitle from '../SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Workshop {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'school' | 'college' | 'community';
  free: boolean;
}

const upcomingWorkshops: Workshop[] = [
  {
    id: 'ws1',
    title: 'Introduction to Web Development',
    date: 'June 15, 2025',
    location: 'Government College, Kokrajhar',
    type: 'college',
    free: true
  },
  {
    id: 'ws2',
    title: 'Digital Marketing Essentials',
    date: 'June 20, 2025',
    location: 'Community Hall, Guwahati',
    type: 'community',
    free: true
  },
  {
    id: 'ws3',
    title: 'Career Skills for High School Students',
    date: 'June 25, 2025',
    location: 'Central School, Bongaigaon',
    type: 'school',
    free: true
  }
];

const Workshops = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container">
        <SectionTitle 
          title="Upcoming Workshops & Seminars"
          subtitle="Free skill development workshops and seminars for schools, colleges, and communities."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {upcomingWorkshops.map((workshop, index) => (
            <Card key={workshop.id} className="overflow-hidden card-hover animate-slide-in-bottom" style={{ animationDelay: `${0.1 * index}s` }}>
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant={
                      workshop.type === 'school' ? 'secondary' : 
                      workshop.type === 'college' ? 'default' : 
                      'outline'
                    }>
                      {workshop.type === 'school' ? 'School' : 
                       workshop.type === 'college' ? 'College' : 'Community'}
                    </Badge>
                    {workshop.free && (
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        Free
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-medium text-lg mb-3">{workshop.title}</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{workshop.date}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{workshop.location}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-background">
                  <Link 
                    to={`/workshops/${workshop.id}`}
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                  >
                    Register Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link to="/workshops">
              View All Workshops
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Workshops;
