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
        console.log("update")
        setSettings((prevSettings) => {
            const mergedSettings = {...prevSettings, ...newSettings};
            console.log(mergedSettings)
            saveSettings(mergedSettings);
            return mergedSettings;
        });
    };

    console.log("settings", settings)
    return (
        <SettingsContext.Provider value={{settings, updateSettings}}>
            {children}
        </SettingsContext.Provider>
    );
};