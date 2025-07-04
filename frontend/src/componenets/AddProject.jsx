import { Camera } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addProject } from "../redux/slices/TrackerSlice";

function AddProject() {
  const [projectName, setProjectName] = useState("");
  const [githubUrl, setGithubUrl] = useState(""); 
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cover = e.target.coverImage.files[0];
    if (!projectName || !githubUrl || !description || !cover) {
      toast.error("Fill all the reqired fields");
    }
    const toastId = toast.loading("Adding Project...");
    const reader = new FileReader(cover);
    reader.readAsDataURL(cover);
    reader.onload = async () => {
      const base64Image = reader.result;
      const project = {
        coverImage: base64Image,
        projectName: projectName,
        githubUrl,
        description,
        websiteUrl,
      };
      const res = await dispatch(addProject({project}));
      if (res.meta.requestStatus === "fulfilled"){
        toast.success("Project Added", {
          id: toastId,
        });
      }else{
        toast.error("Failed to add Project", {
          id: toastId,
        });
      }
    };
  };

  return (
    <div className="w-full flex flex-col p-8 justify-center h-full">
      <h1 className="text-3xl font-bold text-white">Add Projects</h1>
      <p className="text-gray-300">Add your projects to showcase your work</p>
      <div className="w-full mt-6 p-6 border border-gray-800 backdrop-blur-2xl shadow-2xl rounded-lg ">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">
          Add Project
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">
              Project Name : <span className="text-red-600 text-xl">*</span>
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              placeholder="Enter your project name..."
              className="w-full px-3 py-2 rounded-lg bg-white  text-sm text-gray-900  focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50   dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500  border border-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">
              Repository URL : <span className="text-red-600 text-xl">*</span>
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              required
              placeholder="https://github.com/"
              className="w-full px-3 py-2 rounded-lg bg-white  text-sm text-gray-900  focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50   dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500  border border-gray-700"
            />

          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">
              Project URL:
            </label>
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
               className="w-full px-3 py-2 rounded-lg bg-white  text-sm text-gray-900  focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50   dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500  border border-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">
              Description : <span className="text-red-600 text-xl">*</span>
            </label>
            <textarea
              value={description}
              rows="4"
              required
              placeholder="Write a brief description of your project..."
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white  text-sm text-gray-900  focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50   dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500  border border-gray-700"
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-300 font-bold">
              Cover Image : <span className="text-red-600 text-xl">*</span>
            </label>
            <small className="text-gray-500">
              Only .jpg, .jpeg, .png files are allowed
            </small>
            <label htmlFor="coverImage" className="cursor-pointer">
              <Camera className="text-white bg-gray-700 rounded-md h-10 p-1 m-2 w-16" />
            </label>
            <input
              type="file"
              accept="image/*"
              id="coverImage"
              required
              className="hidden"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProject;
