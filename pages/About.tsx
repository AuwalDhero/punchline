
import React from 'react';
import { Target, Eye, Shield, Award, Users } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const About: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-punchline-blue text-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-black font-heading mb-6">Our Story</h1>
            <p className="text-xl text-blue-100 max-w-3xl leading-relaxed">
              Punchline Marketing Hub (PMH) is Nigeria's premier consultancy, bridging the gap between global marketing standards and local market realities.
            </p>
          </FadeIn>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <Shield size={400} />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <FadeIn direction="right" className="bg-punchline-light p-12 rounded-[2rem] border border-gray-100">
              <div className="w-16 h-16 bg-punchline-blue text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                <Eye size={32} />
              </div>
              <h2 className="text-3xl font-black font-heading text-punchline-black mb-6">Our Vision</h2>
              <p className="text-lg text-punchline-gray leading-relaxed">
                To become Africa's most trusted partner for marketing excellence and sales transformation, empowering organizations to achieve measurable, long-term growth.
              </p>
            </FadeIn>
            
            <FadeIn direction="left" className="bg-punchline-black p-12 rounded-[2rem] text-white">
              <div className="w-16 h-16 bg-punchline-blue text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                <Target size={32} />
              </div>
              <h2 className="text-3xl font-black font-heading mb-6">Our Mission</h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                To empower African businesses with practical, data-driven marketing strategies and sales methodologies that deliver sustainable competitive advantage.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-punchline-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black font-heading text-punchline-black">The PMH Identity</h2>
            <p className="text-punchline-gray mt-4">Built on trust, driven by results.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Authenticity', desc: 'Real insights for the real Nigerian market.', icon: <Award /> },
              { title: 'Excellence', desc: 'Global standards in every delivery.', icon: <Shield /> },
              { title: 'Community', desc: 'Growing together with our clients.', icon: <Users /> }
            ].map((value, idx) => (
              <FadeIn key={value.title} delay={idx * 0.1} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all">
                <div className="text-punchline-blue mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold font-heading mb-4 text-punchline-black">{value.title}</h3>
                <p className="text-punchline-gray">{value.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black font-heading text-punchline-black">Expert Minds</h2>
              <p className="text-punchline-gray mt-4">Meet the strategists behind our client success stories.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Dr. Amaka Okafor', role: 'Strategy Director' },
              { name: 'Babatunde Bello', role: 'Head of Research' },
              { name: 'Sarah Mensah', role: 'Sales Transformation' },
              { name: 'Victor Ibeh', role: 'Data Analytics Lead' }
            ].map((member, idx) => (
              <FadeIn key={member.name} delay={idx * 0.1}>
                <div className="space-y-4 text-center">
                  <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer">
                    <img src={`https://picsum.photos/seed/pmhteam${idx}/400/400`} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-punchline-black">{member.name}</h3>
                    <p className="text-punchline-blue text-sm font-bold uppercase tracking-widest">{member.role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
