import React from 'react';
import Navber from '../component/Navber';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
        </div>
    );
};

export default HomePage;