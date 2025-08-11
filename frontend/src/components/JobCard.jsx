import { useDispatch, useSelector } from "react-redux";
import { applyJobAPI } from "../store/slice/jobApplicationSlice";
import { useState } from "react";

const JobCard =({job}) =>{

    const dispatch = useDispatch();
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState();
    const handleApply = async()=>{
        try {
            await dispatch(applyJobAPI(job.id)).unwrap();
            setStatus("succeeded");
        } catch (error) {
            setStatus("failed");
            setError(error || "Error while submitting application");
        }
    }

    return <>
        <div className=" w-80 bg-gray-20 shadow-md rounded-md m-4 p-6 hover:shadow-lg transition-shadow duration-300">
            {error && 
                <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                    <p>{error}</p>
                </div>
            }
            {
                status === "succeeded" &&
                <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
                    <p>Job applied successfully</p>
                </div>
            }
            <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
            <p className="text-gray-600 mb-1"><span className="font-medium">Company:</span> {job.company}</p>
            <p className="text-gray-600 mb-1"><span className="font-medium">Location:</span> {job.location}</p>
            {job.salary !== 0 && <p className="text-gray-600 mb-1"><span className="font-medium">salary:</span> {job.salary}</p>}
            <p className="text-gray-700 mb-4">{job.description}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
             onClick={handleApply}>
                Apply Now
            </button>
        </div>
    </>
}

export default JobCard;