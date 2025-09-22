import React from 'react';
import userImg from '../assets/images/user.jpg';
import bgImg from '../assets/images/bg.jpg';

const Blogs = () => {
  return (
    <div className="blogs w-full h-full flex">
      <div className="blogs-left relative w-1/2 h-full bg-[url('/images/bg.jpg')] bg-center bg-no-repeat bg-cover rounded-tl-2xl rounded-bl-2xl">
        <div className="absolute inset-0 bg-linear-to-b from-[rgba(184,142,252,0.3)] to-[rgba(104,119,244,0.2)] rounded-tl-2xl rounded-bl-2xl"></div>
        <img
          src={userImg}
          alt="User Image"
          className="w-60 aspect-square object-cover rounded-[50%] border-[0.3rem] border-[#6877f4] absolute top-1/2 -right-30 -translate-y-1/2"
        />
      </div>
      <div className="blogs-right w-1/2 h-full flex justify-center items-center relative">
        {/* <button className="post-btn w-[clamp(15rem,16cqi,30rem)] aspect-4/1 bg-linear-to-r from-purple-400 to-indigo-500 border-none rounded-[5rem] text-[2.5rem] font-bold tracking-[0.1rem] uppercase text-neutral-50 text-shadow-[0_0.5rem_1rem_rgba(0,0,0,0.2)] cursor-pointer active:translate-y-[0.2rem]">
          Create New Post
        </button> */}
        <div className="blogs-right-form flex flex-col items-center gap-y-20">
          <h1 className="font-comfortaa text-[clamp(2rem,5cqi,6rem)] uppercase bg-linear-to-r from-purple-400 to-indigo-500 special-gradient">
            New Post
          </h1>
          <form className="flex flex-col gap-y-16">
            <div className="img-upload">
              <label
                htmlFor="file-upload"
                className="file-upload flex items-center gap-x-8 text-[2rem] text-neutral-300 cursor-pointer"
              >
                <i className="bx bx-upload text-[4rem] text-purple-400"></i>{' '}
                Upload Image
              </label>
              <input type="file" id="file-upload" className="hidden" />
            </div>
            <input
              type="text"
              placeholder="Add Title (Max 60 characters)"
              className="title-input w-[clamp(15rem,25cqi,45rem)] bg-transparent outline-none border-b-[0.1rem] border-b-purple-400 py-8 px-0 text-neutral-200 text-[1.8rem] placeholder:font-comfortaa placeholder:text-[1.6rem] placeholder:text-purple-400 placeholder:opacity-50 focus:placeholder:text-transparent"
            />
            <textarea
              name=""
              id=""
              placeholder="Add Text"
              className="text-input w-[clamp(15rem,25cqi,45rem)] bg-transparent outline-none border-b-[0.1rem] border-b-purple-400 py-8 px-0 text-neutral-200 text-[1.5rem] placeholder:font-comfortaa placeholder:text-[1.3rem] placeholder:text-purple-400 placeholder:opacity-50 focus:placeholder:text-transparent aspect-5/3 resize-none"
            ></textarea>
            <button
              type="submit"
              className="submit-btn h-20 bg-linear-to-l from-purple-400 to to-indigo-500 outline-none rounded-[5rem] text-[1.8rem] text-neutral-50 uppercase tracking-[0.1rem] text-shadow-[0_0.5rem_1rem_rgba(0,0,0,0.2)] cursor-pointer active:translate-y-[0.2rem]"
            >
              Submit
            </button>
          </form>
        </div>
        <button className="blogs-close-btn absolute top-12 right-10 bg-transparent border-none font-bebas text-[3rem] text-neutral-200 flex items-center cursor-pointer">
          Back <i className="bx bx-chevron-right text-[4rem]"></i>
        </button>
      </div>
    </div>
  );
};

export default Blogs;
