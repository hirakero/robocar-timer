import Timer from "./components/Timer";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  //試合の長さを定数で設定
  const MAIN_TIME = 60 * 2 + 3;
  const PENALTY_TIME = 10;
  const MAIN_LOW_SOUND = { type: "sine", freq: 440, sec: 0.2 };
  const MAIN_HIGH_SOUND = { type: "sine", freq: 880, sec: 1.0 };
  const PENALTY_LOW_SOUND = { type: "square", freq: 329.6, sec: 0.1 };
  const PENALTY_HIGH_SOUND = { type: "square", freq: 659.3, sec: 0.5 };

  const [mainTime, setMainTime] = useState(MAIN_TIME);
  const [isMainRunning, setIsMainRunning] = useState(false);
  const [penaltyTime, setPenaltyTime] = useState(PENALTY_TIME);
  const [isPenaltyRunning, setIsPenaltyRunning] = useState(false);

  useEffect(() => {
    if (mainTime === 0) {
      setIsMainRunning(false);
      setIsPenaltyRunning(false);
    }
  }, [mainTime]);

  useEffect(() => {
    if (penaltyTime === 0) {
      setPenaltyTime(PENALTY_TIME);
      setIsPenaltyRunning(false);
    }
  }, [penaltyTime]);

  const playSound = ({ freq, sec, type }) => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    oscillator.type = type; // 波形の種類
    oscillator.frequency.setValueAtTime(freq, context.currentTime); // 周波数を設定
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + sec); // 0.5秒後に停止
  };

  useEffect(() => {
    if (isMainRunning) {
      if ([123, 122, 121, 15, 10, 5, 4, 3, 2, 1].includes(mainTime)) {
        playSound(MAIN_LOW_SOUND);
      } else if ([120, 90, 60, 30, 0].includes(mainTime)) {
        playSound(MAIN_HIGH_SOUND);
      }
    }
  }, [mainTime, isMainRunning]);

  useEffect(() => {
    if (isPenaltyRunning) {
      if (penaltyTime === 0) {
        playSound(PENALTY_HIGH_SOUND);
      } else {
        playSound(PENALTY_LOW_SOUND);
      }
    }
  }, [penaltyTime, isPenaltyRunning]);

  const handleMainStartPause = () => {
    setIsMainRunning((prevIsMainRunning) => !prevIsMainRunning);
  };

  const handleMainReset = () => {
    setMainTime(MAIN_TIME);
    setIsMainRunning(false);
  };

  const handlePenaltyStartPause = () => {
    if (isMainRunning) {
      setIsPenaltyRunning((prevIsPenaltyRunning) => !prevIsPenaltyRunning);
    }
  };
  const handlePenaltyReset = () => {
    setPenaltyTime(PENALTY_TIME);
    setIsPenaltyRunning(false);
  };

  //classNameのmain-running, penalty-running, stoppedを設定
  function setClassName() {
    if (isMainRunning) {
      if (isPenaltyRunning) {
        return "penalty-running";
      } else {
        return "main-running";
      }
    } else {
      return "stopped";
    }
  }

  return (
    <div className={`app ${setClassName()}`}>
      <header>
        <h1>Timer App</h1>
      </header>
      <main>
        <Timer
          label="Main"
          time={mainTime}
          setTime={setMainTime}
          isRunning={isMainRunning}
          onStartPause={handleMainStartPause}
          onReset={handleMainReset}
        />

        <Timer
          label="Penalty"
          time={penaltyTime}
          setTime={setPenaltyTime}
          isRunning={isPenaltyRunning}
          onStartPause={handlePenaltyStartPause}
          onReset={handlePenaltyReset}
        />
      </main>
      <footer>---</footer>
    </div>
  );
}

export default App;
