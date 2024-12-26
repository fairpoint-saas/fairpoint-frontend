import './css/App.css'
import LandingPage from './pages/LandingPage'
import MainFooter from './components/MainFooter'
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Route, Routes, Navigate, Router } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AddProductPage from './pages/AddProductPage';
import Header from './components/Header';
import AppContainer from './components/AppContainer';
import AboutPage from './pages/AboutPage';

import { useState } from 'react';

import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import { AuthContext } from './context/auth.context';
import { useContext } from 'react';
import SideMenu from './components/SideMenu';
import UnitCostListPage from './pages/UnitCostListPage'
import CreateCostPage from './pages/CreateCostPage'
import NotFoundPage from './pages/NotFoundPage';
import RawData from './pages/RawData';

function App() {

  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  
  return (
    <>

    <div className="flex flex-col min-h-screen">

      <Header/>
      {isLoggedIn && <SideMenu isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} onToggle={handleDrawerToggle}/>}
      <div className="flex-grow">
      <AppContainer isDrawerOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
        
      
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/rawdata" element={<IsPrivate><RawData /></IsPrivate>} />
          <Route path="/products" element={<IsPrivate><ProductListPage /></IsPrivate>} />
          <Route path="/costs" element={<IsPrivate><UnitCostListPage /></IsPrivate>} />
          <Route path="/products/:id" element={<IsPrivate><ProductDetailsPage /></IsPrivate>} />
          <Route path="/products/create" element={<IsPrivate><AddProductPage /></IsPrivate>} />
          <Route path="/costs/create" element={<IsPrivate><CreateCostPage /></IsPrivate>} />
          <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
          <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
    
      </AppContainer>
      </div>
      
      </div>
  
    </>
  )
}

export default App;
