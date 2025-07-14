import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import NotFound from "./Pages/NotFound";

const AppContent: React.FC = () => {

    return (
        <Routes>
            <Route index path="/" element={<Home/>}/>

            <Route path="/home" element={<Home/>}/>

            <Route path="/about" element={<About/>}/>

            <Route path="*" element={<NotFound/>}/>

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