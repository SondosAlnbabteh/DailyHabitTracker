import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate  } from "react-router-dom";

function AddHabits() {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  // Fetch categories from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/habits/getcategory")
      .then((response) => {
        setCategory(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Handlers for input changes
  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

 // Handler for form submission
const handleSubmit = (e) => {
  e.preventDefault(); 

  
  axios
    .post("http://localhost:3000/api/habits/insertHebits", {
      name,
      description,
      category: selectedCategory, 
    })
    .then((response) => {
      console.log("Form data successfully submitted:", response.data);
      setCategory([...category, response.data.newCategory]); // Update category list with new data if necessary
      
      setName("");
      setDescription("");
      setSelectedCategory("");
      navigate("/");
        })
    .catch((error) => {
      console.error("Error posting data:", error);
    });

  console.log("Form submitted with:", { name, description, selectedCategory });
};


  return (
  <div className="flex flex-col items-center justify-center mt-20">
    {/* Title Section */}
    <div className="mb-20 text-center">
      <h2 className="text-3xl font-semibold text-gray-800">Add New Habit</h2>
      <p className="mt-2 text-sm text-gray-600">Enter the details below to create a new habit</p>
    </div>
  
    <form className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
      {/* Form Fields */}
      <div className="flex flex-wrap mb-6 -mx-3">
        {/* Name Field */}
        <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
          <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="habit-name">
            Name
          </label>
          <input
            className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:outline-none focus:bg-white"
            id="habit-name"
            placeholder="Enter habit name"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </div>
  
        {/* Description Field */}
        <div className="w-full px-3 md:w-1/2">
          <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="habit-description">
            Description
          </label>
          <input
            className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:outline-none focus:bg-white"
            id="habit-description"
            placeholder="Enter habit description"
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
      </div>
  
      {/* Category Field */}
      <div className="flex flex-wrap mb-6 -mx-3">
        <div className="w-full px-3 md:w-1/3">
          <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="habit-category">
            Category
          </label>
          <div className="relative">
            <select
              className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:outline-none focus:bg-white"
              id="habit-category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Choose category</option>
              {Array.isArray(category) &&
                category.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
  
      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="px-6 py-3 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
  
  
  );
}

export default AddHabits;
