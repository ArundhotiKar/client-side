import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend
);

const backendUrl = 'http://localhost:5000';

const DashboardAnalytics = () => {
    const [reviews, setReviews] = useState([]);
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);

    /* ================= FETCH ================= */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [rRes, lRes] = await Promise.all([
                    axios.get(`${backendUrl}/community/reviews`),
                    axios.get(`${backendUrl}/addlist`),
                ]);
                setReviews(rRes.data || []);
                setLists(lRes.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    /* ================= METRICS ================= */
    const totalReviews = reviews.length;
    const avgRating = totalReviews
        ? (
            reviews.reduce((s, r) => s + Number(r.rating || 0), 0) / totalReviews
        ).toFixed(2)
        : 0;
    const totalListings = lists.length;

    const metricColors = {
        orange: 'text-orange-500 dark:text-orange-400',
        green: 'text-green-600 dark:text-green-400',
        sky: 'text-sky-600 dark:text-sky-400',
    };

    /* ================= BAR ================= */
    const reviewsByProduct = reviews.reduce((acc, r) => {
        acc[r.petOrProduct] = (acc[r.petOrProduct] || 0) + 1;
        return acc;
    }, {});

    const barLabels = Object.keys(reviewsByProduct).slice(0, 8);

    const barData = {
        labels: barLabels,
        datasets: [
            {
                data: barLabels.map(l => reviewsByProduct[l]),
                backgroundColor: 'rgba(249,115,22,0.85)',
                borderRadius: 6,
            },
        ],
    };

    /* ================= LINE ================= */
    const reviewsByDay = reviews.reduce((acc, r) => {
        const d = new Date(r.createdAt).toISOString().slice(0, 10);
        acc[d] = (acc[d] || 0) + 1;
        return acc;
    }, {});

    const days = Array.from({ length: 14 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (13 - i));
        return d.toISOString().slice(0, 10);
    });

    const lineData = {
        labels: days,
        datasets: [
            {
                data: days.map(d => reviewsByDay[d] || 0),
                borderColor: '#22c55e',
                backgroundColor: 'rgba(34,197,94,0.2)',
                tension: 0.35,
                fill: true,
            },
        ],
    };

    /* ================= PIE ================= */
    const pieData = {
        labels: ['1★', '2★', '3★', '4★', '5★'],
        datasets: [
            {
                data: [1, 2, 3, 4, 5].map(n =>
                    reviews.filter(r => Number(r.rating) === n).length
                ),
                backgroundColor: [
                    '#ef4444',
                    '#f59e0b',
                    '#eab308',
                    '#6366f1',
                    '#22c55e',
                ],
            },
        ],
    };

    /* ================= CHART OPTIONS ================= */
    const commonOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#e5e7eb',
                },
            },
            tooltip: {
                backgroundColor: '#111827',
                titleColor: '#ffffff',
                bodyColor: '#e5e7eb',
            },
        },
        scales: {
            x: {
                ticks: { color: '#9ca3af' },
                grid: { color: 'rgba(255,255,255,0.05)' },
            },
            y: {
                ticks: { color: '#9ca3af' },
                grid: { color: 'rgba(255,255,255,0.05)' },
            },
        },
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Analytics & Reports
            </h2>

            {/* ===== METRICS ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Total Reviews', value: totalReviews, color: 'orange' },
                    { label: 'Average Rating', value: avgRating, color: 'green' },
                    { label: 'Total Listings', value: totalListings, color: 'sky' },
                ].map((m, i) => (
                    <div
                        key={i}
                        className="border border-gray-200 dark:border-gray-700 bg-white/60  dark:bg-gray-900 p-5 rounded-xl shadow dark:shadow-black/40"
                    >
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {m.label}
                        </p>
                        <p className={`text-3xl font-bold ${metricColors[m.color]}`}>
                            {loading ? '—' : m.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* ===== CHARTS ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900 p-4 rounded-xl shadow dark:shadow-black/40">
                    <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                        Top Reviewed
                    </h3>
                    <Bar
                        data={barData}
                        options={{ ...commonOptions, plugins: { legend: { display: false } } }}
                    />
                </div>

                <div className="border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900 p-4 rounded-xl shadow dark:shadow-black/40">
                    <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                        Last 14 Days
                    </h3>
                    <Line
                        data={lineData}
                        options={{ ...commonOptions, plugins: { legend: { display: false } } }}
                    />
                </div>

                <div className="rounded-2xl border 
                border-gray-200 dark:border-gray-800
                bg-white dark:bg-[#0f172a]
                p-5 shadow-md dark:shadow-black/60">

                    <h3 className="text-sm font-semibold tracking-wide 
                 text-gray-700 dark:text-gray-100 mb-4">
                        Rating Distribution
                    </h3>

                    <div className="h-60">
                        <Pie
                            data={pieData}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        labels: {
                                            color: '#7c3aed',   // ⭐ soft blue-gray (perfect for dark)
                                            font: {
                                                size: 12,
                                                weight: '500',
                                            },
                                            padding: 14,
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>



            </div>

            {/* ===== TABLE ===== */}
            <div className="border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900 rounded-xl shadow dark:shadow-black/40">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-100">
                    Recent Reviews
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">
                                    Item
                                </th>
                                <th className="p-3 text-gray-700 dark:text-gray-300">Rating</th>
                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">
                                    Comment
                                </th>
                                <th className="p-3 text-gray-700 dark:text-gray-300">User</th>
                                <th className="p-3 text-gray-700 dark:text-gray-300">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reviews.slice(0, 15).map((r, i) => (
                                <tr
                                    key={i}
                                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                                >
                                    <td className="p-3 text-gray-800 dark:text-gray-200">
                                        {r.petOrProduct}
                                    </td>
                                    <td className="p-3 text-yellow-500 dark:text-yellow-400">
                                        {'⭐'.repeat(Number(r.rating))}
                                    </td>
                                    <td className="p-3 truncate max-w-xs text-gray-600 dark:text-gray-300">
                                        {r.comment}
                                    </td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">
                                        {r.userName || r.userId}
                                    </td>
                                    <td className="p-3 text-xs text-gray-500 dark:text-gray-400">
                                        {new Date(r.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardAnalytics;
