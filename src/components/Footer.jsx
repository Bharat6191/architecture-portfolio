import React from 'react';
import localData from '../data/websiteData.json';

const Footer = () => {
  return (
    <footer className="relative w-full bg-black border-t border-white/10 pt-16 md:pt-24 pb-12 px-4 sm:px-6 lg:px-24 z-10 overflow-hidden">
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8 md:gap-0">
        
        {/* Logo & Manifesto */}
        <div className="flex flex-col max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            {/* Geometric Logo Mark */}
            <div className="w-8 h-8 flex items-center justify-center border-2 border-[#d4af37]">
              <div className="w-3 h-3 bg-[#d4af37]"></div>
            </div>
            <h2 className="text-3xl font-light text-white tracking-widest uppercase">
              {localData.global.companyNamePrefix}<span className="font-bold text-[#d4af37]">{localData.global.companyNameSuffix}</span>
            </h2>
          </div>
          <p className="text-gray-400 font-light text-sm leading-relaxed">
            {localData.global.manifesto}
          </p>
        </div>

        {/* Socials */}
        <div className="flex flex-col md:text-right mt-8 md:mt-0">
          <h4 className="text-[#d4af37] text-xs font-bold uppercase tracking-[0.3em] mb-4">{localData.footer.socialsHeader}</h4>
          <div className="flex flex-wrap md:flex-row gap-4 sm:gap-6 md:gap-8 text-white font-light text-sm tracking-widest uppercase">
            {localData.global.socials.map((social, idx) => (
              <a key={idx} href={social.url} className="hover:text-[#d4af37] transition-colors flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-white group-hover:bg-[#d4af37] transition-colors rounded-full hidden md:block"></span>
                {social.name}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Grid Lines */}
      <div className="w-full h-[1px] bg-white/10 mb-8 md:mb-12 relative hidden md:block">
         <div className="absolute left-1/4 top-0 w-[1px] h-full bg-white/20"></div>
         <div className="absolute left-2/4 top-0 w-[1px] h-full bg-white/20"></div>
         <div className="absolute left-3/4 top-0 w-[1px] h-full bg-white/20"></div>
      </div>
      
      {/* Mobile divider */}
      <div className="w-full h-[1px] bg-white/10 mb-8 relative md:hidden"></div>

      {/* Bottom Layout - Contact & Copyright */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-0">
        
        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 w-full lg:w-auto">
          <div>
            <h5 className="text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{localData.footer.locationHeader}</h5>
            <p 
              className="text-gray-400 text-xs font-light tracking-widest uppercase leading-loose"
              dangerouslySetInnerHTML={{ __html: localData.global.addressFull.replace(/\\n/g, '<br />') }}
            />
          </div>
          <div>
            <h5 className="text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{localData.footer.contactHeader}</h5>
            <p className="text-gray-400 text-xs font-light tracking-widest uppercase leading-loose hover:text-white cursor-pointer transition-colors">
              {localData.global.phone} <br />
              {localData.global.emailContact}
            </p>
          </div>
          <div>
            <h5 className="text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{localData.footer.businessHoursHeader}</h5>
            <p 
              className="text-gray-400 text-xs font-light tracking-widest uppercase leading-loose"
              dangerouslySetInnerHTML={{ __html: localData.global.businessHours.replace(/\\n/g, '<br />') }}
            />
          </div>
        </div>

        {/* Legal */}
        <div className="text-left lg:text-right mt-8 lg:mt-0">
           <p 
             className="text-white/30 text-[10px] uppercase font-mono tracking-widest"
             dangerouslySetInnerHTML={{ __html: `© ${new Date().getFullYear()} ` + localData.footer.copyright.replace(/\\n/g, '<br />') }}
           />
        </div>

      </div>

    </footer>
  );
};

export default Footer;
