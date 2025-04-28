import React, { useState, useEffect } from 'react';
import GoalSetter from './GoalSetter';
import TimeTracker from './Tracker';
import TrendsChart from './TrendsChart';
import './index.css'; 

function App() {
  const [timeData, setTimeData] = useState({});

  useEffect(() => {
    chrome.storage.local.get(['timeData'], (result) => {
      setTimeData(result.timeData || {});
    });

    const listener = (changes) => {
      if (changes.timeData) {
        setTimeData(changes.timeData.newValue || {});
      }
    };
    chrome.storage.local.onChanged.addListener(listener);
    return () => chrome.storage.local.onChanged.removeListener(listener);
  }, []);

  return (
    <div className="app">
      <h1>Productivity Tracker</h1>
      <GoalSetter />
      <TimeTracker timeData={timeData} />
      <TrendsChart timeData={timeData} />
    </div>
  );
}

export default App;