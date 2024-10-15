import {useEffect} from "react";
import Timer from "./components/Timer";
import useTimer from "./hooks/useTimer";
import "./App.css";

function App() {
  const BEEP_VOLUME = 1.0;
  const MAIN_DURATION = 60 * 2;
  const MAIN_PREPARE_DURATION = 3;
  const PENALTY_DURATION = 10;
  const PENALTY_PREPARE_DURATION = 0;
  const MAIN_LOW_SOUND = { type: "sine", freq: 440, sec: 0.2, vol: BEEP_VOLUME };
  const MAIN_HIGH_SOUND = { type: "sine", freq: 880, sec: 1.0, vol: BEEP_VOLUME };
  const MAIN_LOW_SOUND_TIMINGS = [123, 122, 121, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const MAIN_HIGH_SOUND_TIMINGS = [120, 90, 60, 30, 0];
  const PENALTY_LOW_SOUND = { type: "square", freq: 329.6, sec: 0.1, vol: BEEP_VOLUME };
  const PENALTY_HIGH_SOUND = { type: "square", freq: 659.3, sec: 0.5,vol: BEEP_VOLUME };
  const PENALTY_LOW_SOUND_TIMINGS = [9, 8, 7, 6, 5, 4, 3, 2, 1];
  const PENALTY_HIGH_SOUND_TIMINGS = [0];

  const mainTimer = useTimer(
    MAIN_DURATION,
    MAIN_PREPARE_DURATION,
    MAIN_LOW_SOUND_TIMINGS,
    MAIN_HIGH_SOUND_TIMINGS,
    MAIN_LOW_SOUND,
    MAIN_HIGH_SOUND,
  );
  const penaltyTimer = useTimer(
    PENALTY_DURATION,
    PENALTY_PREPARE_DURATION,
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

  return (
    <div className="container text-center py-4">
      <header className="mb-4">
        <h1>Timer App</h1>
      </header>
      <main className="row">
        <div className="col-12 col-md-6 mb-3">
          <Timer
            // className="col-sd-6"
            label="Main"
            time={mainTimer.time}
            setTime={mainTimer.setTime}
            isRunning={mainTimer.isRunning}
            onStartPause={mainTimer.startPause}
            onReset={mainTimer.reset}
            mainFontSize="fs-0"
            runningColor="bg-primary-subtle"
            initialTime={MAIN_DURATION}
          />
        </div>
        <div className="col-12 col-md-6 mb-3">
          <Timer
            // className="col-sd-6"
            label="Penalty"
            time={penaltyTimer.time}
            setTime={penaltyTimer.setTime}
            isRunning={penaltyTimer.isRunning}
            onStartPause={handlePenaltyStartPause}
            onReset={penaltyTimer.reset}
            mainFontSize="fs-0"
            runningColor="bg-warning-subtle"
            initialTime={PENALTY_DURATION}       
          />
        </div>
      </main>
      <footer >
        ver.0.2.1
      </footer>
    </div>
  );
}

export default App;
