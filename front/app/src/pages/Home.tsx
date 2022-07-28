import { Navbar } from '../components/Navbar'
import { Main } from '../components/Main'

import '../styles/pages/Home.css'

export function Home () {
    return (
        <div className="home-container">
            <Navbar />
            <Main />
        </div>
    );
}