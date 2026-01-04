import React, { useState } from 'react';
import FadeIn from '../components/FadeIn';
import { Clock, BookOpen, Filter, ExternalLink } from 'lucide-react';
import matter from 'gray-matter';

/* ---------------------------------------------
   TYPES
--------------------------------------------- */
export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string | null;
  duration: string;
  price: number;
  type: 'free' | 'paid';
  description: string;
  registrationLink?: string;
}

/* ---------------------------------------------
   BUILD-TIME CONTENT IMPORT (VITE SAFE)
--------------------------------------------- */
const courseFiles = import.meta.glob('/content/courses/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

/* ---------------------------------------------
   PARSE COURSES AT BUILD TIME
--------------------------------------------- */
const courses: Course[] = Object.entries(courseFiles).map(([path, raw]) => {
  const { data } = matter(raw);
  const slug = path.split('/').pop()?.replace('.md', '') ?? '';

  return {
    id: slug,
    slug,
    title: data.title ?? '',
    category: data.category ?? '',
    image: data.image ?? null,
    duration: data.duration ?? '',
    price: typeof data.price === 'number' ? data.price : 0,
    type: data.type === 'paid' ? 'paid' : 'free',
    description: data.description ?? '',
    registrationLink: data.registrationLink,
  };
});

/* ---------------------------------------------
   COMPONENT
--------------------------------------------- */
const Courses: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'free' | 'paid'>('all');

  const filteredCourses = courses.filter(
    course => filter === 'all' || course.type === filter
  );

  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="bg-punchline-blue text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              Master Your Craft
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Practical courses managed via PMH CMS.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* COURSE LIST */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* FILTER */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Filter className="text-punchline-blue" /> Browse Our Catalog
            </h2>

            <div className="flex bg-punchline-light p-1 rounded-full border">
              {(['all', 'free', 'paid'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-8 py-2 rounded-full font-bold capitalize transition ${
                    filter === type
                      ? 'bg-punchline-blue text-white'
                      : 'text-punchline-gray'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* GRID */}
          {filteredCourses.length === 0 ? (
            <div className="text-center py-20 font-bold text-punchline-gray">
              No courses available.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, idx) => (
                <FadeIn key={course.id} delay={idx * 0.1}>
                  <div className="bg-white rounded-3xl border shadow-sm hover:shadow-xl flex flex-col h-full">
                    {/* IMAGE */}
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={
                          course.image ||
                          'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'
                        }
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center text-sm font-bold text-punchline-blue">
                          <Clock size={16} className="mr-1" />
                          {course.duration}
                        </div>

                        <span
                          className={`px-3 py-1 rounded-lg font-black text-sm ${
                            course.type === 'free'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-punchline-blue'
                          }`}
                        >
                          {course.type === 'paid'
                            ? `₦${course.price.toLocaleString()}`
                            : 'FREE'}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold mb-3">
                        {course.title}
                      </h3>

                      <p className="text-sm text-punchline-gray mb-6 flex-grow">
                        {course.description}
                      </p>

                      {/* CTA */}
                      {course.registrationLink && (
                        <a
                          href={course.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`mt-auto w-full py-4 rounded-xl font-black flex items-center justify-center gap-2 transition ${
                            course.type === 'free'
                              ? 'bg-punchline-light text-punchline-black'
                              : 'bg-punchline-blue text-white'
                          }`}
                        >
                          {course.type === 'free'
                            ? 'Start Learning'
                            : 'Enroll Now'}
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;
