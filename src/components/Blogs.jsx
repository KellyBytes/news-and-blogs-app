import React, { useState, useEffect } from 'react';
import userImg from '../assets/images/user.jpg';
import noImg from '../assets/images/no-img.png';

const Blogs = ({ onBack, onCreateBlog, editPost, isEditing }) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isContentValid, setIsContentValid] = useState(true);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 1 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File size exceeds 1MB');
        return;
      }

      const reader = new FileReader(); // read the contents of files on the user's computer
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file); // convert into a base64 encoded string
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setIsTitleValid(true);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setIsContentValid(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      if (!title) setIsTitleValid(false);
      if (!content) setIsContentValid(false);
      return;
    }

    const newBlog = {
      image: image,
      title,
      content,
    };
    onCreateBlog(newBlog, isEditing);
    setImage(null);
    setTitle('');
    setContent('');
    setShowForm(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      onBack();
    }, 3000);
  };

  useEffect(() => {
    if (isEditing && editPost) {
      setImage(editPost.image);
      setTitle(editPost.title);
      setContent(editPost.content);
      setShowForm(true);
    } else {
      setImage(null);
      setTitle('');
      setContent('');
      setShowForm(false);
    }
  }, [isEditing, editPost]);

  return (
    <div className="blogs w-full h-full flex flex-col lg:flex-row">
      <div className="blogs-left relative w-full lg:w-1/2 h-1/3 lg:h-full lg:bg-[url('/images/bg.jpg')] bg-center bg-no-repeat bg-cover rounded-tl-2xl rounded-bl-2xl">
        <div className="absolute inset-0 lg:bg-linear-to-b from-[rgba(184,142,252,0.3)] to-[rgba(104,119,244,0.2)] rounded-tl-2xl rounded-bl-2xl"></div>
        <img
          src={userImg}
          alt="User Image"
          className="w-40 sm:w-60 aspect-square object-cover rounded-[50%] border-[0.3rem] border-indigo-500 absolute top-[20%] right-auto left-1/2 -translate-x-1/2 lg:top-1/2 lg:-right-30 lg:-translate-y-1/2"
        />
      </div>
      <div className="blogs-right w-full lg:w-1/2 h-full flex justify-center items-center lg:relative">
        {!showForm && !isSubmitted && (
          <button
            className="post-btn w-[clamp(15rem,16cqi,30rem)] aspect-4/1 bg-linear-to-r from-purple-400 to-indigo-500 border-none rounded-[5rem] text-[clamp(1.4rem,1.5cqi,2.5rem)] font-bold tracking-[0.1rem] uppercase text-neutral-50 text-shadow-[0_0.5rem_1rem_rgba(0,0,0,0.2)] cursor-pointer active:translate-y-[0.2rem] mb-60 lg:mb-0"
            onClick={() => setShowForm(true)}
          >
            Create New Post
          </button>
        )}
        {isSubmitted && (
          <p className="submission-message text-[6rem] uppercase text-center bg-linear-to-r from-purple-400 to-indigo-500 special-gradient mb-60 lg:mb-0">
            Post Submitted!
          </p>
        )}
        <div
          className={`blogs-right-form max-h-[calc(100vh-30%)] overflow-y-auto h-full flex flex-col justify-start items-center mb-10 sm:mb-0 lg:justify-center gap-y-4 lg:gap-y-20 ${
            showForm ? 'visible' : 'hidden'
          }`}
        >
          <h1 className="font-comfortaa text-[clamp(2rem,5cqi,6rem)] uppercase bg-linear-to-r from-purple-400 to-indigo-500 special-gradient">
            {isEditing ? 'Edit Post' : 'New Post'}
          </h1>
          <form className="flex flex-col gap-y-16" onSubmit={handleSubmit}>
            <div className="img-upload flex justify-center">
              <label
                htmlFor="file-upload"
                className="file-upload flex items-center gap-x-8 text-[2rem] text-neutral-300 cursor-pointer"
              >
                <i className="bx bx-upload text-[4rem] text-purple-400"></i>{' '}
                Upload Image
              </label>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <input
              type="text"
              placeholder="Add Title (Max 60 characters)"
              className={`title-input w-[30rem] sm:w-[40rem] lg:w-[clamp(15rem,25cqi,45rem)] flex-1 bg-transparent outline-none border-b-[0.1rem] border-b-purple-400 py-8 px-0 text-neutral-200 text-[1.8rem] placeholder:font-comfortaa placeholder:text-[1.6rem] placeholder:text-purple-400 placeholder:opacity-50 focus:placeholder:text-transparent ${
                !isTitleValid
                  ? 'border-b-[0.1rem] border-b-rose-700 placeholder:text-rose-500'
                  : ''
              }`}
              maxLength={60}
              value={title}
              onChange={handleTitleChange}
            />
            <textarea
              name=""
              id=""
              placeholder="Add Text"
              className={`text-input w-[30rem] sm:w-[40rem] lg:w-[clamp(15rem,25cqi,45rem)] bg-transparent outline-none border-b-[0.1rem] border-b-purple-400 py-8 px-0 text-neutral-200 text-[1.5rem] overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] placeholder:font-comfortaa placeholder:text-[1.3rem] placeholder:text-purple-400 placeholder:opacity-50 focus:placeholder:text-transparent flex-1 min-h-[12rem] sm:aspect-5/3 resize-none ${
                !isContentValid
                  ? 'border-b-[0.1rem] border-b-rose-700 placeholder:text-rose-500'
                  : ''
              }`}
              value={content}
              onChange={handleContentChange}
            ></textarea>
            <button
              type="submit"
              className="submit-btn h-20 bg-linear-to-l from-purple-400 to to-indigo-500 outline-none rounded-[5rem] text-[1.8rem] text-neutral-50 uppercase tracking-[0.1rem] text-shadow-[0_0.5rem_1rem_rgba(0,0,0,0.2)] cursor-pointer active:translate-y-[0.2rem]"
            >
              {isEditing ? 'Update Post' : 'Submit Post'}
            </button>
          </form>
        </div>

        <button
          className="blogs-close-btn absolute top-24 right-12 sm:top-36 md:right-20 lg:top-12 lg:right-10 bg-transparent border-none font-bebas text-[3rem] text-neutral-200 flex items-center cursor-pointer"
          onClick={onBack}
        >
          Back <i className="bx bx-chevron-right text-[4rem]"></i>
        </button>
      </div>
    </div>
  );
};

export default Blogs;
