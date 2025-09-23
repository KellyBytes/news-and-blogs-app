import React, { useState, useEffect } from 'react';
import News from './components/News';
import Blogs from './components/Blogs';

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlogs(true);
  };

  const handleBackToNews = () => {
    setShowNews(true);
    setShowBlogs(false);
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleCreateBlog = (newBlog, isEditing) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = isEditing
        ? prevBlogs.map((blog) => (blog === selectedPost ? newBlog : blog))
        : [...prevBlogs, newBlog];
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleEditBlog = (blog) => {
    setSelectedPost(blog);
    setIsEditing(true);
    setShowNews(false);
    setShowBlogs(true);
  };

  const handleDeleteBlog = (blogToDelete) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = prevBlogs.filter((blog) => blog !== blogToDelete);
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
  };

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(savedBlogs);
  }, []);

  return (
    <div className="w-full h-screen bg-linear-to-r from-purple-400 to-indigo-500 grid place-items-center">
      <div className="news-blogs-app w-[95vw] h-[90vh] lg:h-[95vmin] bg-zinc-950 shadow-[0_2rem_3rem_rgba(0,0,0,0.5)] rounded-2xl font-light">
        {showNews && (
          <News
            onShowBlogs={handleShowBlogs}
            blogs={blogs}
            onEditBlog={handleEditBlog}
            onDeleteBlog={handleDeleteBlog}
          />
        )}
        {showBlogs && (
          <Blogs
            onBack={handleBackToNews}
            onCreateBlog={handleCreateBlog}
            editPost={selectedPost}
            isEditing={isEditing}
          />
        )}
      </div>
    </div>
  );
};

export default App;
