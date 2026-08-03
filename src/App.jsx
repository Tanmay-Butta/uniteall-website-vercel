import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CursorSpotlight from './components/CursorSpotlight';
import ScrollProgress from './components/ScrollProgress';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import About from './pages/About';
import Feedback from './pages/Feedback';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-900 text-white flex flex-col font-sans">
        <ScrollProgress />
        <CursorSpotlight />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
