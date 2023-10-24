import React, { useState } from "react";
import axios from "axios";

const FeedForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    text: "",
    image: null,
    description: "",
  });

  const handleChange = (e) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataForSubmit = new FormData();
      formDataForSubmit.append("username", formData.username);
      formDataForSubmit.append("text", formData.text);
      formDataForSubmit.append("image", formData.image);
      formDataForSubmit.append("description", formData.description);
      await axios.post("/api/feeds", formDataForSubmit); // Replace this with your API endpoint
      
      console.log("Feed submitted successfully");
    } catch (error) {
      console.error("Error submitting feed:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-screen flex flex-col justify-center items-center">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-white mb-8">Submit a Feed</h1>

      <form onSubmit={handleSubmit} className="bg-gradient-to-r from-green-100 to-blue-400 p-8 rounded-md max-w-xl w-full md:w-3/4 lg:w-1/2 xl:w-3/4">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="text" className="block text-sm font-medium text-gray-600">
            Text
          </label>
          <input
            type="text"
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-600">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedForm;
