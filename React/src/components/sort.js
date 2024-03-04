import React, { useState } from 'react';

const Sort = ({ data, setData }) => {
  const [sortBy, setSortBy] = useState('');

  const handleSort = (sortType) => {
    console.log(`Sorting by: ${sortType}`); // Debugging: Log the sort type
    if (sortType === 'date') {
      sortByDate();
    } else if (sortType === 'time') {
      sortByTime();
    }
  };

  const sortByDate = () => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at) : null;
      const dateB = b.created_at ? new Date(b.created_at) : null;
      return dateA && dateB ? dateA - dateB : dateA ? -1 : 1;
    });
    setData(sortedData);
    setSortBy('date');
  };

  const sortByTime = () => {
    const sortedData = [...data].sort((a, b) => {
      const [hoursA, minutesA] = getTimeComponents(a.created_time);
      const [hoursB, minutesB] = getTimeComponents(b.created_time);
      return hoursA !== hoursB ? hoursA - hoursB : minutesA - minutesB;
    });
    setData(sortedData);
    setSortBy('time');
  };

  const getTimeComponents = (timeString) => {
    if (!timeString) return [0, 0]; // Default values if timeString is empty or undefined
    const [hours, minutes] = timeString.split(':').map(Number);
    return [hours, minutes];
  };

  // Debugging: Log the current sortBy state
  console.log(`Current sortBy: ${sortBy}`);

  return (
    <div className="sort-container">
      <p className='so1'>Sort by:</p>
      <select className="dropdown" value={sortBy} onChange={(e) => handleSort(e.target.value)}>
        <option value="null">Select</option>
        <option value="date">Date</option>
        <option value="time">Time</option>
      </select>
     
    </div>
  );
};

export default Sort;
