import { useEffect } from "react";

function Timer({label, time, setTime, isRunning, onStartPause, onReset, mainFontSize, runningColor, initialTime}) {
    useEffect(() => {
        if (isRunning) {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        
            return () => {
                clearInterval(timer);
            };
        }
    }, [isRunning, setTime]);
    return (
        <div className="card text-center my-3">
            <div className={`card-header ${isRunning ? runningColor :""}`}>         
                <h2 className="">{label}</h2>
            </div>
            <div className="card-body">
                <h3 className={`card-text ${mainFontSize}`}>{ initialTime < time ? initialTime : time} s </h3>
                <button className="btn btn-primary btn-lg mx-2" onClick={onStartPause}>{isRunning ? "Pause" : "Start"}</button>
                <button className="btn btn-secondary mx-2" onClick={onReset}>Reset</button>
            </div>
        </div>
        
    )
}


export default Timer;