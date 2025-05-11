
import Layout from '../components/Layout';
import Hero from '../components/home/Hero';
import Mission from '../components/home/Mission';
import FeaturedCourses from '../components/home/FeaturedCourses';
import Testimonials from '../components/home/Testimonials';
import Workshops from '../components/home/Workshops';
import Newsletter from '../components/home/Newsletter';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Mission />
      <FeaturedCourses />
      <Workshops />
      <Testimonials />
      <Newsletter />
    </Layout>
  );
};

export default Index;
