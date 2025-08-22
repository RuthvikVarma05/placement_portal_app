import { useParams, useNavigate } from "react-router-dom";

function JobDetails() {
    const {id} = useParams();
    const navigate = useNavigate();

    const jobs = [
        { id: 1, title: "React Developer", company: "ABC Corp", location: "Hyderabad", description: "Work on modern React apps with hooks and context." },
        { id: 2, title: "Node.js Backend Engineer", company: "XYZ Ltd", location: "Remote", description: "Build scalable backend APIs using Express & MongoDB." },
        { id: 3, title: "Data Analyst", company: "DataWorks", location: "Bangalore", description: "Analyze datasets and build dashboards with Python." },
        { id: 4, title: "Full Stack Developer", company: "TechStart", location: "Hyderabad", description: "End-to-end development with MERN stack." },

    ];

    const job = jobs.find((j) => j.id === parseInt(id));

    if (!job) return <p className="p-6">Job not Found</p>

    return (
        <div className="p-6">
            <button onClick={()=> navigate(-1)} className="mb-4 bg-gray-200 px-3 py-1 rounded">
                Back to Jobs
            </button>
            
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-lg">{job.company}-{job.location}</p>
            <p className="mt-4">{job.description}</p>

            <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded">
                Apply Now
            </button>
        </div>
    );

}

export default JobDetails;