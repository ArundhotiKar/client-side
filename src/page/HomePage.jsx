import React from 'react';
import Navber from '../component/Navber';
import { Outlet } from 'react-router-dom';
import Footer from '../component/Footer';

const HomePage = () => {
    return (
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomePage;