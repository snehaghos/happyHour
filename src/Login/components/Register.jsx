import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { useAuthRegister } from '../hooks/mutations';

export default function Register() {
    const navigate = useNavigate();
    const  registerMutation=useAuthRegister();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation:''
    });

    const handleChange = (e) => {
        setFormData
        ({
             ...formData,
             [e.target.name]: e.target.value 
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await registerMutation.mutateAsync(formData);
        } catch (error) {
            console.error('Registration and login failed:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-opacity-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md bg-opacity-30">
                <h2 className="mb-4 text-2xl font-bold text-center text-blue-500">Register and Login</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-blue-500">Username:</label>
                        <input type="text" name="name"  onChange={handleChange} className="w-full px-3 py-2 text-white rounded-md bg-gray-200/30" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-blue-500">Email:</label>
                        <input type="email" name="email" onChange={handleChange} className="w-full px-3 py-2 text-white rounded-md bg-gray-200/30" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-blue-500">Password:</label>
                        <input type="password" name="password"  onChange={handleChange} className="w-full px-3 py-2 text-white rounded-md bg-gray-200/30" />
                    </div>   
                    <div className="mb-4">
                        <label className="block text-blue-500">Password Confirmation</label>
                        <input type="password" name="password_confirmation"  onChange={handleChange} className="w-full px-3 py-2 text-white rounded-md bg-gray-200/30" />
                    </div>
                    <button type="submit" className="w-full px-4 py-2  bg-blue-400 rounded-md hover:bg-slate-600">Register and Login</button>
                </form>
            </div>
        </div>
    );
}
