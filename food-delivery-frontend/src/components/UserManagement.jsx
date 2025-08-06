import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Search, Edit, Trash2} from "lucide-react"
import Modal from "../components/Modal"

export default function UserManagement() {
  const { authToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users from your API
  useEffect(() => {
    // Replace with your actual API call
    const fetchUsers = async () => {
      setIsLoading(true);
      // Mock data
      const mockUsers = [
        { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Customer' },
        { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Restaurant Owner' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'Delivery Partner' },
        { id: 4, name: 'Admin User', email: 'admin@example.com', role: 'Administrator' },
      ];
      setUsers(mockUsers);
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      // API call to delete user
      setUsers(users.filter(u => u.id !== user.id));
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input-field pl-10 w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="table-header">Name</th>
              <th className="table-header">Email</th>
              <th className="table-header">Role</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id} className="border-b">
                  <td className="table-cell">{user.name}</td>
                  <td className="table-cell">{user.email}</td>
                  <td className="table-cell">{user.role}</td>
                  <td className="table-cell">
                    <button onClick={() => handleEdit(user)} className="text-blue-500 hover:text-blue-700 p-2"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(user)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit User">
        {selectedUser && (
          <form>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" defaultValue={selectedUser.name} className="input-field w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" defaultValue={selectedUser.email} className="input-field w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select defaultValue={selectedUser.role} className="input-field w-full">
                  <option>Customer</option>
                  <option>Restaurant Owner</option>
                  <option>Delivery Partner</option>
                  <option>Administrator</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}