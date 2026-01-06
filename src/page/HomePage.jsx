import React from 'react';
import Navber from '../component/Navber';
import { Outlet } from 'react-router-dom';
import Footer from '../component/Footer';
import TitleUpdater from '../router/TitleUpdater';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
    return (
        <div className="relative">
            {/* TitleUpdater uses route handles to set document.title */}
            <TitleUpdater defaultTitle="PawMart" />

            <Navber />

            <Outlet />

            <Footer />

            {/* ✅ Global Toast Container */}
            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="auto"
                toastClassName={() =>
                    "relative flex p-4 rounded-lg shadow-lg " +
                    "bg-white text-gray-800 " +
                    "dark:bg-gray-800 dark:text-gray-100"
                }
            />
        </div>
    );
};

export default HomePage;
