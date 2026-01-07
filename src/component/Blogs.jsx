import React from "react";

const blogs = [
  {
    img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=800&q=60",
    title: "Top 10 Tips for First-Time Pet Owners",
    desc: "Learn the essential tips every first-time pet owner should know to take care of their new furry friend.",
    link: "#",
  },
  {
    img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=800&q=61",
    title: "How to Choose the Right Pet for Your Lifestyle",
    desc: "Picking the perfect pet can be tricky. Find out how to select a pet that suits your life and schedule.",
    link: "#",
  },
  {
    img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=800&q=62",
    title: "Healthy Eating Habits for Your Pets",
    desc: "Nutrition is key! Learn about balanced diets and healthy food choices for your cats, dogs, and birds.",
    link: "#",
  },
  {
    img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=800&q=63",
    title: "Grooming Tips for Different Pets",
    desc: "From cats to dogs to birds, proper grooming keeps your pets happy and healthy. Learn the best practices.",
    link: "#",
  },
];

const Blogs = () => {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
        Latest Blogs
      </h2>

      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg dark:shadow-black/20 transition-transform hover:-translate-y-2"
          >
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {blog.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {blog.desc}
              </p>
              <a
                href={blog.link}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
