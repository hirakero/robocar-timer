import Timer from "./components/Timer";
import { useEffect, useState } from "react";
import './App.css';

function App() {
  //試合の長さを定数で設定
  const MAIN_TIME = 60 * 2;
  const PENALTY_TIME = 10;
  
  const [mainTime, setMainTime] = useState(MAIN_TIME);
  const [isMainRunning, setIsMainRunning] = useState(false);
  const [penaltyTime, setPenaltyTime] = useState(PENALTY_TIME);
  const [isPenaltyRunning, setIsPenaltyRunning] = useState(false);

  useEffect(() => {
    if (mainTime === 0) {
      setIsMainRunning(false);
      setIsPenaltyRunning(false);
    }
  },[mainTime])

  useEffect(() => {
    if (penaltyTime === 0) {
      setPenaltyTime(PENALTY_TIME);
      setIsPenaltyRunning(false);    
    }
  },[penaltyTime])

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

  //classNameのmain-running, penalty-running, stoppedを設定
  function setClassName(){
    if(isMainRunning){
      if(isPenaltyRunning){
        return 'penalty-running';
      }else{
        return 'main-running';
      }
    }else {
      return 'stopped';
    }
  }

  return (
    <div className={`app ${setClassName()}`}>
      <header> 
        <h1>
        Timer App
        </h1>        
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
