import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Error from './pages/Error';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'         element={<Home />} />
                <Route path='/login'    element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='*'         element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};