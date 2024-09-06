import {useEffect} from "react";
import Timer from "./components/Timer";
import useTimer from "./hooks/useTimer";

function App() {
  const BEEP_VOLUME = 1.0;
  const MAIN_TIME = 60 * 2 + 3;
  const PENALTY_TIME = 10;
  const MAIN_LOW_SOUND = { type: "sine", freq: 440, sec: 0.2, vol: BEEP_VOLUME };
  const MAIN_HIGH_SOUND = { type: "sine", freq: 880, sec: 1.0, vol: BEEP_VOLUME };
  const MAIN_LOW_SOUND_TIMINGS = [123, 122, 121, 15, 10, 5, 4, 3, 2, 1];
  const MAIN_HIGH_SOUND_TIMINGS = [120, 90, 60, 30, 0];
  const PENALTY_LOW_SOUND = { type: "square", freq: 329.6, sec: 0.1, vol: BEEP_VOLUME };
  const PENALTY_HIGH_SOUND = { type: "square", freq: 659.3, sec: 0.5,vol: BEEP_VOLUME };
  const PENALTY_LOW_SOUND_TIMINGS = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const PENALTY_HIGH_SOUND_TIMINGS = [0];

  const mainTimer = useTimer(
    MAIN_TIME,
    MAIN_LOW_SOUND_TIMINGS,
    MAIN_HIGH_SOUND_TIMINGS,
    MAIN_LOW_SOUND,
    MAIN_HIGH_SOUND
  );
  const penaltyTimer = useTimer(
    PENALTY_TIME,
    PENALTY_LOW_SOUND_TIMINGS,
    PENALTY_HIGH_SOUND_TIMINGS,
    PENALTY_LOW_SOUND,
    PENALTY_HIGH_SOUND
  );

  // メインタイマーが0になったらペナルティタイマーをリセット
  useEffect(() => {
    if (mainTimer.time === 0) {
      penaltyTimer.reset();
    }
  }, [mainTimer.time, penaltyTimer]);

  // メインタイマーが動いている時のみ、ペナルティタイマーを動作させる
  const handlePenaltyStartPause = () => {
    if (mainTimer.isRunning) {
      penaltyTimer.startPause();
    }
  };

  function getBGClassName(isMainRunning, isPenaltyRunning) {
    if (isMainRunning) {
      return isPenaltyRunning ? "penalty-running" : "main-running";
    }
    return "stopped";
  }

  return (
    <div className="container text-center py-4">
      <header className="mb-4">
        <h1>Timer App</h1>
      </header>
      <main>
        <Timer
          label="Main"
          time={mainTimer.time}
          setTime={mainTimer.setTime}
          isRunning={mainTimer.isRunning}
          onStartPause={mainTimer.startPause}
          onReset={mainTimer.reset}
          mainFontSize="fs-1"
          runningColor="bg-primary-subtle"
        />

        <Timer
          label="Penalty"
          time={penaltyTimer.time}
          setTime={penaltyTimer.setTime}
          isRunning={penaltyTimer.isRunning}
          onStartPause={handlePenaltyStartPause}
          onReset={penaltyTimer.reset}
          mainFontSize=""
          runningColor="bg-warning-subtle"

        />
      </main>
      <footer >
        ver.0.2.0
      </footer>
    </div>
  );
}

export default App;
