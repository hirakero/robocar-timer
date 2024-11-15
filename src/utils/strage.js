export const loadSettings = () => {
    const settings = localStorage.getItem("settings");
    return settings ? JSON.parse(settings) : {};
};

export const saveSettings = (settings) => {
    localStorage.setItem("settings", JSON.stringify(settings))
}
