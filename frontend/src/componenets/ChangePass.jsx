import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updatePass } from "../redux/slices/settingsSlice";
import { Save } from "lucide-react";
import { Eye, EyeOff } from 'lucide-react';

function ChangePass() {
  const dispatch = useDispatch();

const [showOldPass, setShowOldPass] = useState(false);
const [showNewPass, setShowNewPass] = useState(false);
const [showConfPass, setShowConfPass] = useState(false);

  const handlePass = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Changing Password...");
    const oldPass = e.target[0].value;
    const newPass = e.target[1].value;
    const confPass = e.target[2].value;

    if (!oldPass || !newPass || !confPass) {
      toast.error("Fill all the fields!!", {
        id: toastId,
      });
      return;
    }
    dispatch(updatePass({ oldPass, newPass, confPass }))
      .then((res) => {
        if (res.error)
          toast.error("Failed to Change Password!!", {
            id: toastId,
          });
        else
          toast.success("Password Successfuly changed", {
            id: toastId,
          });
      })
      .finally(() => {
        e.target.reset();
      });
  };

  return (
    <form className="space-y-4" onSubmit={handlePass}>
  {/* Old Password */}
  <div>
    <label htmlFor="oldPassword" className="block text-sm text-gray-300 font-medium mb-1">
      Current Password
    </label>
    <div className="relative">
      <input
        type={showOldPass ? "text" : "password"}
        id="oldPassword"
        name="oldPassword"
        placeholder='Enter Current Password'
        className="w-full pr-10 bg-transparent border border-gray-600 rounded-md py-2 px-4 focus:ring-2 focus:ring-gray-400 focus:border-gray-500 outline-none"
      />
      <span
        onClick={() => setShowOldPass(prev => !prev)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
      >
        {showOldPass ? <EyeOff size={18} /> : <Eye size={18} />}
      </span>
    </div>
  </div>

  {/* New Password */}
  <div>
    <label htmlFor="newPassword" className="block text-sm text-gray-300 font-medium mb-1">
      New Password
    </label>
    <div className="relative">
      <input
        type={showNewPass ? "text" : "password"}
        id="newPassword"
        name="newPassword"
        placeholder='Enter New Password'
        className="w-full pr-10 bg-transparent border border-gray-600 rounded-md py-2 px-4 focus:ring-2 focus:ring-gray-400 focus:border-gray-500 outline-none"
      />
      <span
        onClick={() => setShowNewPass(prev => !prev)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
      >
        {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
      </span>
    </div>
  </div>

  {/* Confirm Password */}
  <div>
    <label htmlFor="confirmPassword" className="block text-sm text-gray-300 font-medium mb-1">
      Confirm New Password
    </label>
    <div className="relative">
      <input
        type={showConfPass ? "text" : "password"}
        id="confirmPassword"
        name="confirmPassword"
        placeholder='Confirm New Password'
        className="w-full pr-10 bg-transparent border border-gray-600 rounded-md py-2 px-4 focus:ring-2 focus:ring-gray-400 focus:border-gray-500 outline-none"
      />
      <span
        onClick={() => setShowConfPass(prev => !prev)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
      >
        {showConfPass ? <EyeOff size={18} /> : <Eye size={18} />}
      </span>
    </div>
  </div>

  {/* Submit */}
  <div className="flex justify-end">
    <button
      type="submit"
      className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors cursor-pointer"
    >
      <Save className="mr-2" size={18} />
      Save Changes
    </button>
  </div>
</form>

  );
}

export default ChangePass;
