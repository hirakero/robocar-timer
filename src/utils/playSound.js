let audioContext;

let getAudioContext = () => {
  audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
  return audioContext;
}

const playSound = ({ freq, sec, type, vol = 0.5 }) => {
    const context = getAudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = type; // 波形の種類
    oscillator.frequency.setValueAtTime(freq, context.currentTime); // 周波数を設定
    gain.gain.setValueAtTime(vol, context.currentTime); // 音量を設定

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + sec); // sec秒後に停止
  };
  
  export default playSound;