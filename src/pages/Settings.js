import { useContext } from 'react';
import {BsArrowLeft} from 'react-icons/bs';
import { Link } from "react-router-dom"
import { SettingItem } from '../components/SettingItem';
import {SettingsContext} from '../context/SettingsContext';

export const Settings = ({volume,setVolume}) => {
    const {settings, updateSettings} = useContext(SettingsContext);
    return (
        <>
            <Link to="/"><BsArrowLeft/></Link>
            <h2>settings</h2> 
            <div className='container'>
                <SettingItem label="Volume">
                    <input 
                        type="range" 
                        min = {0.0}
                        max = {1.0}
                        step = {0.1}
                        value={settings.volume}
                        onChange={(e)=> updateSettings({ volume: parseFloat(e.target.value) })}
                    />
                    <span>{settings.volume}</span>
                </SettingItem>
                <SettingItem label="Sound Type">
                    <select defaultValue={"voice"} disabled={true}>
                        <option value="voice">voice</option>
                        <option value="beep">beep</option>
                    </select>
                </SettingItem>
                <SettingItem label="Main Duration">
                    {settings.mainDuration}
                </SettingItem>
                <SettingItem label="Penalty Duration">
                    {settings.penaltyDuration}
                </SettingItem>
            </div>           
        </>
    )
}