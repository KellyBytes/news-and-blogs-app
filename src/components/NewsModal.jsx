import React from 'react';
import demoImg from '../assets/images/demo.jpg';
import noImg from '../assets/images/no-img.png';

const NewsModal = ({ show, article, onClose }) => {
  if (!show) return;

  return (
    <div className="modal-overlay fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-[1000]">
      <div className="modal-content w-[90%] max-w-[60rem] h-auto max-h-full bg-zinc-900 p-16 rounded-2xl shadow-[0,0,5rem,rgba(0,0,0,0.5)] relative">
        <span
          className="close-button absolute top-4 right-8 text-[2rem] text-neutral-50 cursor-pointer"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </span>
        {article && (
          <>
            <img
              src={article.image || noImg}
              alt={article.title}
              className="modal-image w-full h-auto max-h-[30rem] object-cover rounded-2xl opacity-50"
            />
            <h2 className="modal-title font-bebas text-[2rem] text-neutral-50 tracking-[0.1rem] mt-8">
              {article.title}
            </h2>
            <p className="modal-source font-comfortaa text-[1.4rem] text-neutral-300 mt-4">
              Source: {article.source.name}
            </p>
            <p className="modal-date font-comfortaa text-[1.4rem] text-neutral-300 mt-4">
              {new Date(article.publishedAt).toLocaleString('en-CA', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <p className="modal-content-text text-[1.6rem] mt-8 leading-[2.7rem] text-neutral-200">
              {article.content}
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="read-more-link w-[15rem] inline-block bg-gradient-to-r from-purple-400 to-indigo-500 mt-8 py-4 px-8 text-neutral-50 rounded-[5rem] text-[1.6rem] text-center uppercase tracking-[0.1rem] active:translate-y-[0.1rem]"
            >
              Read More
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsModal;
