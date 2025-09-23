import React from 'react';
import demoImg from '../assets/images/demo.jpg';

const BlogsModal = ({ show, blog, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-[1000]">
      <div className="modal-content w-[90%] max-w-[60rem] h-auto max-h-full bg-zinc-900 p-16 rounded-2xl shadow-[0,0,5rem,rgba(0,0,0,0.5)] relative">
        <span
          className="close-button absolute top-6 right-10 text-[2rem] text-neutral-50 cursor-pointer"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </span>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="blogs-modal-image max-w-full h-3/5 object-cover rounded-2xl opacity-50"
          />
        )}

        <h2 className="blogs-modal-title font-bebas text-[3rem] text-neutral-50 tracking-[0.1rem] mt-8">
          {blog.title}
        </h2>
        <p className="blog-post-content font-comfortaa text-[1.4rem] text-neutral-300 mt-4 max-h-80 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {blog.content}
        </p>
        <div className="bookmarks-list flex flex-col gap-4"></div>
      </div>
    </div>
  );
};

export default BlogsModal;
