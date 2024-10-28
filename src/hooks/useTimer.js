import { useState, useEffect } from "react";

const useTimer = ({ initialTime, prepareTime, sounds }) => {
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
      const sound = sounds[time];
      if (sound) {
        const { play, data } = sound;
        play(data);
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

  return { time, setTime, isRunning, startPause, reset };
};

export default useTimer;
