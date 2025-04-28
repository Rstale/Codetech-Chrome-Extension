import React, { useState, useEffect } from 'react';

function GoalSetter() {
  const [goal, setGoal] = useState('');
  const [savedGoals, setSavedGoals] = useState([]);

  useEffect(() => {
    chrome.storage.local.get(['goals'], (result) => {
      setSavedGoals(result.goals || []);
    });
  }, []);

  const handleAddGoal = () => {
    if (goal.trim()) {
      const updatedGoals = [...savedGoals, { text: goal, completed: false }];
      setSavedGoals(updatedGoals);
      chrome.storage.local.set({ goals: updatedGoals });
      setGoal('');
    }
  };

  const toggleGoal = (index) => {
    const updatedGoals = [...savedGoals];
    updatedGoals[index].completed = !updatedGoals[index].completed;
    setSavedGoals(updatedGoals);
    chrome.storage.local.set({ goals: updatedGoals });
  };

  return (
    <div className="goal-setter">
      <h2>Daily Goals</h2>
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter a goal"
      />
      <button onClick={handleAddGoal}>Add Goal</button>
      <ul>
        {savedGoals.map((g, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={g.completed}
              onChange={() => toggleGoal(index)}
            />
            <span style={{ textDecoration: g.completed ? 'line-through' : 'none' }}>
              {g.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoalSetter;