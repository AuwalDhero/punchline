import React from 'react';
import FadeIn from '../components/FadeIn';
import { Calendar, MapPin, Award, Users, ExternalLink } from 'lucide-react';
import matter from 'gray-matter';

/* ---------------------------------------------
   TYPES
--------------------------------------------- */
export interface PMHEvent {
  id: string;
  slug: string;
  title: string;
  type: string;
  access: 'free' | 'paid';
  price?: number;
  date: string;
  location: string;
  category: 'masterclass' | 'corporate' | 'activity';
  image: string | null;
  registrationLink?: string;
}

/* ---------------------------------------------
   NORMALIZE CMS IMAGE PATHS
--------------------------------------------- */
const normalizeImage = (image?: string | null): string | null => {
  if (!image) return null;
  if (image.startsWith('http')) return image;
  return image.startsWith('/') ? image : `/${image}`;
};

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
      access: data.access ?? 'free',
      price: data.price,
      date: data.date ?? '',
      location: data.location ?? '',
      category: data.category ?? 'activity',
      image: normalizeImage(data.image),
      registrationLink: data.registrationLink,
    };
  })
  // Soonest first (upcoming events should appear in chronological order)
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

/* ---------------------------------------------
   COMPONENT
--------------------------------------------- */
const Events: React.FC = () => {
  // Filter only today and future events (runtime check)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today;
  });

  return (
    <div className="pt-20">
      {/* ALL EVENTS (every category now shows) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-16">
            <h2 className="text-4xl font-black font-heading text-punchline-black">
              Upcoming Events
            </h2>
            <div className="h-1.5 w-24 bg-punchline-blue mt-4 rounded-full"></div>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="text-center py-20 font-bold text-punchline-gray">
              No upcoming events at this time.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {upcomingEvents.map((event, idx) => (
                <FadeIn key={event.id} delay={idx * 0.1}>
                  <div className="bg-punchline-light p-8 rounded-[2rem] border border-gray-100 flex flex-col h-full">

                    {/* IMAGE */}
                    {event.image && (
                      <div className="mb-6 rounded-2xl overflow-hidden aspect-video">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* TYPE */}
                    <div className="text-punchline-blue font-black uppercase text-xs tracking-widest mb-3 flex items-center">
                      <Award size={16} className="mr-2" />
                      {event.type}
                    </div>

                    {/* TITLE */}
                    <h3 className="text-2xl font-bold mb-4 flex-grow">
                      {event.title}
                    </h3>

                    {/* META */}
                    <div className="space-y-2 text-sm text-punchline-gray mb-4">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-punchline-blue" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>

                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-punchline-blue" />
                        {event.location}
                      </div>

                      <div className="font-bold text-punchline-black">
                        {event.price ? `₦${event.price.toLocaleString()}` : 'FREE EVENT'}
                      </div>
                    </div>

                    {/* CTA */}
                    {event.registrationLink && (
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center justify-center gap-2 bg-punchline-blue text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition"
                      >
                        Register Now <ExternalLink size={16} />
                      </a>
                    )}

                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CORPORATE SECTION (UNCHANGED) */}
      <section className="py-24 bg-punchline-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div>
              <h2 className="text-4xl font-black mb-6">Corporate Training</h2>
              <p className="text-lg text-punchline-gray mb-8">
                Bespoke programs for Nigerian organizations.
              </p>

              <button className="bg-punchline-blue text-white px-10 py-4 rounded-full font-black flex items-center gap-2">
                Request For Your Team <Users size={20} />
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <img
              src="https://picsum.photos/seed/corp/1000/1000"
              className="rounded-[3rem]"
              alt="Corporate Training"
            />
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Events;