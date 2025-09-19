import React from 'react';
import Weather from './Weather';
import Calendar from './Calendar';
// import './News.css';

const News = () => {
  return (
    <div className="news text-3xl text-neutral-200 w-full h-full flex flex-col justify-between gap-y-8">
      <header className="news-header w-full min-h-[7rem] bg-zinc-900 rounded-tl-2xl rounded-br-none rounded-tr-2xl rounded-bl-none flex justify-between items-center px-8 py-0">
        <h1 className="logo font-bebas text-7xl tracking-[0.2rem]">
          News & Blogs
        </h1>
        <div className="search-bar relative">
          <form>
            <input
              type="text"
              placeholder="Search News..."
              className="w-96 h-16 bg-zinc-950 outline-none rounded-[5rem] pl-8 pr-16 py-0 focus:w-[35rem] focus:placeholder-transparent transition-width duration-300"
            />
            <button
              type="submit"
              className="bg-transparent absolute top-1/2 right-4 -translate-y-1/2 text-neutral-400 text-2xl"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content flex gap-x-8 h-[calc(100%-16rem)] px-8 py-0">
        <div className="navbar w-72 h-full flex flex-col gap-y-8">
          <div className="user w-full h-1/5 bg-zinc-900 rounded-2xl">User</div>
          <nav className="categories w-full h-[calc(80%-2rem)] bg-zinc-900 rounded-2xl">
            Categories
          </nav>
        </div>
        <div className="news-section w-[clamp(30rem,43cqi,40%)] h-full rounded-2xl">
          <div className="headline w-full h-[calc(50%-2rem)] bg-zinc-900 rounded-2xl mb-8">
            Headline
          </div>
          <div className="news-grid w-full h-1/2 bg-zinc-900 rounded-2xl">
            News Grid
          </div>
        </div>
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
