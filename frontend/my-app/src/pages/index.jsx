import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function Home() {
    const [habits, setHabits] = useState([]);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [currentHabit, setCurrentHabit] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/api/habits/getHebits")
            .then((response) => {
                setHabits(response.data.data); // تحديث الحالة بالبيانات المسترجعة
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    function deleteHabits(id) {
        axios.put(`http://localhost:3000/api/habits/deleteHebits/${id}`)
            .then((response) => {
                console.log("Habit deleted successfully:", response.data);
                // تحديث القائمة بعد الحذف
                setHabits(habits.filter((habit) => habit._id !== id));
            })
            .catch((error) => {
                console.error("Error deleting habit:", error);
            });
    }

    function handleEditClick(habit) {
        setCurrentHabit(habit);
        setIsEditPopupOpen(true); // فتح النافذة المنبثقة
    }

    function handleUpdateChange(e) {
        setCurrentHabit({ ...currentHabit, [e.target.name]: e.target.value });
    }

    function updateHabits() {
        axios.put(`http://localhost:3000/api/habits/updateHebits/${currentHabit._id}`, currentHabit)
            .then((response) => {
                console.log("Habit updated successfully:", response.data);
                // تحديث الحالة مع البيانات المحدثة
                setHabits(habits.map(habit => habit._id === currentHabit._id ? response.data.data : habit));
                setIsEditPopupOpen(false); // إغلاق النافذة المنبثقة
            })
            .catch((error) => {
                console.error("Error updating habit:", error);
            });
    }

    return (
        <div>
            <div className="flex flex-wrap justify-center my-36 mx-10">
                {habits.map((habit) => (
                    <div
                        key={habit._id}
                        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
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
                        <div className="flex gap-3 mt-4">
                            <FaEdit onClick={() => handleEditClick(habit)} />
                            <FaTrashAlt onClick={() => deleteHabits(habit._id)} />
                        </div>
                    </div>
                ))}
            </div>

            {isEditPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Edit Habit</h2>
                        <input
                            type="text"
                            name="name"
                            value={currentHabit.name}
                            onChange={handleUpdateChange}
                            className="mb-2 p-2 border rounded w-full"
                        />
                        <input
                            type="text"
                            name="description"
                            value={currentHabit.description}
                            onChange={handleUpdateChange}
                            className="mb-2 p-2 border rounded w-full"
                        />
                        <input
                            type="text"
                            name="category"
                            value={currentHabit.category}
                            onChange={handleUpdateChange}
                            className="mb-2 p-2 border rounded w-full"
                        />
                        <button
                            onClick={updateHabits}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => setIsEditPopupOpen(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
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
