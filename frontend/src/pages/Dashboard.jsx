import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
    const navigate = useNavigate();
    const {setIsAuthenticated} = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login")
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text 3-xl font-bold text-gray-800">Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600">
                        Logout
                    </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl cursor-pointer"
                    onClick={()=> navigate("/resume")}
                    >
                        <h2 className="text-xl font-semibold mb-2">📄 Resume Builder</h2>
                        <p className="text-gray-600">Create and Manage your resumes easily.</p>
                    </div>

                <div
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl cursor-pointer"
                    onClick={()=> navigate("/jobs")}
                    >
                        <h2 className="text-xl font-semibold mb-2">💼 Job Finder</h2>
                        <p className="text-gray-600">Search jobs and internships using real APIs</p>
                    </div>

                <div
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl cursor-pointer"
                    onClick={()=> navigate("/profile")}
                    >
                        <h2 className="text-xl font-semibold mb-2">👤 My Profile</h2>
                        <p className="text-gray-600">View and edit your personal information.</p>
                    </div>
                    
            </div>
        </div>
    )
}


export default Dashboard;