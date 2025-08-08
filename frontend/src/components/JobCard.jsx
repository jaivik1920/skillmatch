const JobCard =({job}) =>{
    return <>
        <div className=" w-80 bg-gray-20 shadow-md rounded-md m-4 p-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
            <p className="text-gray-600 mb-1"><span className="font-medium">Company:</span> {job.company}</p>
            <p className="text-gray-600 mb-1"><span className="font-medium">Location:</span> {job.location}</p>
            {job.salary !== 0 && <p className="text-gray-600 mb-1"><span className="font-medium">salary:</span> {job.salary}</p>}
            <p className="text-gray-700 mb-4">{job.description}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Apply Now
            </button>
        </div>
    </>
}

export default JobCard;