import React, { useEffect, useState } from 'react';
import Weather from './Weather';
import Calendar from './Calendar';
// import './News.css';
import userImg from '../assets/images/user.jpg';
import noImg from '../assets/images/no-img.png';
import blogImg1 from '../assets/images/blog1.jpg';
import blogImg2 from '../assets/images/blog2.jpg';
import blogImg3 from '../assets/images/blog3.jpg';
import blogImg4 from '../assets/images/blog4.jpg';
import axios from 'axios';
import NewsModal from './NewsModal';
import Bookmarks from './Bookmarks';
import BlogsModal from './BlogsModal';

const News = ({ onShowBlogs, blogs, onEditBlog, onDeleteBlog }) => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarksModal, setShowBookmarksModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showBlogsModal, setShowBlogsModal] = useState(false);

  const categories = [
    'general',
    'world',
    'business',
    'technology',
    'entertainment',
    'sports',
    'science',
    'health',
    'nation',
  ];

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput('');
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
    setShowBookmarksModal(false);
  };

  const handleBookmarkClick = (article) => {
    setBookmarks((prevBookmarks) => {
      const updatedBookmarks = prevBookmarks.find(
        (bookmark) => bookmark.title === article.title
      )
        ? // delete if the bookmarked news is clicked
          prevBookmarks.filter((bookmark) => bookmark.title !== article.title)
        : [...prevBookmarks, article];
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  const handleBlogClick = (blog) => {
    setSelectedPost(blog);
    setShowBlogsModal(true);
  };

  const closeBlogsModal = () => {
    setShowBlogsModal(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    const fetchNews = async () => {
      const N_API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
      let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&country=ca&apikey=${N_API_KEY}`;

      if (searchQuery) {
        url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&country=ca&apikey=${N_API_KEY}`;
      }

      const response = await axios.get(url);
      const fetchedNews = response.data.articles;

      setHeadline(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 7));

      // console.log('Headline: ' + fetchedNews[0]);
      // console.log('News: ' + fetchedNews.slice(1, 7));
    };

    fetchNews();
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(savedBookmarks);
  }, []);

  return (
    <div className="news text-3xl text-neutral-200 w-full h-full flex flex-col justify-between gap-y-8">
      <header className="news-header w-full min-h-[7rem] bg-zinc-900 rounded-tl-2xl rounded-br-none rounded-tr-2xl rounded-bl-none flex justify-between items-center px-8 py-0">
        <h1 className="logo font-bebas text-7xl tracking-[0.2rem]">
          News & Blogs
        </h1>
        <div className="search-bar relative">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search News..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-96 h-16 bg-zinc-950 outline-none rounded-[5rem] pl-8 pr-16 py-0 focus:w-[35rem] focus:placeholder-transparent transition-width duration-300"
            />
            <button
              type="submit"
              className="bg-transparent absolute top-1/2 right-4 -translate-y-1/2 text-neutral-400 text-2xl cursor-pointer"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content flex gap-x-8 h-[calc(100%-16rem)] px-8 py-0">
        <div className="navbar w-72 h-full flex flex-col gap-y-8">
          <div
            className="user w-full h-1/5 bg-zinc-900 rounded-2xl flex flex-col justify-center items-center gap-y-8 cursor-pointer"
            onClick={onShowBlogs}
          >
            <img
              src={userImg}
              alt="User Image"
              className="w-28 aspect-square object-cover rounded-[50%]"
            />
            <p className="font-comfortaa text-2xl">Mary's Blog</p>
          </div>
          <nav className="categories w-full h-[calc(80%-2rem)] bg-zinc-900 rounded-2xl flex flex-col gap-y-8 p-8">
            <h1 className="nav-heading font-bebas text-[clamp(1.5rem,2.5cqi,3rem)] tracking-[0.2rem] mb-8">
              Categories
            </h1>
            <div className="nav-links flex flex-col gap-y-4 lg:gap-y-8 text-2xl uppercase tracking-[0.1rem] ">
              {categories.map((category) => (
                <a
                  href="#"
                  key={category}
                  className={`nav-link ${
                    category === selectedCategory ? 'text-red-400' : ''
                  }`}
                  onClick={(e) => handleCategoryClick(e, category)}
                >
                  {category}
                </a>
              ))}
              <a
                href="#"
                className="nav-link"
                onClick={() => setShowBookmarksModal(true)}
              >
                Bookmarks <i className="bx bxs-bookmarks text-3xl ml-2"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section w-[clamp(30rem,43cqi,40%)] h-full rounded-2xl overflow-hidden">
          {headline && (
            <div
              className="headline w-full h-[calc(50%-2rem)] bg-zinc-900 rounded-2xl mb-8 relative"
              onClick={() => {
                handleArticleClick(headline);
              }}
            >
              <img
                src={headline.image || noImg}
                alt={headline.title}
                className="w-full h-full object-cover rounded-2xl opacity-40"
              />
              <h2 className="headline-title w-full absolute bottom-0 left-0 pl-4 pr-16 py-4 font-bebas text-[clamp(1.5rem,1.8cqi,3rem)] tracking-[0.1rem] text-neutral-100 bg-[rgba(0,0,0,0.7)] rounded-br-2xl rounded-bl-2xl">
                {headline.title}
                <i
                  className={`bx ${
                    bookmarks.some(
                      (bookmark) => bookmark.title === headline.title
                    )
                      ? 'bxs-bookmarks'
                      : 'bx-bookmarks'
                  } absolute bottom-4 right-4 cursor-pointer`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarkClick(headline);
                  }}
                ></i>
              </h2>
            </div>
          )}
          <div className="news-grid w-full h-1/2 bg-zinc-900 rounded-2xl grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:grid-rows-2 gap-4 p-5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] justify-center items-center">
            {news.map((article, index) => (
              <div
                key={index}
                className="news-grid-item w-full h-full min-h-60 rounded-2xl relative"
                onClick={() => {
                  handleArticleClick(article);
                }}
              >
                <img
                  src={article.image || noImg}
                  alt={article.title}
                  className="w-full h-full block object-cover rounded-2xl opacity-50"
                />
                <h3 className="absolute bottom-0 left-0 py-4 pr-12 pl-4 font-bebas text-2xl font-light leading-[1.4rem] bg-[rgba(0,0,0,0.7)] w-full rounded-tl-0 rounded-tr-0 rounded-br-2xl rounded-bl-2xl">
                  {article.title}
                  <i
                    className={`bx ${
                      bookmarks.some(
                        (bookmark) => bookmark.title === article.title
                      )
                        ? 'bxs-bookmarks'
                        : 'bx-bookmarks'
                    } absolute bottom-4 right-4 cursor-pointer`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkClick(article);
                    }}
                  ></i>
                </h3>
              </div>
            ))}
          </div>
        </div>
        <NewsModal
          show={showModal}
          article={selectedArticle}
          onClose={() => setShowModal(false)}
        />
        <Bookmarks
          show={showBookmarksModal}
          bookmarks={bookmarks}
          onClose={() => setShowBookmarksModal(false)}
          onSelectArticle={handleArticleClick}
          onDeleteBookmark={handleBookmarkClick}
        />
        <div className="my-blogs w-[clamp(20rem,27cqi,28%)] h-full bg-zinc-900 rounded-2xl overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]  flex flex-col gap-y-12 pb-8">
          <h1 className="my-blogs-heading font-bebas text-[3rem] text-neutral-200 tracking-[0.1rem] p-8">
            My Blogs
          </h1>
          <div className="blog-posts flex flex-wrap justify-between gap-[1.2rem] p-[1.2rem]">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="blog-post grow-0 shrink basis-[calc(100%-0.6rem)] lg:basis-[calc(50%-0.6rem)] rounded-2xl relative group group"
                onClick={() => handleBlogClick(blog)}
              >
                <img
                  src={blog.image || noImg}
                  alt={blog.title}
                  className="w-full h-full object-cover rounded-2xl opacity-50"
                />
                <h3 className="w-full absolute bottom-0 left-0 p-4 bg-[rgba(0,0,0,0.7)] rounded-br-2xl rounded-bl-2xl text-[1.6rem] font-light uppercase leading-[1.6rem] text-neutral-50 break-words">
                  {blog.title}
                </h3>
                <div className="post-buttons absolute top-4 right-4 flex justify-center gap-x-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <button
                    className="edit-post bg-transparent outline-none text-[2.5rem] text-neutral-50 cursor-pointer"
                    onClick={() => onEditBlog(blog)}
                  >
                    <i className="bx bxs-edit"></i>
                  </button>
                  <button
                    className="delete-post bg-transparent outline-none text-[2.5rem] text-neutral-50 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteBlog(blog);
                    }}
                  >
                    <i className="bx bxs-x-circle"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {selectedPost && showBlogsModal && (
            <BlogsModal
              show={showBlogsModal}
              blog={selectedPost}
              onClose={closeBlogsModal}
            />
          )}
        </div>
        <div className="weather-calendar flex-1 flex flex-col gap-y-8">
          <Weather />
          <Calendar />
        </div>
      </div>
      <footer className="news-footer w-full min-h-20 bg-zinc-900 rounded-tl-0 rounded-tr-0 rounded-br-2xl rounded-bl-2xl flex items-center justify-between py-0 px-16">
        <p className="text-[1.4rem] font-light text-neutral-300">
          <span className="font-bebas text-[2rem]">News & Blogs App</span>
        </p>
        <p className="text-[1.4rem] font-light text-neutral-300">
          &copy; All Right Reserved By KellyBytes
        </p>
      </footer>
    </div>
  );
};

export default News;
