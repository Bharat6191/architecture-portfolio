import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import localData from '../data/websiteData.json';

gsap.registerPlugin(ScrollTrigger);

const TestimonialCard = ({ client, text, index }) => {
  const cardRef = useRef();

  useEffect(() => {
    // Floating scroll effect
    gsap.fromTo(cardRef.current,
      { y: 150, opacity: 0, rotateX: 25, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
        }
      }
    );
  }, []);

  return (
    <div 
      ref={cardRef} 
      className={`glassmorphism-card perspective-1000 relative p-8 border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden rounded-xl transition-transform duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(212,175,55,0.1)] hover:border-[#d4af37]/30 ${index % 2 === 0 ? 'md:-translate-y-12' : 'md:translate-y-12'}`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37] opacity-20 blur-3xl mix-blend-screen rounded-full"></div>
      
      <p className="text-gray-300 font-light leading-relaxed mb-6 italic text-lg opacity-90">"{text}"</p>
      
      <div className="flex items-center gap-4 border-t border-white/10 pt-4">
        <div className="w-2 h-2 rounded-full bg-[#d4af37]"></div>
        <h4 className="text-white font-bold uppercase tracking-widest text-xs">{client}</h4>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [reviews, setReviews] = useState(localData.testimonials.items);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', text: '' });
  const [status, setStatus] = useState('');

  // Update reviews dynamically without waiting for full page reload
  useEffect(() => {
    setReviews(localData.testimonials.items);
  }, [localData.testimonials.items]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.text) return;
    
    setStatus('Encrypting & Sending...');

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          role: 'Verified Client',
          text: formData.text
        })
      });

      const result = await response.json();
      if (result.success) {
        setReviews(prev => [...prev, { name: formData.name, role: 'Verified Client', text: formData.text }]);
        setFormData({ name: '', text: '' });
        setShowForm(false);
        setStatus('');
      } else {
        setStatus('Error transmitting data.');
      }
    } catch (err) {
      setStatus('Network Error. Connection interrupted.');
    }
  };

  return (
    <section className="relative w-full py-16 md:py-32 px-4 sm:px-6 lg:px-24 border-t border-white/5 bg-black z-10">
      
      <div className="text-center mb-16 md:mb-24 relative z-10 w-full flex flex-col items-center">
        <h2 className="text-sm tracking-[0.4em] text-[#d4af37] uppercase font-bold mb-4">{localData.testimonials.tagline}</h2>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6 uppercase">
          {localData.testimonials.titleLine1} <span className="font-bold">{localData.testimonials.titleHighlight}</span>
        </h3>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          className="mt-6 text-xs uppercase tracking-[0.3em] font-bold text-[#d4af37] border border-[#d4af37]/30 px-6 py-3 hover:bg-[#d4af37] hover:text-black transition-colors duration-500"
        >
          {showForm ? 'Close Terminal' : '+ Submit Feedback'}
        </button>
        
        {showForm && (
          <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md flex flex-col gap-6 text-left animate-fade-in bg-[#0f0f0f] p-8 border border-white/10 shadow-2xl">
             <div className="relative">
              <input 
                type="text" 
                placeholder="YOUR NAME / COMPANY" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-transparent text-white font-light text-sm uppercase tracking-widest placeholder-gray-600 focus:outline-none focus:border-[#d4af37] border-b border-white/20 py-2 transition-colors duration-300"
                required
              />
            </div>
            <div className="relative">
              <textarea 
                placeholder="TESTIMONIAL STATEMENT" 
                rows="3"
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
                className="w-full bg-transparent text-white font-light text-sm uppercase tracking-widest placeholder-gray-600 focus:outline-none focus:border-[#d4af37] border-b border-white/20 py-2 transition-colors duration-300 resize-none"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={status === 'Encrypting & Sending...'}
              className="text-xs uppercase tracking-[0.3em] font-bold bg-white/5 border border-white/20 px-6 py-3 hover:border-[#d4af37] hover:text-[#d4af37] transition-colors duration-500 text-center text-white"
            >
              {status || 'Submit Data'}
            </button>
          </form>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10 max-w-7xl mx-auto">
        {reviews.map((rev, idx) => (
          <TestimonialCard key={`review-${idx}`} index={idx} client={rev.name} text={rev.text} />
        ))}
      </div>

    </section>
  );
};

export default Testimonials;
