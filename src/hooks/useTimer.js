import { useState, useEffect } from 'react';
import playSound from '../utils/playSound';

const useTimer = (initialTime, lowSoundTimings, highSoundTimings, lowSound, highSound) => {
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
  
    useEffect(() => {
      if (time === 0) {
        // setIsRunning(false);
        reset();
      }
    }, [time]);
  
    useEffect(() => {
      if (isRunning) {
        if (lowSoundTimings.includes(time)) {
          playSound(lowSound);
        } else if (highSoundTimings.includes(time)) {
          playSound(highSound);
        }
      }
    }, [time, isRunning]);
  
    const startPause = () => {
      setIsRunning((prevIsRunning) => !prevIsRunning);
    };
  
    const reset = () => {
      setTime(initialTime);
      setIsRunning(false);
    };
  
    return { time, setTime, isRunning, startPause, reset }
  }

  export default useTimer;