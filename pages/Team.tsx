import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, ChevronRight, Star, Award, Briefcase } from 'lucide-react';
import FadeIn from '../components/FadeIn';

// Import team images
import saiduImg from '../image/said.png';
import aishatImg from '../image/aishat.png';
import peterImg from '../image/peter.png';
import kudratImg from '../image/kudrat.png';
import aminuImg from '../image/aminu.png';
import danielImg from '../image/daniel.png';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  gradient: string;
  description: string;
  isFounder?: boolean;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Saidu Jibrin',
    role: 'Founder / Business Development Consultant',
    image: saiduImg,
    gradient: 'from-blue-600 to-blue-900',
    description:
      'Visionary founder driving business growth strategies across African markets with deep expertise in marketing consultancy and business development.',
    isFounder: true,
  },
  {
    name: 'Aishat Abdulganiyyi',
    role: 'Social Media & Content Marketing Specialist',
    image: aishatImg,
    gradient: 'from-purple-500 to-indigo-700',
    description:
      'Crafting compelling digital narratives and social media strategies that build brand authority and engage target audiences at scale.',
  },
  {
    name: 'Peter Kpanaki',
    role: 'Meta Ads Specialist',
    image: peterImg,
    gradient: 'from-cyan-500 to-teal-700',
    description:
      'Performance-driven paid advertising expert delivering measurable ROI through precision-targeted, data-optimised Meta campaigns.',
  },
  {
    name: 'Kudrat Daibu',
    role: 'SEO & Website Design Specialist',
    image: kudratImg,
    gradient: 'from-emerald-500 to-green-700',
    description:
      'Building powerful digital presences through strategic SEO and conversion-focused website design that attracts and retains customers.',
  },
  {
    name: 'Aminu Muhammed Bello',
    role: 'Administrative Manager',
    image: aminuImg,
    gradient: 'from-orange-500 to-amber-700',
    description:
      'Keeping operations smooth and efficient, ensuring every client engagement is coordinated and delivered with excellence and precision.',
  },
  {
    name: 'Daniel Dauda',
    role: 'Sales Training Specialist',
    image: danielImg,
    gradient: 'from-red-500 to-rose-700',
    description:
      'Experienced sales training specialist focused on developing high-performing sales teams, improving customer engagement strategies, and driving sustainable revenue growth through practical training and performance coaching.',
  },
];

const pillars = [
  {
    icon: <Star className="w-6 h-6" />,
    label: 'Industry Experts',
    desc: 'Specialists with deep, battle-tested domain knowledge',
  },
  {
    icon: <Award className="w-6 h-6" />,
    label: 'Results-Driven',
    desc: 'Every action tied to measurable business outcomes',
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    label: 'Client-Focused',
    desc: 'Your success is the only benchmark we work toward',
  },
];

const Team: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        className="bg-punchline-blue text-white py-24 relative overflow-hidden"
        aria-label="Team hero"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <p className="text-blue-200 font-bold uppercase tracking-widest mb-4 text-sm">
              Our People
            </p>

            <h1 className="text-5xl md:text-7xl font-black font-heading mb-6">
              Meet Our Team
            </h1>

            <p className="text-xl text-blue-100 max-w-3xl leading-relaxed">
              Behind every successful campaign is a team of passionate specialists dedicated to
              driving real, measurable results for your business.
            </p>
          </FadeIn>
        </div>

        <div
          className="absolute right-0 bottom-0 opacity-10 pointer-events-none"
          aria-hidden="true"
        >
          <Users size={400} />
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white" aria-label="About our team">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-black font-heading text-punchline-black mb-6">
              The Minds Behind PMH
            </h2>

            <p className="text-lg text-punchline-gray leading-relaxed">
              At Punchline Marketing Hub, we believe great marketing starts with great people.
              Our team brings together specialists across every discipline — from paid media to
              organic search, content creation to operations — unified by a shared commitment to
              your business growth.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {pillars.map((item, idx) => (
              <FadeIn key={item.label} delay={idx * 0.1}>
                <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-punchline-light hover:bg-blue-50 transition-colors duration-300">
                  <div className="w-12 h-12 bg-punchline-blue text-white rounded-xl flex items-center justify-center mb-4">
                    {item.icon}
                  </div>

                  <h3 className="font-bold text-punchline-black text-lg mb-2">
                    {item.label}
                  </h3>

                  <p className="text-punchline-gray text-sm">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-24 bg-punchline-light" aria-label="Team members">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl font-black font-heading text-punchline-black">
              Our Specialists
            </h2>

            <p className="text-punchline-gray mt-4 text-lg">
              Each expert, a cornerstone of our collective success.
            </p>
          </FadeIn>

          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, idx) => (
              <FadeIn key={member.name} delay={idx * 0.12}>
                <motion.article
                  whileHover={{
                    y: -8,
                    boxShadow: '0 24px 60px rgba(11,86,198,0.14)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="bg-white rounded-3xl p-8 text-center border border-gray-100 cursor-default group w-72"
                  style={{
                    boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
                  }}
                  aria-label={`${member.name}, ${member.role}`}
                >
                  {/* Founder Badge */}
                  {member.isFounder && (
                    <div className="flex justify-center mb-4">
                      <span className="bg-punchline-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        Founder
                      </span>
                    </div>
                  )}

                  {/* Team Image */}
                  <div className="relative inline-block mb-6">
                    <div
                      className={`p-1 rounded-full bg-gradient-to-br ${member.gradient} shadow-lg`}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-28 h-28 object-cover rounded-full border-4 border-white group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Member Info */}
                  <h3 className="text-xl font-black font-heading text-punchline-black mb-2">
                    {member.name}
                  </h3>

                  <p className="text-punchline-blue text-xs font-bold uppercase tracking-wider mb-4 leading-relaxed">
                    {member.role}
                  </p>

                  <div className="w-12 h-0.5 bg-punchline-blue mx-auto mb-4 group-hover:w-20 transition-all duration-300" />

                  <p className="text-punchline-gray text-sm leading-relaxed">
                    {member.description}
                  </p>
                </motion.article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-24 bg-punchline-black text-white"
        aria-label="Call to action"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-black font-heading mb-6">
              Work With Our Expert Team
            </h2>

            <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Ready to grow your business? Connect with the people who make it happen.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center bg-punchline-blue text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-punchline-black"
            >
              Get in Touch

              <ChevronRight
                className="ml-2 w-5 h-5"
                aria-hidden="true"
              />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Team;