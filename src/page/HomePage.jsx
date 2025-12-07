import React from 'react';
import Navber from '../component/Navber';
import { Outlet } from 'react-router-dom';
import Footer from '../component/Footer';
import TitleUpdater from '../router/TitleUpdater';

const HomePage = () => {
    return (
        <div>
            {/* TitleUpdater uses route handles to set document.title */}
            <TitleUpdater defaultTitle="PawMart" />
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomePage;