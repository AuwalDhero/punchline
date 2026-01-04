import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { posts } from './Blog';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-24 text-center text-gray-500 font-bold">
        Article not found
      </div>
    );
  }

  return (
    <article className="pt-24 max-w-3xl mx-auto px-4">
      <h1 className="text-4xl font-black mb-4">{post.title}</h1>

      <p className="text-sm text-gray-500 mb-8">
        {post.date
          ? new Date(post.date).toLocaleDateString()
          : ''}
      </p>

      {/* ✅ ReactMarkdown v9 safe */}
      <div className="prose max-w-none">
        <ReactMarkdown>
          {post.body}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogDetail;
