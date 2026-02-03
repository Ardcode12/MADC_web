import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './styles/global.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Home />
      <Footer />
    </Router>
  );
}

export default App;
