
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SectionTitle from '../SectionTitle';
import { ArrowRight, Calendar, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface CourseProps {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: string;
  languages: string[];
  skills: string[];
  fee: string;
}

const featuredCourses: CourseProps[] = [
  {
    id: 'full-stack-development',
    title: 'Full Stack Development',
    category: 'Tech',
    duration: '3-9 months',
    level: 'Beginner to Advanced',
    languages: ['English', 'Hindi'],
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'GitHub'],
    fee: '6,000 - 13,000'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Tech',
    duration: '3-9 months',
    level: 'Beginner to Intermediate',
    languages: ['English', 'Hindi', 'Assamese'],
    skills: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
    fee: '6,000 - 13,000'
  },
  {
    id: 'communication-skills',
    title: 'Communication Skills',
    category: 'Soft Skills',
    duration: '1.5-3 months',
    level: 'All Levels',
    languages: ['English', 'Hindi', 'Assamese', 'Bodo'],
    skills: ['Public Speaking', 'Business Writing', 'Presentation', 'Collaboration'],
    fee: '3,500 - 6,000'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    category: 'Tech',
    duration: '3-6 months',
    level: 'Beginner to Intermediate',
    languages: ['English', 'Hindi'],
    skills: ['Wireframing', 'Figma', 'User Research', 'Prototyping'],
    fee: '6,000 - 10,000'
  }
];

const FeaturedCourses = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container">
        <SectionTitle 
          title="Featured Courses (Coming Soon)"
          subtitle="Discover our most popular skill development programs designed to make you industry-ready."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course, index) => (
            <Card 
              key={course.id} 
              className="overflow-hidden card-hover animate-slide-in-bottom" 
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline" className={`
                      ${course.category === 'Tech' ? 'bg-blue-50 text-blue-600 border-blue-200' : 
                        course.category === 'Soft Skills' ? 'bg-green-50 text-green-600 border-green-200' : 
                        'bg-yellow-50 text-yellow-600 border-yellow-200'}
                    `}>
                      {course.category}
                    </Badge>
                    <Badge variant="outline" className="bg-primary/5 text-primary">
                      ₹{course.fee}
                    </Badge>
                  </div>
                  
                  <h3 className="font-medium text-lg mb-3">{course.title}</h3>
                  
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-background">
                  <Link 
                    to={`/courses/${course.id}`}
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button asChild size="lg" variant="outline">
            <Link to="/courses">
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
