const playSound = ({ freq, sec, type }) => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    oscillator.type = type; // 波形の種類
    oscillator.frequency.setValueAtTime(freq, context.currentTime); // 周波数を設定
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + sec); // 0.5秒後に停止
  };
  
  export default playSound;