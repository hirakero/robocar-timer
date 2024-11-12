import {BsArrowLeft} from 'react-icons/bs';

import { Link } from "react-router-dom"

export const Settings = () => {
    return (
        <>
            <Link to="/"><BsArrowLeft/></Link>

            <h2>settings</h2>
            <div>setting1</div>
            <div>setting2</div>            
        </>
    )
}