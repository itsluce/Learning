import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";

const Navigation = ()=>{
    return (
        <BrowserRouter>
            <nav style={{
                backgroundColor: '#2563eb',
                padding: '1rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    gap: '2rem'
                }}>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Navigation