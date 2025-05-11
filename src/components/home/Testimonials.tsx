import { useState } from 'react';
import SectionTitle from '../SectionTitle';
import TestimonialCard, { TestimonialProps } from '../TestimonialCard';
const testimonials: TestimonialProps[] = [{
  name: 'Priya Sharma',
  role: 'Web Developer',
  content: 'Joining Chetna Academy was a turning point in my career. The hands-on training helped me transition from a basic computer operator to a skilled web developer. I now work remotely for a Bangalore company while staying in my hometown.',
  rating: 5,
  course: 'Web Development',
  location: 'Kokrajhar'
}, {
  name: 'Rajesh Kumar',
  role: 'Digital Marketing Specialist',
  content: 'The practical approach to digital marketing at Chetna Academy helped me understand real-world applications. Within two months of completing the course, I started my own marketing agency that now serves local businesses.',
  rating: 5,
  course: 'Digital Marketing',
  location: 'Guwahati'
}, {
  name: 'Mira Basumatary',
  role: 'Front Office Executive',
  content: 'As someone from a rural area, I never thought I could gain the confidence to work in a corporate environment. The communication skills course changed that completely. The trainers were supportive and understood our cultural context.',
  rating: 5,
  course: 'Communication Skills',
  location: 'Bongaigaon'
}];
const Testimonials = () => {
  return <section className="section-padding bg-white overflow-hidden">
      
    </section>;
};
export default Testimonials;