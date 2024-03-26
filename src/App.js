
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  let formatTime = (secs) => {
    const min = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${min}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  }
  const toggleTime = () => {
    setIsRunning((prevTime) => !prevTime);

  }
  const reset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  }
  useEffect(() => {
    const ac = new AbortController()
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((preElapsedTime) => preElapsedTime + 1);
      }, 1000);
    }
    else {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
      ac.abort();
    }

  }, [isRunning]);
  return (
    <div >
      <h1>Stopwatch</h1>
      <p>Time: {formatTime(elapsedTime)}</p>
      <button onClick={toggleTime}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
