import {BsArrowLeft} from 'react-icons/bs';

import { Link } from "react-router-dom"

export const Settings = () => {
    return (
        <>
            <header className="mb-4">                
                <h2>settings</h2>
                <Link to="/"><BsArrowLeft/>back</Link>
            </header>
            <main className="row">
                <div>setting1</div>
                <div>setting2</div>
            </main>
        </>
    )
}