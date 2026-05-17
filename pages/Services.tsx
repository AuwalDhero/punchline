import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Target } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { ICON_MAP } from '../constants';

// Import local service images using their exact folder names
import strategyImg from '../image/strategyandcosulting.png';
import brandingImg from '../image/branding.png';
import digitalImg from '../image/digtialmarketing.png';

/* ---------------------------------------------
   TYPES
--------------------------------------------- */
export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  image: string; 
  features: string[];
}

/* ---------------------------------------------
   HARDCODED SERVICES DATA
--------------------------------------------- */
const services: Service[] = [
  {
    id: 'strategy-consulting',
    slug: 'strategy-consulting',
    title: 'Strategy & Consulting',
    description: 'Drive sustainable growth with data-backed market analysis, target positioning, and integrated sales-marketing funnel optimization tailored for high-impact performance.',
    icon: 'strategy',
    image: strategyImg,
    features: [
      'Market research & competitive analysis',
      'Brand positioning & messaging strategy',
      'Go-to-market (GTM) strategy',
      'Marketing & sales funnel design',
      'Buyer persona development',
      'Sales and marketing alignment consulting',
      'Pricing & packaging strategy',
    ],
  },
  {
    id: 'branding-creative',
    slug: 'branding-creative',
    title: 'Branding & Creative',
    description: 'Craft an unforgettable brand presence through strategic design, captivating copywriting, and exceptional user experiences that resonate deeply with your audience.',
    icon: 'creative',
    image: brandingImg,
    features: [
      'Brand identity',
      'Graphic design',
      'Copywriting',
      'Web design & UX/UI',
      'Rebranding & brand refresh',
    ],
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Accelerate your customer acquisition across high-intent channels with optimized search visibility, social storytelling, paid media, and automated lifecycle marketing.',
    icon: 'digital',
    image: digitalImg,
    features: [
      'Search engine optimisation (SEO)',
      'Social media marketing',
      'Email marketing & marketing automation',
      'Affiliate & partnership marketing',
      'Influencer marketing',
      'Blog posts, whitepapers, ebooks, case studies',
      'Meta ads',
    ],
  },
];

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
              Dynamic solutions driven by expert strategy and execution tailored for your market.
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
                    <div className="relative w-full">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="rounded-3xl shadow-2xl w-full h-auto object-cover aspect-[5/4]"
                      />
                      <div className="absolute -bottom-6 -right-6 bg-punchline-blue p-8 rounded-2xl shadow-xl text-white hidden sm:block">
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

                    {/* FEATURES LIST */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map(item => (
                        <li
                          key={item}
                          className="flex items-start space-x-2 font-bold text-punchline-black"
                        >
                          <CheckCircle2
                            className="text-punchline-blue mt-1 shrink-0"
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