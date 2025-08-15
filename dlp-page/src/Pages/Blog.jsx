import React, { useEffect, useState } from 'react';
import SecondHero from '../components/SecondHero';
import { Card, Badge, Spinner, Button } from 'flowbite-react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';

const Blog = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [post, setPost] = useState([]);
  const [blog, setBlog] = useState([])
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        const [resData, blogresData] = await Promise.all([
          fetch('/api/post/getposts'),
          fetch('/api/settings/blog')
        ])
          
        const [res, blogres] = await Promise.all([resData.json(), blogresData.json() ])
        // const res = await fetch('/api/post/getposts');
        // const data = await res.json();

        if (!resData.ok || !blogresData.ok) {
          setErr(true);
          return;
        }
        setBlog(blogres)
        setPost(res.posts);
      } catch (err) {
        console.log(err.message);
        setErr(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  const handleShowMore = async () => {
    const startIndex = post.length;
    try {
      const res = await fetch(`/api/post/getposts?startIndex=${startIndex}`);
      if (!res.ok) return;

      const data = await res.json();
      if (data.posts) {
        setPost((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.error('Error in handleShowMore:', error);
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <SecondHero title={blog.title} content={blog.subtitle} />

      {/* Title */}
      <section className="mt-28 text-center">
        <h1 className="text-4xl font-bold font-sans">
          Delsu Codel News & Updates
        </h1>
        <p className="text-gray-600 mt-2">
          Stay updated with the latest news, articles, and stories.
        </p>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <Spinner size="xl" color="info" />
        </div>
      )}

      {/* Error State */}
      {err && (
        <div className="text-center text-red-600 mt-10">
          Failed to load posts. Please try again later.
        </div>
      )}

      {/* Posts Grid */}
  <section className="max-w-6xl mx-auto px-5 pb-10">
  <h2 className="text-2xl font-bold mb-5">Latest Articles</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {post.map((data) => (
      <div
        key={data._id}
        className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
      >
        {/* Image */}
        <Link to={`/post/${data.slug}`}>
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-48 object-cover"
          />
        </Link>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <span className="text-xs uppercase text-indigo-600 font-semibold">
            {data.category}
          </span>

          {/* Title */}
          <Link to={`/post/${data.slug}`}>
            <h3 className="text-lg font-semibold mt-2 hover:text-indigo-600 transition">
              {data.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm mt-2 line-clamp-3">
            {data.content.replace(/<[^>]+>/g, "")}
          </p>

          {/* Read More */}
          <Link
            to={`/post/${data.slug}`}
            className="inline-block mt-3 text-indigo-600 font-medium hover:underline"
          >
            Read more →
          </Link>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Show More Button */}
      {showMore && !loading && post.length > 0 && (
        <div className="flex justify-center mt-10">
          <Button
            color="info"
            onClick={handleShowMore}
            className="px-6 py-2 font-semibold"
          >
            Show More
          </Button>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16">
        <CallToAction />
      </div>
    </main>
  );
};

export default Blog;
