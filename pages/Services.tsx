import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Target } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import matter from 'gray-matter';
import { ICON_MAP } from '../constants';

/* ---------------------------------------------
   TYPES
--------------------------------------------- */
export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  icon: string;
}

/* ---------------------------------------------
   BUILD-TIME CMS IMPORT (VITE SAFE)
--------------------------------------------- */
const serviceFiles = import.meta.glob('/content/services/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

/* ---------------------------------------------
   PARSE SERVICES AT BUILD TIME
--------------------------------------------- */
const services: Service[] = Object.entries(serviceFiles)
  .map(([path, raw]) => {
    const { data, content } = matter(raw);
    const slug = path.split('/').pop()?.replace('.md', '') ?? '';

    return {
      id: slug,
      slug,
      title: data.title ?? '',
      description: data.description ?? '',
      body: content ?? '',
      icon: data.icon ?? '',
    };
  });

/* ---------------------------------------------
   COMPONENT
--------------------------------------------- */
const Services: React.FC = () => {
  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="bg-punchline-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-black font-heading mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Dynamic solutions driven by CMS-managed expertise for African markets.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <div className="text-center py-20 text-punchline-gray font-bold">
              No services published yet.
            </div>
          ) : (
            <div className="space-y-32">
              {services.map((service, idx) => (
                <div
                  key={service.id}
                  className={`flex flex-col ${
                    idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  } items-center gap-16`}
                >
                  {/* IMAGE */}
                  <FadeIn
                    direction={idx % 2 === 1 ? 'right' : 'left'}
                    className="lg:w-1/2"
                  >
                    <div className="relative">
                      <img
                        src={`https://picsum.photos/seed/service-${service.id}/1000/800`}
                        alt={service.title}
                        className="rounded-3xl shadow-2xl"
                      />
                      <div className="absolute -bottom-6 -right-6 bg-punchline-blue p-8 rounded-2xl shadow-xl text-white">
                        <div className="text-4xl font-black font-heading mb-1">
                          0{idx + 1}
                        </div>
                        <div className="font-bold uppercase tracking-widest text-xs opacity-70">
                          Expertise
                        </div>
                      </div>
                    </div>
                  </FadeIn>

                  {/* CONTENT */}
                  <FadeIn
                    direction={idx % 2 === 1 ? 'left' : 'right'}
                    delay={0.2}
                    className="lg:w-1/2 space-y-8"
                  >
                    <div className="inline-block p-4 bg-blue-50 text-punchline-blue rounded-2xl">
                      {ICON_MAP[service.icon] || <Target size={32} />}
                    </div>

                    <h2 className="text-4xl font-black font-heading text-punchline-black">
                      {service.title}
                    </h2>

                    <p className="text-xl text-punchline-gray leading-relaxed">
                      {service.description}
                    </p>

                    <div className="prose prose-lg text-punchline-gray">
                      {service.body}
                    </div>

                    {/* CONSTANT FEATURES */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        'Data-Driven',
                        'Localized',
                        'ROI Focused',
                        'Strategic',
                      ].map(item => (
                        <li
                          key={item}
                          className="flex items-center space-x-2 font-bold text-punchline-black"
                        >
                          <CheckCircle2
                            className="text-punchline-blue"
                            size={20}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4">
                      <Link
                        to="/contact"
                        className="bg-punchline-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all inline-block"
                      >
                        Discuss this Solution
                      </Link>
                    </div>
                  </FadeIn>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;
