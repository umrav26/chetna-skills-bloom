
import { useState } from 'react';
import SectionTitle from '../SectionTitle';
import TestimonialCard, { TestimonialProps } from '../TestimonialCard';

const testimonials: TestimonialProps[] = [
  {
    name: 'Priya Sharma',
    role: 'Web Developer',
    content: 'Joining Chetna Academy was a turning point in my career. The hands-on training helped me transition from a basic computer operator to a skilled web developer. I now work remotely for a Bangalore company while staying in my hometown.',
    rating: 5,
    course: 'Web Development',
    location: 'Kokrajhar'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Digital Marketing Specialist',
    content: 'The practical approach to digital marketing at Chetna Academy helped me understand real-world applications. Within two months of completing the course, I started my own marketing agency that now serves local businesses.',
    rating: 5,
    course: 'Digital Marketing',
    location: 'Guwahati'
  },
  {
    name: 'Mira Basumatary',
    role: 'Front Office Executive',
    content: 'As someone from a rural area, I never thought I could gain the confidence to work in a corporate environment. The communication skills course changed that completely. The trainers were supportive and understood our cultural context.',
    rating: 5,
    course: 'Communication Skills',
    location: 'Bongaigaon'
  }
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container">
        <SectionTitle 
          title="Student Success Stories"
          subtitle="Hear from our students who transformed their careers through practical skill development."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="animate-slide-in-bottom"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
        
        <div className="relative mt-16 p-8 md:p-12 bg-primary/5 rounded-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent"></div>
          
          <div className="relative z-10 max-w-3xl">
            <h3 className="heading-md mb-4">Ready to transform your career with practical skills?</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Join thousands of students who have elevated their careers through our industry-aligned training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/apply" className="btn-primary">Apply Now</a>
              <a href="/courses" className="btn-outline">Explore Courses</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
