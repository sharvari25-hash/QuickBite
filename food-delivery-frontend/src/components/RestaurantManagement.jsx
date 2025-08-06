import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Edit, Trash2 } from "lucide-react"
import { useEffect } from "react"
import Modal from "./Modal"

export default function RestaurantManagement() {
    const { authToken } = useAuth();
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mock API call
        const mockData = [
            { id: 1, name: "Pizza Palace", owner: "Bob", city: "New York", status: "Approved" },
            { id: 2, name: "Burger Barn", owner: "John Doe", city: "Los Angeles", status: "Pending" },
            { id: 3, name: "Sushi Spot", owner: "Jane Smith", city: "Chicago", status: "Rejected" },
        ];
        setRestaurants(mockData);
        setIsLoading(false);
    }, []);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="table-header">Name</th>
                        <th className="table-header">Owner</th>
                        <th className="table-header">City</th>
                        <th className="table-header">Status</th>
                        <th className="table-header">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr><td colSpan="5" className="text-center py-4">Loading...</td></tr>
                    ) : (
                        restaurants.map(resto => (
                            <tr key={resto.id} className="border-b">
                                <td className="table-cell">{resto.name}</td>
                                <td className="table-cell">{resto.owner}</td>
                                <td className="table-cell">{resto.city}</td>
                                <td className="table-cell">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                        resto.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                        resto.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {resto.status}
                                    </span>
                                </td>
                                <td className="table-cell">
                                    <button className="text-blue-500 hover:text-blue-700 p-2"><Edit size={18} /></button>
                                    <button className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
