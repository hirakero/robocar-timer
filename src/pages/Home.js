import Timer from "../components/Timer";
import useTimer from "../hooks/useTimer";
import { playSound, talkText } from "../utils/playSound";
import { useEffect, useContext } from "react";
import { BsGear} from "react-icons/bs";
import { Link } from "react-router-dom";
import { SettingsContext } from "../context/SettingsContext";

export const Home = () => {
    const {settings} = useContext(SettingsContext);
    const VOLUME = settings.volume;
    const MAIN_DURATION = settings.mainDuration;
    const MAIN_PREPARE_DURATION = 3;
    const PENALTY_DURATION = settings.penaltyDuration;
    const PENALTY_PREPARE_DURATION = 0;
  
    const MAIN_LOW_BEEP_SOUND = {
      type: "sine",
      freq: 440,
      sec: 0.2,
      vol: VOLUME,
    };
    const MAIN_HIGH_BEEP_SOUND = {
      type: "sine",
      freq: 880,
      sec: 1.0,
      vol: VOLUME,
    };
    const PENALTY_LOW_SOUND = {
      type: "square",
      freq: 329.6,
      sec: 0.1,
      vol: VOLUME,
    };
    const PENALTY_HIGH_SOUND = {
      type: "square",
      freq: 659.3,
      sec: 0.5,
      vol: VOLUME,
    };
  
    const mainSounds = [];
    mainSounds[120] = { play: playSound, data: MAIN_HIGH_BEEP_SOUND };
    mainSounds[0] = { play: playSound, data: MAIN_HIGH_BEEP_SOUND };
  
    const mainTalks = [10, 15, 30, 60, 90];
    mainTalks.forEach((i) => {
      mainSounds[i] = { play: talkText, data: `${i}秒前` };
    });
    
    const mainLowBeeps = [121, 122, 123];
    mainLowBeeps.forEach((i) => {
      mainSounds[i] = { play: playSound, data: MAIN_LOW_BEEP_SOUND };
    });
    const mainSec = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    mainSec.forEach((i) => {
      mainSounds[i] = { play: talkText, data: `${i}` };
    });
  
    const penaltySounds = [];
    const penaltySecs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    penaltySecs.forEach((i) => {
      penaltySounds[i] = { play: playSound, data: PENALTY_LOW_SOUND };
    });
    penaltySounds[0] = { play: playSound, data: PENALTY_HIGH_SOUND };
  
    const mainTimer = useTimer({
      initialTime: MAIN_DURATION,
      prepareTime: MAIN_PREPARE_DURATION,
      sounds: mainSounds,
    });
    const penaltyTimer = useTimer({
      initialTime: PENALTY_DURATION,
      prepareTime: PENALTY_PREPARE_DURATION,
      sounds: penaltySounds,
    });
  
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
        <>
          <div className="row">
            <div className="col-11"></div>
            <Link to="/settings" className="col-1"> < BsGear /></Link>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <Timer
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
        </>
    );
  }
  