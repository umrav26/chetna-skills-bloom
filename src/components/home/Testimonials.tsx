
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import SectionTitle from '../SectionTitle';
import TestimonialCard from '../TestimonialCard';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export interface TestimonialProps {
  id: string;
  name: string;
  role?: string;
  content: string;
  rating?: number;
  course?: string;
  location?: string;
  image?: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<TestimonialProps[]>([]);
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from('testimonials').select('*').limit(6);
        if (error) throw error;
        if (data) {
          setTestimonials(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchTestimonials();
  }, []);

  // Fallback testimonials in case database is empty
  const fallbackTestimonials: TestimonialProps[] = [{
    id: '1',
    name: 'Priya Sharma',
    role: 'Digital Marketing Student',
    content: 'The Digital Marketing course at Chetna Academy was incredibly practical. I learned SEO strategies that I was able to apply immediately to my own blog.',
    rating: 5,
    location: 'Guwahati'
  }, {
    id: '2',
    name: 'Rahul Dutta',
    role: 'Web Development Graduate',
    content: 'From knowing zero coding to building my own portfolio website in just 3 months! The instructors were patient and the curriculum was well-structured.',
    rating: 5,
    location: 'Jorhat'
  }, {
    id: '3',
    name: 'Meghna Borah',
    role: 'UI/UX Design Student',
    content: 'I\'ve tried many online courses before, but nothing compares to the hands-on experience at Chetna Academy. The design principles I learned have transformed my work.',
    rating: 4,
    location: 'Dibrugarh'
  }];

  // Use fetched testimonials or fallback if empty
  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="What Our Students Say"
          subtitle="Hear from our students about their learning experience at Chetna Academy"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {displayTestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              rating={testimonial.rating}
              location={testimonial.location}
              course={testimonial.course}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
