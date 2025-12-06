import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyLists = () => {
    const [myList, setMyList] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:5000/myadded-lists?email=${user?.email}`)
            .then((res) => res.json())
            .then((data) => setMyList(data))
            .catch((err) => console.error(err));
    }, [user?.email]);

    
    // ⭐ DELETE FUNCTION with SweetAlert
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
                            
                            // remove from UI
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
        <div className="max-w-5xl mx-auto my-10">
            <h2 className="text-3xl font-bold text-center mb-6">My Listings</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 border">Photo</th>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Category</th>
                            <th className="p-3 border">Price</th>
                            <th className="p-3 border">Location</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myList?.map((item) => (
                            <tr key={item._id} className="text-center">

                                <td className="p-3 border">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-md mx-auto"
                                    />
                                </td>

                                <td className="p-3 border">{item.name}</td>
                                <td className="p-3 border">{item.category}</td>
                                <td className="p-3 border">${item.price}</td>
                                <td className="p-3 border">{item.location}</td>

                                <td className="p-3 border flex justify-center gap-2">
                                    <Link
                                        to={`/update-list/${item._id}`}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        Update
                                    </Link>

                                    <button 
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
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
        </div>
    );
};

export default MyLists;
