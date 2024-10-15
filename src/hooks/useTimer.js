import { useState, useEffect } from 'react';
import playSound from '../utils/playSound';

const useTimer = (initialTime, prepareTime, lowSoundTimings, highSoundTimings, lowSound, highSound) => {
    const [time, setTime] = useState(initialTime + prepareTime);
    const [isRunning, setIsRunning] = useState(false);
  
    // タイマーが0になったらリセット
    useEffect(() => {
      if (time === 0) {
        reset();
      }
    }, [time]);
  
    // タイマーが動いている時に音を鳴らす
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
      setTime(initialTime + prepareTime);
      setIsRunning(false);
    };
  
    return { time, setTime, isRunning, startPause, reset }
  }

  export default useTimer;