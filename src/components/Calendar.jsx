import React, { useState } from 'react';
// import './Calendar.css';

const Calendar = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  return (
    <div className="calendar w-full min-w-[28rem] h-[calc(55%-2rem)] bg-zinc-900 rounded-2xl p-6 grid place-items-center">
      <div className="navigate-date w-full flex items-center justify-between gap-x-4 pl-4 mb-6">
        <h2 className="month text-[2rem] font-light text-neutral-300">
          {monthsOfYear[currentMonth]},
        </h2>
        <h2 className="year text-[2rem] font-light text-neutral-300">
          {currentYear}
        </h2>
        <div className="buttons flex gap-x-4 ml-auto">
          <div
            className="w-[3.5rem] h-[3.5rem] flex justify-center items-center bg-gray-800 rounded-[50%]"
            onClick={prevMonth}
          >
            <i className="bx bx-chevron-left text-[2rem] text-purple-400 cursor-pointer"></i>
          </div>
          <div
            className="w-[3.5rem] h-[3.5rem] flex justify-center items-center bg-gray-800 rounded-[50%]"
            onClick={nextMonth}
          >
            <i className="bx bx-chevron-right text-[2rem] text-purple-400 cursor-pointer"></i>
          </div>
        </div>
      </div>
      <div className="weekdays w-full flex my-4 mx-0">
        {daysOfWeek.map((day) => (
          <span
            key={day}
            className="w-[calc(100%/7)] text-[1.3rem] font-light uppercase text-gray-500 tracking-[0.1rem] flex justify-center"
          >
            {day}
          </span>
        ))}
      </div>
      <div className="days flex flex-wrap w-full">
        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
          <span
            key={`empty-${index}`}
            className="w-[calc(100%/7)] aspect-square text-[1.3rem] text-neutral-200 flex justify-center items-center cursor-pointer"
          ></span>
        ))}
        {[...Array(daysInMonth).keys()].map((day) => (
          <span
            key={day + 1}
            className={`w-[calc(100%/7)] aspect-square flex justify-center items-center cursor-pointer ${
              day + 1 === currentDate.getDate() &&
              currentMonth === currentDate.getMonth() &&
              currentYear === currentDate.getFullYear()
                ? 'text-[1.8rem] text-neutral-50 bg-linear-to-r from-purple-400 to-indigo-500 rounded-[50%]'
                : 'text-[1.3rem] text-neutral-200'
            }`}
          >
            {day + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
