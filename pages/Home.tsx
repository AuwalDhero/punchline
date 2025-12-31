
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Globe, ChevronRight } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import StatsSection from '../components/StatsSection';
import { ICON_MAP } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-punchline-light pt-16 pb-32">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full text-punchline-blue fill-current">
            <circle cx="400" cy="0" r="400" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div className="space-y-8">
                <div className="inline-flex items-center space-x-2 bg-blue-100 text-punchline-blue px-4 py-2 rounded-full font-bold text-sm tracking-wide uppercase">
                  <Star size={16} fill="currentColor" />
                  <span>Nigeria's Elite Marketing Hub</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black font-heading leading-tight text-punchline-black">
                  Empowering African <span className="text-punchline-blue">Marketing</span> Excellence
                </h1>
                <p className="text-xl text-punchline-gray leading-relaxed max-w-xl">
                  Transformative training, strategic consultancy, and data-driven market research designed for the unique Nigerian business landscape.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/contact" className="bg-punchline-blue text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center">
                    Get a Free Audit <ArrowRight className="ml-2" />
                  </Link>
                  <Link to="/services" className="bg-white text-punchline-black border-2 border-punchline-black px-8 py-4 rounded-full font-bold text-lg hover:bg-punchline-light transition-all flex items-center justify-center">
                    Our Solutions
                  </Link>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.2} className="hidden lg:block relative">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000" alt="Hero" className="rounded-3xl shadow-2xl relative z-10" />
                <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl z-20 max-w-xs">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-green-100 p-2 rounded-lg text-green-600"><TrendingUp /></div>
                    <span className="font-bold text-punchline-black">Market Dynamics</span>
                  </div>
                  <p className="text-sm text-punchline-gray">Our strategies adapt in real-time to the shifting economy.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black font-heading text-punchline-black">Expert Solutions for Your Growth</h2>
            <div className="h-1.5 w-24 bg-punchline-blue mx-auto rounded-full"></div>
            <p className="text-xl text-punchline-gray">From strategic blueprints to ground-level execution, we offer end-to-end marketing support.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: "f1", title: "Strategic Consultancy", icon: "Target", desc: "Bespoke marketing strategies that bridge global best practices with Nigerian nuances." },
              { id: "f2", title: "Transformative Training", icon: "Users", desc: "Empowering your teams with practical, expert-led skills for the modern era." },
              { id: "f3", title: "Data-Driven Research", icon: "Search", desc: "Uncovering actionable insights through deep-dive consumer behavior analysis." }
            ].map((item, idx) => (
              <FadeIn key={item.id} delay={idx * 0.1}>
                <div className="bg-punchline-light p-10 rounded-3xl h-full border border-transparent hover:border-punchline-blue/20 hover:shadow-2xl transition-all group">
                  <div className="bg-white w-16 h-16 flex items-center justify-center rounded-2xl shadow-sm mb-8 group-hover:bg-punchline-blue group-hover:text-white transition-all">
                    {ICON_MAP[item.icon]}
                  </div>
                  <h3 className="text-2xl font-bold font-heading mb-4 text-punchline-black">{item.title}</h3>
                  <p className="text-punchline-gray leading-relaxed mb-6">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Static CTA */}
      <section className="py-24 bg-punchline-light border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-punchline-blue rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black font-heading leading-tight">Ready to Punch Through the Noise?</h2>
              <p className="text-xl text-blue-100 opacity-90">Book your strategic marketing audit today and discover your brand's true potential.</p>
              <div className="pt-4">
                <Link to="/contact" className="bg-white text-punchline-blue px-12 py-5 rounded-full font-black text-xl hover:bg-gray-100 transition-all inline-flex items-center shadow-xl">
                  Get My Free Audit <ChevronRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust Bar */}
      <section className="bg-white py-12 border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-8">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Global Standards, Local Expertise</p>
        </div>
        <div className="flex space-x-20 animate-marquee whitespace-nowrap">
           {[1,2,3,4,5,6,7,8].map(i => (
             <div key={i} className="flex items-center justify-center space-x-2 text-gray-400 font-bold text-2xl grayscale hover:grayscale-0 transition-all">
               <Globe className="w-8 h-8" />
               <span>BRAND_PARTNER_{i}</span>
             </div>
           ))}
        </div>
      </section>
      
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: 200%; animation: marquee 20s linear infinite; }
      `}</style>
    </div>
  );
};

export default Home;
