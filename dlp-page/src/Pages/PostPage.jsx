import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner } from "flowbite-react";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setErr(false);

        // Fetch the single post by slug
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok || !data.posts || data.posts.length === 0) {
          setErr(true);
          setLoading(false);
          return;
        }

        const mainPost = data.posts[0];
        setPost(mainPost);

        // Fetch related posts (excluding the main post)
        const relatedRes = await fetch(`/api/post/getposts?category=${mainPost.category}`);
        const relatedData = await relatedRes.json();

        if (relatedRes.ok && relatedData.posts) {
          const filtered = relatedData.posts.filter((p) => p._id !== mainPost._id);
          setRelatedPosts(filtered);
        }

        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setErr(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  if (err || !post)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        Something went wrong.
      </div>
    );

  return (
    <main className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <header className="relative w-full h-[450px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-70 flex flex-col justify-center items-center text-center px-5">
          <span className="text-sm uppercase text-White font-semibold">
            {post.category}
          </span>
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight max-w-4xl">
            {post.title}
          </h1>
          <p className="text-gray-200 mt-3 text-lg">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </header>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-5 py-10">
        <article className=" max-w-none">
          <div className="'p-3 max-w-2xl mx-auto w-full post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 pb-10">
          <h2 className="text-2xl font-bold mb-5">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <div
                key={relatedPost._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs uppercase text-indigo-600 font-semibold">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-lg font-semibold mt-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {relatedPost.content.replace(/<[^>]+>/g, "")}
                  </p>
                  <Link
                    to={`/blog/${relatedPost.slug}`}
                    className="inline-block mt-3 text-indigo-600 font-medium hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default PostPage;
