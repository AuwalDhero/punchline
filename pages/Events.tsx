import React from 'react';
import FadeIn from '../components/FadeIn';
import { Calendar, MapPin, Award, Users } from 'lucide-react';
import matter from 'gray-matter';

/* ---------------------------------------------
   TYPES
--------------------------------------------- */
export interface PMHEvent {
  id: string;
  slug: string;
  title: string;
  type: string;
  date: string;
  location: string;
  category: 'masterclass' | 'corporate' | 'activity';
  image: string | null;
}

/* ---------------------------------------------
   BUILD-TIME CMS IMPORT (VITE SAFE)
--------------------------------------------- */
const eventFiles = import.meta.glob('/content/events/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

/* ---------------------------------------------
   PARSE EVENTS AT BUILD TIME
--------------------------------------------- */
const events: PMHEvent[] = Object.entries(eventFiles)
  .map(([path, raw]) => {
    const { data } = matter(raw);

    const slug = path.split('/').pop()?.replace('.md', '') ?? '';

    return {
      id: slug,
      slug,
      title: data.title ?? '',
      type: data.type ?? '',
      date: data.date ?? '',
      location: data.location ?? '',
      category: data.category ?? 'activity',
      image: data.image ?? null,
    };
  })
  // newest first
  .sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

/* ---------------------------------------------
   COMPONENT
--------------------------------------------- */
const Events: React.FC = () => {
  const masterclasses = events.filter(
    event => event.category === 'masterclass'
  );

  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="bg-punchline-black text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-punchline-blue/20 blur-3xl rounded-full translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-black font-heading mb-6">
              Our Impact <span className="text-punchline-blue">in Action</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Witness our recent activities across Nigeria, updated directly via CMS.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* MASTERCLASSES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-black font-heading text-punchline-black">
              Recent Masterclasses
            </h2>
            <div className="h-1.5 w-24 bg-punchline-blue mt-4 rounded-full"></div>
          </div>

          {masterclasses.length === 0 ? (
            <div className="text-center py-20 font-bold text-punchline-gray">
              No masterclasses published yet.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {masterclasses.map((event, idx) => (
                <FadeIn key={event.id} delay={idx * 0.1}>
                  <div className="bg-punchline-light p-8 rounded-[2rem] border border-gray-100 h-full hover:shadow-xl transition-all flex flex-col">
                    <div className="text-punchline-blue font-black uppercase text-xs tracking-widest mb-4 flex items-center">
                      <Award size={16} className="mr-2" />
                      {event.type}
                    </div>

                    <h3 className="text-2xl font-bold font-heading text-punchline-black mb-6 leading-tight flex-grow">
                      {event.title}
                    </h3>

                    <div className="space-y-3 text-punchline-gray">
                      <div className="flex items-center text-sm font-medium">
                        <Calendar
                          size={18}
                          className="mr-3 text-punchline-blue"
                        />
                        {event.date
                          ? new Date(event.date).toLocaleDateString()
                          : ''}
                      </div>

                      <div className="flex items-center text-sm font-medium">
                        <MapPin
                          size={18}
                          className="mr-3 text-punchline-blue"
                        />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CORPORATE TRAINING */}
      <section className="py-24 bg-punchline-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div className="space-y-8">
                <h2 className="text-4xl font-black font-heading text-punchline-black">
                  Corporate Training
                </h2>
                <p className="text-lg text-punchline-gray leading-relaxed">
                  Bespoke programs for Nigerian organizations. Automatically updated when new events are published.
                </p>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-fit">
                  <div className="text-punchline-blue font-black text-3xl mb-2">
                    50+
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Active Partnerships
                  </p>
                </div>

                <button className="bg-punchline-blue text-white px-10 py-4 rounded-full font-black text-lg shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2">
                  Request For Your Team <Users size={20} />
                </button>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <img
                src="https://picsum.photos/seed/corp/1000/1000"
                className="rounded-[3rem] shadow-2xl"
                alt="Corporate Training"
              />
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
