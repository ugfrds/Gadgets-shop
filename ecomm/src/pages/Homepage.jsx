

import HeroSection from '../components/HeroSection';
import PopularProducts from '../components/PopularProducts';
import products from '../components/products';
import FeaturedProducts from '../components/FeaturedProducts';
import NewArrivals from '../components/NewArrivals';
import Banner from '../components/banner';
import Banner2 from '../components/banner2';
import Testimonials from '../components/Testimonials';
import Popup from '../components/PopUp';



const HomePage = () => {
  return (
    
      <div className="content">
        <Popup />
        <HeroSection />
        <PopularProducts  products={products} />
        <Banner />
        <FeaturedProducts  products={products} />
        <NewArrivals  products={products} />
        <Banner2 />
        <Testimonials />
       
        
       
        {/* Other components will go here */}
      </div>
    
  );
};

export default HomePage;
