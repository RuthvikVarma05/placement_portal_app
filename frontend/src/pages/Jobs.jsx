import { useEffect, useState } from "react";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/jobs");
        const data = await res.json();
        setJobs(data.data ?? []); // API returns jobs inside "data"
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not fetch jobs. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold animate-pulse">Loading jobs...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Jobs</h2>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="border rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300 bg-white"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {job.title}
              </h3>
              <p className="text-gray-600 mb-1">{job.company_name}</p>
              <p className="text-gray-500 text-sm mb-4">{job.location}</p>
              {job.remote && (
                <span className="text-green-600 font-medium text-sm mb-2 block">
                  🌍 Remote Friendly
                </span>
              )}
              <a
                href={job.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Apply Here
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;
