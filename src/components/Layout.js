import {Outlet} from 'react-router-dom';

export const Layout = ()=>{
    return (
        <div className="container text-center py-4">
            <header>
                <h1>Timer App</h1>
            </header>
            <main className="row">
                <Outlet />
            </main>
            <footer>ver.0.2.2</footer>
        </div>
    )
}