import React, { useEffect, useState } from 'react';
import Weather from './Weather';
import Calendar from './Calendar';
// import './News.css';
import userImg from '../assets/images/user.jpg';
import noImg from '../assets/images/no-img.png';
import axios from 'axios';
import NewsModal from './NewsModal';

const News = () => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

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
  };

  useEffect(() => {
    const fetchNews = async () => {
      const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
      let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&country=ca&apikey=${API_KEY}`;

      if (searchQuery) {
        url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&country=ca&apikey=${API_KEY}`;
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
          <div className="user w-full h-1/5 bg-zinc-900 rounded-2xl flex flex-col justify-center items-center gap-y-8 cursor-pointer">
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
            <div className="nav-links flex flex-col gap-y-8 text-2xl uppercase tracking-[0.1rem]">
              {categories.map((category) => (
                <a
                  href="#"
                  key={category}
                  className="nav-link"
                  onClick={(e) => handleCategoryClick(e, category)}
                >
                  {category}
                </a>
              ))}
              <a href="#" className="nav-link">
                Bookmarks{' '}
                <i className="fa-regular fa-bookmark text-2xl ml-4"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section w-[clamp(30rem,43cqi,40%)] h-full rounded-2xl">
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
              <h2 className="headline-title w-full absolute bottom-0 left-0 pl-4 pr-16 py-4 font-bebas text-[clamp(1.5rem,1.8cqi,3rem)] tracking-[0.1rem] text-neutral-100 bg-[rgba(0,0,0,0.7)] rounded-tl-0 rounded-br-[3rem] rounded-tr-0 rounded-bl-[3rem]">
                {headline.title}
                <i className="fa-regular fa-bookmark absolute bottom-4 right-4 cursor-pointer"></i>
              </h2>
            </div>
          )}
          <div className="news-grid w-full h-1/2 bg-zinc-900 rounded-2xl grid grid-cols-3 grid-rows-2 gap-4 p-5 justify-center items-center">
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
                  <i className="fa-regular fa-bookmark absolute bottom-4 right-4 cursor-pointer"></i>
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
        <div className="my-blogs w-[clamp(20rem,27cqi,28%)] h-full bg-zinc-900 rounded-2xl">
          My Blogs
        </div>
        <div className="weather-calendar flex-1 flex flex-col gap-y-8">
          <Weather />
          <Calendar />
        </div>
      </div>
      <footer className="news-footer w-full min-h-20 bg-zinc-900 rounded-tl-0 rounded-tr-0 rounded-br-2xl rounded-bl-2xl">
        Footer
      </footer>
    </div>
  );
};

export default News;
