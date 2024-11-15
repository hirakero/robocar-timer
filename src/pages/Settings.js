import { useState } from 'react';
import {BsArrowLeft} from 'react-icons/bs';

import { Link } from "react-router-dom"
import { SettingItem } from '../components/SettingItem';

export const Settings = () => {
    const [volume, setVolume] = useState(100);
    return (
        <>
            <Link to="/"><BsArrowLeft/></Link>
            <h2>settings</h2>
            <div className='container'>
                <SettingItem label="Volume">
                    <input 
                        type="range" 
                        value={volume}
                        onChange={(e)=> setVolume(parseFloat(e.target.value))}
                    />
                    <span>{volume}</span>
                </SettingItem>
                <SettingItem label="Sound Type">
                    <select defaultValue={"voice"} disabled={true}>
                        <option value="voice">voice</option>
                        <option value="beep">beep</option>
                    </select>
                </SettingItem>
                <SettingItem label="Main Duration">
                    120
                </SettingItem>
                <SettingItem label="Penalty Duration">
                    10
                </SettingItem>
            </div>           
        </>
    )
}