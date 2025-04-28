import React from 'react';

function Tracker({ timeData }) {
  return (
    <div className="time-tracker">
      <h2>Time Spent Today</h2>
      <ul>
        {Object.entries(timeData).map(([url, seconds]) => (
          <li key={url}>
            {url}: {Math.round(seconds / 60)} minutes
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tracker;