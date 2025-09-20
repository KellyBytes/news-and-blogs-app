import React from 'react';
import News from './components/News';

const App = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-purple-400 to-indigo-500 grid place-items-center">
      <div className="news-blogs-app w-[95vw] h-[95vmin] bg-zinc-950 shadow-[0_2rem_3rem_rgba(0,0,0,0.5)] rounded-2xl font-light">
        <News />
      </div>
    </div>
  );
};

export default App;
