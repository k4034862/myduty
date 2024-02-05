import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Factories/Acount/Login';
import DrawerScreen from './Drawer';
import Home from '../Factories/Home/Home';
export default function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route element={<DrawerScreen />}>
                    <Route path="/home" element={<Home height="100%" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
