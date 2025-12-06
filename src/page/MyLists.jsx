import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyLists = () => {
    const [myList, setMyList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:5000/myadded-lists?email=${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setMyList(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [user?.email]);

    // ⭐ DELETE FUNCTION
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/list/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            setMyList(myList.filter(item => item._id !== id));

                            Swal.fire(
                                'Deleted!',
                                'Your item has been deleted.',
                                'success'
                            );
                        }
                    })
                    .catch((err) => console.error(err));
            }
        });
    };

    return (
        <div className="max-w-5xl mx-auto my-6 px-3 sm:px-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                My Listings
            </h2>

            {/* 🔄 Loading Spinner */}
            {loading && (
                <div className="flex justify-center my-16">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
            )}

            {!loading && (
                <div className="overflow-x-auto">
                    <table className="min-w-full border rounded-lg text-sm sm:text-base">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-2 sm:p-3 border">Photo</th>
                                <th className="p-2 sm:p-3 border">Name</th>
                                <th className="p-2 sm:p-3 border">Category</th>
                                <th className="p-2 sm:p-3 border">Price</th>
                                <th className="p-2 sm:p-3 border">Location</th>
                                <th className="p-2 sm:p-3 border">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {myList.map((item) => (
                                <tr key={item._id} className="text-center">
                                    <td className="p-2 sm:p-3 border">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md mx-auto"
                                        />
                                    </td>

                                    <td className="p-2 sm:p-3 border">{item.name}</td>
                                    <td className="p-2 sm:p-3 border">{item.category}</td>
                                    <td className="p-2 sm:p-3 border">${item.price}</td>
                                    <td className="p-2 sm:p-3 border">{item.location}</td>

                                    <td className="p-2 sm:p-3 border">
                                        <div className="flex flex-col sm:flex-row justify-center gap-2">
                                            <Link
                                                to={`/update-list/${item._id}`}
                                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Update
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {myList.length === 0 && (
                        <p className="text-center text-gray-500 mt-5">
                            No listings added yet.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyLists;
