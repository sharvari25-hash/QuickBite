import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Edit, Trash2 } from "lucide-react"
import { useEffect } from "react"
import Modal from "./Modal"


export default function AdminCreationPanel() {
  const { authToken } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'; 

    if (!authToken) {
        setError("Authentication error: No admin token found.");
        setIsLoading(false);
        return;
    }

    try {
        const adminPayload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            roleType: 'ADMIN'
        };

        const url = `${API_BASE_URL}/api/admin/users/create`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(adminPayload)
        });

        if (!response.ok) {
            let errorText = `Request failed with status: ${response.status}`;
            try {
                const errorData = await response.json();
                errorText = errorData.message || JSON.stringify(errorData);
            } catch (jsonError) {
                errorText = response.statusText;
            }
            throw new Error(errorText);
        }

        const createdUser = await response.json();
        setSuccess(`Admin account for ${createdUser.email} created successfully!`);
        setFormData({ name: "", email: "", password: "" });

    } catch (err) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Create New Administrator</h3>
      <p className="mb-6 text-sm text-gray-600">This form will create a new user with full administrative privileges.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600 bg-red-100 p-3 rounded-md text-sm">{error}</p>}
        {success && <p className="text-green-600 bg-green-100 p-3 rounded-md text-sm">{success}</p>}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="Enter full name" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="Enter email address" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field" placeholder="Enter a strong password" required />
        </div>

        <button type="submit" disabled={isLoading} className="w-full btn-primary py-2.5 disabled:opacity-50">
          {isLoading ? "Creating..." : "Create Admin Account"}
        </button>
      </form>
    </div>
  );
}