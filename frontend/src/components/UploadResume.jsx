import React, { useState } from "react";

const UploadResume = () => {
  const [resume, setResume] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Only allow PDF or DOCX
      if (
        file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setResume(file);
      } else {
        alert("Only PDF or DOCX files are allowed!");
      }
    }
  };

  const handleRemove = () => {
    setResume(null);
  };

  const handleUpload = async () => {
    if (!resume) {
      alert("Please select a resume to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      const res = await fetch(
        "http://localhost:5000/api/resume/upload-resume",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // send user token
          },
        }
      );

      const data = await res.json();
      alert(data.message || "Resume uploaded successfully!");
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Upload failed, please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Upload Your Resume</h2>

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />

      {resume && (
        <div className="mb-4">
          <p className="text-gray-700">Selected File: {resume.name}</p>
          <button
            onClick={handleRemove}
            className="mt-2 px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      )}

      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Upload Resume
      </button>
    </div>
  );
};

export default UploadResume;
