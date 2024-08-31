import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Checkbox } from "@material-tailwind/react";

function Home() {
    const [habits, setHabits] = useState([]);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [currentHabit, setCurrentHabit] = useState(null);
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category filter
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    useEffect(() => {
        axios.get("http://localhost:3000/api/habits/getcategory")
            .then((response) => {
                setCategory(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3000/api/habits/getHebits")
            .then((response) => {
                setHabits(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    function deleteHabits(id) {
        axios.put(`http://localhost:3000/api/habits/deleteHebits/${id}`)
            .then((response) => {
                console.log("Habit deleted successfully:", response.data);
                setHabits(habits.filter((habit) => habit._id !== id));
            })
            .catch((error) => {
                console.error("Error deleting habit:", error);
            });
    }

    function handleEditClick(habit) {
        setCurrentHabit(habit);
        setIsEditPopupOpen(true);
    }

    function handleUpdateChange(e) {
        setCurrentHabit({ ...currentHabit, [e.target.name]: e.target.value });
    }

    function updateHabits() {
        axios.put(`http://localhost:3000/api/habits/updateHebits/${currentHabit._id}`, currentHabit)
            .then((response) => {
                console.log("Habit updated successfully:", response.data);
                setHabits(habits.map(habit => habit._id === currentHabit._id ? response.data.data : habit));
                setIsEditPopupOpen(false);
            })
            .catch((error) => {
                console.error("Error updating habit:", error);
            });
    }

    function handleCheckboxChange(id) {
        const updatedHabits = habits.map(habit => 
            habit._id === id ? { ...habit, isDone: !habit.isDone } : habit
        );

        setHabits(updatedHabits);

        axios.put(`http://localhost:3000/api/habits/updateHebits/${id}`, { isDone: !habits.find(h => h._id === id).isDone })
            .then(response => {
                console.log("Habit status updated successfully:", response.data);
            })
            .catch(error => {
                console.error("Error updating habit status:", error);
            });
    }

    // Filtered habits based on selected category and search query
    const filteredHabits = habits.filter(habit =>
        (selectedCategory ? habit.category === selectedCategory : true) &&
        (searchQuery ? habit.name.toLowerCase().includes(searchQuery.toLowerCase()) : true)
    );

    return (
        <div>
            <div className="flex items-center justify-between p-8 mt-10">
                <Link to="/AddHabits">
                    <button className="px-6 py-3 text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-400">
                        Add Habits +
                    </button>
                </Link>
                <div className="flex items-center justify-center flex-1 text-center">
                    <div>
                        <h1 className="mb-2 text-2xl font-bold">
                            All the habits you added are displayed here
                        </h1>
                        <h2 className="text-xl text-gray-700">
                            You can perform the search and filter process and mark them as completed
                        </h2>
                    </div>
                </div>
            </div>

            {/* Search Input for Filtering Habits by Name */}
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    className="w-64 p-2 border rounded"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Dropdown for Category Filter */}
            <div className="flex justify-center mb-6">
                <select
                    className="w-64 p-2 border rounded"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {Array.isArray(category) && category.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-wrap justify-center py-20 mx-10 my-20 border-gray-200 rounded-lg shadow gap-9">
                {filteredHabits.map((habit) => (
                    <div
                        key={habit._id}
                        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-72 h-60"
                    >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {habit.name}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {habit.description}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {habit.category}
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            <Checkbox 
                                checked={habit.isDone}
                                onChange={() => handleCheckboxChange(habit._id)}
                            />
                            <span className={habit.isDone ? 'line-through text-gray-500' : ''}>
                                Done
                            </span>
                            <FaEdit onClick={() => handleEditClick(habit)} className="cursor-pointer" />
                            <FaTrashAlt onClick={() => deleteHabits(habit._id)}  className="cursor-pointer"/>
                        </div>
                    </div>
                ))}
            </div>

            {isEditPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-8 bg-white rounded shadow-lg">
                        <h2 className="mb-4 text-2xl font-bold">Edit Habit</h2>
                        <input
                            type="text"
                            name="name"
                            value={currentHabit.name}
                            onChange={handleUpdateChange}
                            className="w-full p-2 mb-2 border rounded"
                        />
                        <input
                            type="text"
                            name="description"
                            value={currentHabit.description}
                            onChange={handleUpdateChange}
                            className="w-full p-2 mb-2 border rounded"
                        />
                        <select
                            className="w-full p-2 mb-2 border rounded"
                            id="grid-state"
                            name="category"
                            value={currentHabit.category}
                            onChange={handleUpdateChange}
                        >
                            <option value="">Choose category</option>
                            {Array.isArray(category) &&
                                category.map((cat) => (
                                    <option key={cat._id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                        </select>
                        <button
                            onClick={updateHabits}
                            className="px-4 py-2 text-white bg-blue-500 rounded cursor-pointer"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => setIsEditPopupOpen(false)}
                            className="px-4 py-2 ml-2 text-white bg-red-500 rounded cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
