
import Layout from '../components/Layout';
import Hero from '../components/home/Hero';
import Mission from '../components/home/Mission';
import FeaturedCourses from '../components/home/FeaturedCourses';
import Testimonials from '../components/home/Testimonials';
import Workshops from '../components/home/Workshops';
import Newsletter from '../components/home/Newsletter';
import FAQ from '../components/home/FAQ';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Mission />
      <FeaturedCourses />
      <Workshops />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </Layout>
  );
};

export default Index;
