
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SectionTitle from '../SectionTitle';
import CourseCard, { CourseProps } from '../CourseCard';
import { ArrowRight } from 'lucide-react';

const featuredCourses: CourseProps[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    category: 'Tech',
    duration: '6 months',
    level: 'Beginner to Intermediate',
    languages: ['English', 'Hindi'],
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
    fee: '15,000'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Tech',
    duration: '3 months',
    level: 'Beginner',
    languages: ['English', 'Hindi', 'Assamese'],
    skills: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
    fee: '12,000'
  },
  {
    id: 'communication-skills',
    title: 'Communication Skills',
    category: 'Soft Skills',
    duration: '2 months',
    level: 'All Levels',
    languages: ['English', 'Hindi', 'Assamese', 'Bodo'],
    skills: ['Public Speaking', 'Business Writing', 'Presentation', 'Interview Skills'],
    fee: '8,000'
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    category: 'Tech',
    duration: '4 months',
    level: 'Beginner to Intermediate',
    languages: ['English', 'Hindi'],
    skills: ['Photoshop', 'Illustrator', 'UI/UX', 'Branding'],
    fee: '14,000'
  }
];

const FeaturedCourses = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container">
        <SectionTitle 
          title="Featured Courses"
          subtitle="Discover our most popular skill development programs designed to make you industry-ready."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course, index) => (
            <div 
              key={course.id}
              className="animate-slide-in-bottom"
              style={{ animationDelay: `${0.1 * index}s` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CourseCard {...course} />
            </div>
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
