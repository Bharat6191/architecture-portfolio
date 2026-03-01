import React, { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import localData from '../data/websiteData.json';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Replace these with your actual EmailJS credentials
    // You can sign up at https://www.emailjs.com/
    const serviceID = 'service_4ggxnec';
    const templateID = 'template_5inrx7u';
    const publicKey = 'v5xagu6Y-oK8B9t27';

    emailjs.sendForm(serviceID, templateID, formRef.current, publicKey)
      .then((result) => {
          setIsSubmitting(false);
          setSubmitStatus('success');
          formRef.current.reset(); // Clear form
          setTimeout(() => setSubmitStatus(null), 5000);
      }, (error) => {
          setIsSubmitting(false);
          setSubmitStatus('error');
          setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  useEffect(() => {
    // Line draw effect on form borders
    gsap.fromTo(
      formRef.current.querySelectorAll('.draw-line'),
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: "power3.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section id="contact" className="relative w-full min-h-[80vh] flex flex-col md:flex-row py-16 md:py-24 px-4 sm:px-6 lg:px-24 bg-[#0a0a0a] border-t border-white/5 z-10 overflow-hidden">
      
      {/* Background Architectural Elements */}
      <div className="absolute top-0 right-0 w-[50vh] h-[50vh] border border-[#d4af37]/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      {/* Left side text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-6 z-10 pr-0 md:pr-12 mb-16 md:mb-0">
        <h2 className="text-sm tracking-[0.3em] text-[#d4af37] uppercase font-bold">{localData.contact.tagline}</h2>
        <h3 className="text-4xl sm:text-5xl md:text-7xl font-light">
          {localData.contact.titleLine1} <br/> <span className="font-bold">{localData.contact.titleHighlight}</span>
        </h3>
        <p className="text-gray-400 text-lg font-light leading-relaxed max-w-sm mt-4">
          {localData.contact.description}
        </p>

        <div className="mt-12 flex flex-col gap-4 text-gray-400 font-light text-sm uppercase tracking-widest">
          <p>
            <span className="text-white font-bold inline-block w-24">Location</span> {localData.global.location}
          </p>
          <p>
            <span className="text-white font-bold inline-block w-24">Email</span> {localData.global.email}
          </p>
          <p>
            <span className="text-white font-bold inline-block w-24">Phone</span> {localData.global.phone}
          </p>
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center z-10">
        <form ref={formRef} onSubmit={sendEmail} className="bg-[#0f0f0f] border border-white/5 p-6 sm:p-8 md:p-12 w-full max-w-xl mx-auto md:mr-0 flex flex-col gap-8 shadow-2xl">
          
          <div className="relative">
            <input 
              type="text" 
              name="user_name"
              placeholder={localData.contact.formLabelName} 
              required
              className="w-full bg-transparent text-white font-light text-base uppercase tracking-widest placeholder-gray-600 focus:outline-none focus:text-[#d4af37] py-2 border-b border-white/20 focus:border-[#d4af37] transition-colors duration-300"
            />
            {/* Animated Bottom Border */}
            <div className="draw-line absolute bottom-0 left-0 w-full h-[1px] bg-white/20 origin-left"></div>
            {/* Active Border Overlay */}
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#d4af37] transition-all duration-300 peer-focus:w-full"></div>
          </div>

          <div className="relative">
            <input 
              type="email" 
              name="user_email"
              placeholder={localData.contact.formLabelEmail} 
              required
              className="w-full bg-transparent text-white font-light text-sm uppercase tracking-widest placeholder-gray-600 focus:outline-none focus:text-[#d4af37] py-2"
            />
            <div className="draw-line absolute bottom-0 left-0 w-full h-[1px] bg-white/20 origin-left"></div>
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#d4af37] transition-all duration-300 peer-focus:w-full"></div>
          </div>

          <div className="relative">
            <input 
              type="text" 
              name="message"
              placeholder={localData.contact.formLabelBrief} 
              required
              className="w-full bg-transparent text-white font-light text-sm uppercase tracking-widest placeholder-gray-600 focus:outline-none focus:text-[#d4af37] py-2"
            />
            <div className="draw-line absolute bottom-0 left-0 w-full h-[1px] bg-white/20 origin-left"></div>
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#d4af37] transition-all duration-300 peer-focus:w-full"></div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="draw-line mt-8 flex items-center justify-center gap-4 py-4 px-8 border border-white/20 hover:border-[#d4af37] text-white hover:text-[#d4af37] text-sm uppercase tracking-widest font-bold transition-all duration-500 w-max group origin-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Transmitting...' : localData.contact.formSubmitText}
            {!isSubmitting && (
              <svg 
                className="w-5 h-5 translate-x-0 group-hover:translate-x-2 transition-transform duration-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            )}
          </button>
          
          {submitStatus === 'success' && (
            <p className="text-[#d4af37] text-xs tracking-widest uppercase font-bold text-center">Protocol Received. We will contact you shortly.</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-500 text-xs tracking-widest uppercase font-bold text-center">Transmission Failed. Please check console or try again.</p>
          )}
        </form>
      </div>

    </section>
  );
};

export default Contact;
