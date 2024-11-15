import Timer from "../components/Timer";
import useTimer from "../hooks/useTimer";
import { useEffect, useContext } from "react";
import { BsGear} from "react-icons/bs";
import { Link } from "react-router-dom";
import { SettingsContext } from "../context/SettingsContext";
import {getSounds} from "../configs/sounds";

export const Home = () => {
    const {settings} = useContext(SettingsContext);
    const {mainSounds, penaltySounds} = getSounds(settings.volume);
  
    const mainTimer = useTimer({
      initialTime: settings.mainDuration,
      prepareTime: 3,
      sounds: mainSounds,
    });
    const penaltyTimer = useTimer({
      initialTime: settings.penaltyDuration,
      prepareTime: 0,
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
              initialTime={settings.mainDuration}
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
              initialTime={settings.penaltyDuration}
            />
          </div>
        </>
    );
  }
  