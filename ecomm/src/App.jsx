import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import ProductDetail from './pages/Productpage';
import Layout from './components/layout';
import Shop from './components/Shop';

const App = () => {
  return (
    
     <Routes>
      {/* Public routes */}
      <Route  element={<Layout />}   >
        <Route path="/" element={<HomePage/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
        <Route path="/shop/:category" element={<Shop  />} />
      </Route>  
      
     </Routes>
    
  );
};

export default App;
