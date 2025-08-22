const JobCard = ({title, company, location, description}) => {
    return (
        <div className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-200">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-gray-700">{company}</p>
            <p className="text-gray-500">{location}</p>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Apply
            </button>
        </div>
    );
};

export default JobCard;