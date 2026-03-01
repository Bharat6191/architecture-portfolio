import React, { useState, useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Vision from './components/Vision';
import HighRiseEngineering from './components/HighRiseEngineering';
import VastuShastra from './components/VastuShastra';
import SpatialExperiments from './components/SpatialExperiments';
import About from './components/About';
import AboutUs from './components/AboutUs';
import Projects from './components/Projects';
import ImageGallery from './components/ImageGallery';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Awards from './components/Awards';
import FutureProjects from './components/FutureProjects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlueprintOverlay from './components/BlueprintOverlay';
import BackgroundEnvironment from './components/BackgroundEnvironment';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <div className="relative w-full bg-[#050505] text-white selection:bg-[#d4af37] selection:text-black font-sans">
        {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
        
        <BackgroundEnvironment />
        <BlueprintOverlay />
        <div className="relative z-10 pb-24">
          <Navbar isReady={!loading} />
          <Hero isReady={!loading} />
          <Vision />
          <About />
          <AboutUs />
          <HighRiseEngineering />
          <VastuShastra />
          <Projects />
          <ImageGallery />
          <SpatialExperiments />
          <Process />
          <Testimonials />
          <Awards />
          <FutureProjects />
          <Contact />
        </div>
        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;
