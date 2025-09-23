import React from 'react';
import demoImg from '../assets/images/demo.jpg';
import noImg from '../assets/images/no-img.png';

const Bookmarks = ({
  show,
  bookmarks,
  onClose,
  onSelectArticle,
  onDeleteBookmark,
}) => {
  if (!show) return;

  return (
    <div className="modal-overlay fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-[1000]">
      <div className="modal-content w-[90%] max-w-[60rem] h-auto max-h-[90%] bg-zinc-900 p-16 rounded-2xl shadow-[0,0,5rem,rgba(0,0,0,0.5)] relative overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <span
          className="close-button absolute top-6 right-10 text-[2rem] text-neutral-50 cursor-pointer"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </span>
        <h2 className="bookmarks-heading font-bebas text-[3rem] font-light text-neutral-200 tracking-[0.1rem] mb-8">
          Bookmarked News
        </h2>
        <div className="bookmarks-list flex flex-col gap-4">
          {bookmarks.map((article, index) => (
            <div
              className="bookmark-item flex items-center justify-between gap-x-8 cursor-pointer"
              key={index}
              onClick={() => onSelectArticle(article)}
            >
              <img
                src={article.image || noImg}
                alt={article.title}
                className="w-[7rem] h-[7rem] object-cover rounded-[0.8rem] mr-4"
              />
              <h3 className="font-comfortaa text-[1.5rem] font-bold text-neutral-50">
                {article.title}
              </h3>
              <span
                className="delete-button text-[2.4rem] text-purple-400 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteBookmark(article);
                }}
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
