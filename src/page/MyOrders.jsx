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
        fetch(`http://localhost:5000/myorder?email=${user?.email}`)
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

    // Download PDF
    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("My Orders Report", 14, 22);

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
        <div className="max-w-6xl mx-auto p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
                My Orders
            </h1>

            {/* 🔄 Loading Spinner */}
            {loading && (
                <div className="flex justify-center my-16">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
            )}

            {!loading && myOrders.length === 0 && (
                <p className="text-gray-600 text-center sm:text-left">No orders found.</p>
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
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-2 sm:px-4 py-2 border text-sm sm:text-base">Listing Name</th>
                                    <th className="px-2 sm:px-4 py-2 border text-sm sm:text-base">Buyer Name</th>
                                    <th className="px-2 sm:px-4 py-2 border text-sm sm:text-base">Price</th>
                                    <th className="px-2 sm:px-4 py-2 border text-sm sm:text-base">Quantity</th>
                                    <th className="px-2 sm:px-4 py-2 border text-sm sm:text-base">Address</th>
                                    <th className="px-2 sm:px-4 py-2 border text-sm sm:text-base">Date</th>
                                    <th className="px-2 sm:px-4 py-2 border text-sm sm:text-base">Phone</th>
                                </tr>
                            </thead>

                            <tbody>
                                {myOrders.map((order, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="px-2 sm:px-4 py-2 border text-xs sm:text-sm">{order.listingName}</td>
                                        <td className="px-2 sm:px-4 py-2 border text-xs sm:text-sm">{order.buyerName}</td>
                                        <td className="px-2 sm:px-4 py-2 border text-xs sm:text-sm">${order.price}</td>
                                        <td className="px-2 sm:px-4 py-2 border text-xs sm:text-sm">{order.quantity}</td>
                                        <td className="px-2 sm:px-4 py-2 border text-xs sm:text-sm">{order.address}</td>
                                        <td className="px-2 sm:px-4 py-2 border text-xs sm:text-sm">{order.pickupDate}</td>
                                        <td className="px-2 sm:px-4 py-2 border text-xs sm:text-sm">{order.phone}</td>
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
