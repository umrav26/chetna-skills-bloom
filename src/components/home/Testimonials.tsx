
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import SectionTitle from '../SectionTitle';
import TestimonialCard, { TestimonialProps } from '../TestimonialCard';
import { Loader2 } from 'lucide-react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<TestimonialProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .limit(3);
        
        if (error) {
          console.error('Error fetching testimonials:', error);
          return;
        }
        
        if (data) {
          setTestimonials(data as TestimonialProps[]);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container">
        <SectionTitle
          title="Success Stories"
          subtitle="What our students say"
          centered
        />
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} {...testimonial} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No testimonials available yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
