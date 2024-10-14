import { Outlet } from 'react-router-dom';
import Header from './Header'; 
import Footer from './Footer';

const Layout = () => {
  return (
    <div>
      <Header/>
      <div >
        <Outlet /> {/* This is where nested routes will render */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
