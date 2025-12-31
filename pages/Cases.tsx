
import React, { useState, useEffect } from 'react';
import FadeIn from '../components/FadeIn';
import { ArrowUpRight } from 'lucide-react';
import { contentService, CaseStudy } from '../services/content.service';

const Cases: React.FC = () => {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contentService.getCaseStudies().then(data => {
      setCases(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-20">
      <section className="bg-punchline-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-black font-heading mb-6">Proven Results</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Witness the measurable growth we have delivered across the African business landscape.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20 font-bold text-punchline-gray">Syncing Case Studies...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12">
              {cases.map((study, idx) => (
                <FadeIn key={study.id} delay={idx * 0.1}>
                  <div className="group space-y-6">
                    <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl">
                      <img 
                        src={study.image} 
                        alt={study.client} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-punchline-black/80 to-transparent flex items-end p-8">
                        <div className="text-white">
                          <p className="text-punchline-blue font-black uppercase tracking-widest text-sm mb-2">{study.client}</p>
                          <h3 className="text-3xl font-bold font-heading leading-tight">{study.title}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center px-4">
                      <div className="space-y-1">
                        <p className="text-punchline-blue font-black text-2xl">{study.metric}</p>
                        <p className="text-sm text-punchline-gray font-bold uppercase">Primary Growth Impact</p>
                      </div>
                      <button className="w-14 h-14 rounded-full border-2 border-punchline-blue flex items-center justify-center text-punchline-blue hover:bg-punchline-blue hover:text-white transition-all">
                        <ArrowUpRight />
                      </button>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-punchline-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-black font-heading text-punchline-black leading-tight">Impact Driven by Data.</h2>
            <div className="h-1.5 w-24 bg-punchline-blue mx-auto rounded-full"></div>
            <p className="text-xl text-punchline-gray">
              We apply precision strategies that resonate with the unique nuances of the Nigerian consumer.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cases;
