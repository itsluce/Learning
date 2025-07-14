import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';

const AppContent: React.FC = () => {

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>

            <Route path="/about" element={<About/>}/>

        </Routes>
    );
};

const Navigation: React.FC = () => {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
};

export default Navigation;