import React, { useState } from 'react';
import { User, Lock, Mail, BookOpen, Calendar, CreditCard, Camera, Save } from 'lucide-react';
import noimage from '../../public/noImage.webp';

export default function UserSettings() {
  const [formData, setFormData] = useState({
    email: 'user@example.com',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    role: 'COORDINATOR',
    year: '2',
    libraryId: '2327CSE1290'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-[#070b0f] w-full text-gray-200 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className='mb-8 flex items-center gap-2'>
          <div className='bg-[#0ec1e7] w-2 h-8 rounded-full'></div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Account Settings</h1>
        </div>
        <form className="space-y-8">
          <div className="bg-gray-900 border border-gray-500 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="mr-2" size={20} />
              Profile Picture
            </h2>
            <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gray-700 rounded-full overflow-hidden flex items-center justify-center">
                  <img 
                    src={noimage} 
                    alt="User avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                  type="button" 
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors"
                >
                  <Camera size={16} />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-gray-400">Upload a new profile picture</p>
                <label htmlFor="image" className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 text-center rounded-md transition-colors" >
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="hidden"
                />
                  Choose Image
                </label>
                
                <p className="text-xs text-gray-500">Recommended: .jpep, .png, .webp
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-500 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Mail className="mr-2" size={20} />
              Account Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <Mail className="absolute left-3 top-2.5 text-gray-400" size={16} />
                </div>
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium mb-1">
                  Role
                </label>
                <div className="relative">
                  <select
                    id="role"
                    name="role"
                    placeholder="Select Role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
                  >
                    <option value="USER">User</option>
                    <option value="COORDINATOR">Coordinator</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                  <BookOpen className="absolute left-3 top-2.5 text-gray-400" size={16} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="year" className="block text-sm font-medium mb-1">
                    Year
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="year"
                      name="year"
                      placeholder='Enter Year of College'
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <Calendar className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="libraryId" className="block text-sm font-medium mb-1">
                    Library ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="libraryId"
                      name="libraryId"
                      placeholder='Enter Library ID'
                      value={formData.libraryId}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <CreditCard className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-500 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Lock className="mr-2" size={20} />
              Change Password
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  placeholder='Enter Current Password'
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder='Enter New Password'
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder='Confirm New Password'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
          
          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              <Save className="mr-2" size={18} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
