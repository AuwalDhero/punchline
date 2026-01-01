import React from 'react';
import FadeIn from '../components/FadeIn';
import { ArrowRight } from 'lucide-react';
import matter from 'gray-matter';
import { BlogPost } from '../types';

const blogFiles = import.meta.glob<string>(
  '/content/blog/*.md',
  {
    eager: true,
    query: '?raw',
    import: 'default'
  }
);



const posts: BlogPost[] = Object.entries(blogFiles).map(([path, raw]) => {
  const { data, content } = matter(raw);

  const slug = path.split('/').pop()?.replace('.md', '') ?? '';

  return {
    id: slug,
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    image: data.image,
    category: data.category,
    body: content, // ✅ REQUIRED BY BlogPost
  };
});


const Blog: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="bg-punchline-light py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black font-heading text-punchline-black mb-6">
              Insights & <span className="text-punchline-blue">Knowledge</span>
            </h1>
            <p className="text-xl text-punchline-gray leading-relaxed">
              CMS-powered thought leadership on the sales and marketing trends in Africa.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {posts.map((post, idx) => (
              <FadeIn key={post.id} delay={idx * 0.1}>
                <article className="group cursor-pointer">
                  <div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden mb-6">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-xs font-black uppercase tracking-widest text-punchline-blue">
                      <span>{post.category}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-400">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold font-heading text-punchline-black group-hover:text-punchline-blue transition-colors leading-tight">
                      {post.title}
                    </h2>

                    <p className="text-punchline-gray leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="pt-2">
                      <button className="flex items-center space-x-2 font-bold text-punchline-black group-hover:translate-x-2 transition-transform">
                        <span>Read Article</span>
                        <ArrowRight size={18} className="text-punchline-blue" />
                      </button>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
