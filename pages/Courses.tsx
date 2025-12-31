
import React, { useState, useEffect } from 'react';
import FadeIn from '../components/FadeIn';
import { Clock, BookOpen, Filter } from 'lucide-react';
import { contentService } from '../services/content.service';
import { Course } from '../types';

const Courses: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contentService.getCourses().then(data => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  const filteredCourses = courses.filter(course => 
    filter === 'all' || course.type === filter
  );

  return (
    <div className="pt-20">
      <section className="bg-punchline-blue text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-black font-heading mb-6">Master Your Craft</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Dynamic courses managed via PMH CMS. Practical education for the African professional.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h2 className="text-2xl font-bold font-heading text-punchline-black flex items-center gap-2">
              <Filter className="text-punchline-blue" /> Browse Our Catalog
            </h2>
            <div className="flex bg-punchline-light p-1 rounded-full border border-gray-200">
              {['all', 'free', 'paid'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type as any)}
                  className={`px-8 py-2 rounded-full font-bold text-sm capitalize transition-all ${
                    filter === type 
                      ? 'bg-punchline-blue text-white shadow-md' 
                      : 'text-punchline-gray hover:text-punchline-blue'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 font-bold text-punchline-gray">Syncing Courses...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, idx) => (
                <FadeIn key={course.id} delay={idx * 0.1}>
                  <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={course.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'} 
                        alt={course.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-black text-punchline-blue uppercase tracking-widest shadow-sm">
                        {course.category}
                      </div>
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center text-punchline-blue text-sm font-bold">
                          <Clock size={16} className="mr-1" /> {course.duration}
                        </div>
                        <div className={`px-3 py-1 rounded-lg font-black text-sm ${course.type === 'free' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-punchline-blue'}`}>
                          {typeof course.price === 'number' && course.price > 0 ? `₦${course.price.toLocaleString()}` : 'FREE'}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold font-heading text-punchline-black mb-3 leading-tight group-hover:text-punchline-blue transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-punchline-gray text-sm leading-relaxed mb-6 flex-grow">{course.description}</p>
                      <button className={`w-full py-4 rounded-xl font-black transition-all flex items-center justify-center gap-2 ${
                        course.type === 'free' ? 'bg-punchline-light text-punchline-black' : 'bg-punchline-blue text-white shadow-lg'
                      }`}>
                        {course.type === 'free' ? 'Start Learning' : 'Enroll Now'} <BookOpen size={18} />
                      </button>
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
