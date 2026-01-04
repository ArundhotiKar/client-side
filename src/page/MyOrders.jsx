import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        setLoading(true);
        fetch(`https://assignment10-chi.vercel.app/myorder?email=${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setMyOrders(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [user?.email]);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("🛒 My Orders Report", 14, 22);

        const tableColumn = [
            "Listing Name",
            "Buyer Name",
            "Price",
            "Quantity",
            "Address",
            "Date",
            "Phone",
        ];

        const tableRows = myOrders.map(order => [
            order.listingName,
            order.buyerName,
            `$${order.price}`,
            order.quantity,
            order.address,
            order.pickupDate,
            order.phone
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30,
        });

        doc.save("my_orders.pdf");
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 dark:bg-gray-900 dark:text-gray-100">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center sm:text-left">
                🛒 My Orders
            </h1>
            <p className="text-sm sm:text-base mb-6 text-center sm:text-left text-gray-600 dark:text-white">
                Here you can view all your orders and download a PDF report of your purchases.
            </p>

            {loading && (
                <div className="flex justify-center my-16">
                    <div className="w-10 h-10 border-4 border-gray-300 dark:border-gray-700 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
            )}

            {!loading && myOrders.length === 0 && (
                <p className="text-gray-600 dark:text-gray-300 text-center sm:text-left">No orders found.</p>
            )}

            {!loading && myOrders.length > 0 && (
                <>
                    <button
                        onClick={downloadPDF}
                        className="mb-4 w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        📝 Download Report
                    </button>

                    <div className="overflow-x-auto w-full">
                        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg">
                            <thead className="bg-gray-100 dark:bg-gray-900">
                                <tr>
                                    <th className="px-2 sm:px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">
                                        Listing Name
                                    </th>
                                    <th className="px-2 sm:px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">
                                        Buyer Name
                                    </th>
                                    <th className="px-2 sm:px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">
                                        Price
                                    </th>
                                    <th className="px-2 sm:px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">
                                        Quantity
                                    </th>
                                    <th className="px-2 sm:px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">
                                        Address
                                    </th>
                                    <th className="px-2 sm:px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">
                                        Date
                                    </th>
                                    <th className="px-2 sm:px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">
                                        Phone
                                    </th>
                                </tr>
                            </thead>



                            <tbody>
                                {myOrders.map((order, index) => (
                                    <tr
                                        key={index}
                                        className="text-center border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                    >
                                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">{order.listingName}</td>
                                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">{order.buyerName}</td>
                                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">${order.price}</td>
                                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">{order.quantity}</td>
                                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">{order.address}</td>
                                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">{order.pickupDate}</td>
                                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">{order.phone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>

    );
};

export default MyOrders;
