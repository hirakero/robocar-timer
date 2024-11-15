import { playSound, talkText } from "../utils/playSound";

export const getSounds = (volume)=>{  
    const MAIN_LOW_BEEP_SOUND = {
      type: "sine",
      freq: 440,
      sec: 0.2,
      vol: volume,
    };
    const MAIN_HIGH_BEEP_SOUND = {
      type: "sine",
      freq: 880,
      sec: 1.0,
      vol: volume,
    };
    const PENALTY_LOW_SOUND = {
      type: "square",
      freq: 329.6,
      sec: 0.1,
      vol: volume,
    };
    const PENALTY_HIGH_SOUND = {
      type: "square",
      freq: 659.3,
      sec: 0.5,
      vol: volume,
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
  
    return {mainSounds, penaltySounds};
}