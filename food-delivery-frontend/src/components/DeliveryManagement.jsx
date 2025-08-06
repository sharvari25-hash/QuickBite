import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Edit, Trash2 } from "lucide-react"
import { useEffect } from "react"
import Modal from "./Modal"

export default function DeliveryManagement() {
    const { authToken } = useAuth();
    const [partners, setPartners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mock API call
        const mockData = [
            { id: 1, name: "Charlie", vehicle: "Motorcycle", zone: "Downtown", rating: 4.8 },
            { id: 2, name: "Diana", vehicle: "Car", zone: "Suburbs", rating: 4.5 },
            { id: 3, name: "Ethan", vehicle: "Bicycle", zone: "Downtown", rating: 4.9 },
        ];
        setPartners(mockData);
        setIsLoading(false);
    }, []);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="table-header">Name</th>
                        <th className="table-header">Vehicle</th>
                        <th className="table-header">Zone</th>
                        <th className="table-header">Rating</th>
                        <th className="table-header">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr><td colSpan="5" className="text-center py-4">Loading...</td></tr>
                    ) : (
                        partners.map(partner => (
                            <tr key={partner.id} className="border-b">
                                <td className="table-cell">{partner.name}</td>
                                <td className="table-cell">{partner.vehicle}</td>
                                <td className="table-cell">{partner.zone}</td>
                                <td className="table-cell">{partner.rating} ⭐</td>
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