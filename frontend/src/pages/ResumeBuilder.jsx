import { useNavigate } from "react-router-dom";

const ResumeBuilder = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/resume/create");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-xl text-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Resume Builder</h1>
            <p className="text-gray-600 mb-6">
                Build a professional resume in minutes. Fill in your details and download your resume instantly.
            </p>
            <button 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={handleStart}
                >
                    Start Building
            </button>
        </div>
    </div>
  )
};

export default ResumeBuilder;
