import { loadSettings, saveSettings } from "../utils/strage";
import { createContext, useState, useEffect } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {
    const [settings, setSettings] = useState({
        volume: 1.0,
        mainDuration: 60 * 2,
        mainPrepareDuration: 3,
        penaltyDuration: 10,
        penaltyPrepareDuration: 0,
    })

    useEffect(() => {
        const loadedSettings = loadSettings();
        setSettings((prevSettings) => ({...prevSettings, ...loadedSettings}));
    },[]);

    const updateSettings = (newSettings) => {
        setSettings((prevSettings) => {
            const mergedSettings = {...prevSettings, ...newSettings};
            saveSettings(mergedSettings);
            return mergedSettings;
        });
    };

    return (
        <SettingsContext.Provider value={{settings, updateSettings}}>
            {children}
        </SettingsContext.Provider>
    );
};