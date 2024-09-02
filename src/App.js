import Timer from "./components/Timer";
import { useState } from "react";

function App() {
  //試合の長さを定数で設定
  const MAIN_TIME = 60 * 2;
  const PENALTY_TIME = 10;
  
  const [mainTime, setMainTime] = useState(MAIN_TIME);
  const [isMainRunning, setIsMainRunning] = useState(false);
  const [penaltyTime, setPenaltyTime] = useState(PENALTY_TIME);
  const [isPenaltyRunning, setIsPenaltyRunning] = useState(false);

  const handleMainStartPause = () => {
    setIsMainRunning(prevIsMainRunning => !prevIsMainRunning);
  };
  const handleMainReset = () => {
    setMainTime(MAIN_TIME);
    setIsMainRunning(false);
  }

  const handlePenaltyStartPause = () => {
    if (isMainRunning) {
      setIsPenaltyRunning(prevIsPenaltyRunning => !prevIsPenaltyRunning);
    }
    
  };
  const handlePenaltyReset = () => {
    setPenaltyTime(PENALTY_TIME);
    setIsPenaltyRunning(false);
  }

  return (
    <div >
      <header>        
        Timer App
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
      <footer>
        footer
      </footer>
    </div>
  );
}

export default App;
