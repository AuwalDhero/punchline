import React from 'react';
import FadeIn from './FadeIn';
import { UI_STATS } from '../constants';

const StatsSection: React.FC = () => {
  return (
    <section className="bg-punchline-blue py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {UI_STATS.map((stat, idx) => (
            <FadeIn key={stat.label} delay={idx * 0.1}>
              <div className="text-center text-white">
                <div className="text-5xl md:text-6xl font-black font-heading mb-2">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-blue-100 text-lg font-medium opacity-90 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
