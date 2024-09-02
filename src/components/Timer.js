import { useEffect } from "react";

function Timer({label, time, setTime, isRunning, onStartPause, onReset}) {
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
        <div className={`timer ${label.toLowerCase()}-timer`}> 
            <h2>{label} Timer: {time}s</h2>
            <button onClick={onStartPause}>{isRunning ? "Pause" : "Start"}</button>
            <button onClick={onReset}>Reset</button>
        </div>
    )
}


export default Timer;