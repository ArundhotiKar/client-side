import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="max-w-7xl mx-auto mt-6 p-4">
            <div className="flex flex-col md:flex-row gap-6">
                <aside className="w-full md:w-72 bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 shadow">
                    <h3 className="text-lg font-semibold mb-4">Dashboard</h3>
                    <nav className="flex flex-col space-y-2">
                        <NavLink
                            to="profile"
                            className={({ isActive }) =>
                                (isActive
                                    ? 'bg-gradient-to-r from-[#f97316] to-[#f59e0b] text-white'
                                    : 'text-gray-700 hover:bg-gray-100') + ' px-3 py-2 rounded-lg'
                            }
                        >
                            My Profile
                        </NavLink>

                        <NavLink
                            to="community"
                            className={({ isActive }) =>
                                (isActive
                                    ? 'bg-gradient-to-r from-[#f97316] to-[#f59e0b] text-white'
                                    : 'text-gray-700 hover:bg-gray-100') + ' px-3 py-2 rounded-lg'
                            }
                        >
                            Community
                        </NavLink>
                        <NavLink
                            to="analytics"
                            className={({ isActive }) =>
                                (isActive
                                    ? 'bg-gradient-to-r from-[#f97316] to-[#f59e0b] text-white'
                                    : 'text-gray-700 hover:bg-gray-100') + ' px-3 py-2 rounded-lg'
                            }
                        >
                            Analytics
                        </NavLink>
                    </nav>
                </aside>

                <main className="flex-1 bg-white/60 dark:bg-transparent rounded-lg p-6 shadow">
                    <div className="mt-6">
                        {/* Nested routes render here */}
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;