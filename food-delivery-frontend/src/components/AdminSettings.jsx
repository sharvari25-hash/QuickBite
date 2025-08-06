import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { KeyRound, Bell, Palette } from "lucide-react"
import { useEffect } from "react"
import Modal from "../components/Modal"

export default function SystemSettings() {
    const { authToken } = useAuth();
    return (
        <div className="space-y-8">
            {/* Profile Settings */}
            <div>
                <h3 className="text-lg font-semibold flex items-center mb-2"><KeyRound className="mr-2" size={20}/> Account Security</h3>
                <div className="bg-white p-4 rounded-lg border">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Admin Email</label>
                            <input type="email" defaultValue="admin@example.com" className="input-field w-full mt-1" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Change Password</label>
                            <input type="password" placeholder="New Password" className="input-field w-full mt-1" />
                        </div>
                        <button className="btn-primary">Update Security</button>
                    </div>
                </div>
            </div>
            {/* Notification Settings */}
            <div>
                <h3 className="text-lg font-semibold flex items-center mb-2"><Bell className="mr-2" size={20}/> Notifications</h3>
                 <div className="bg-white p-4 rounded-lg border space-y-4">
                    <div className="flex items-center justify-between">
                        <p>Email on new user registration</p>
                        <label className="switch"><input type="checkbox" defaultChecked /><span className="slider round"></span></label>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Email on new restaurant application</p>
                        <label className="switch"><input type="checkbox" defaultChecked /><span className="slider round"></span></label>
                    </div>
                </div>
            </div>
            {/* Appearance Settings */}
            <div>
                <h3 className="text-lg font-semibold flex items-center mb-2"><Palette className="mr-2" size={20}/> Appearance</h3>
                <div className="bg-white p-4 rounded-lg border">
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Theme</label>
                        <select className="input-field w-full mt-1">
                            <option>Light</option>
                            <option>Dark</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
