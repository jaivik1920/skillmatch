import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsAPI } from "../store/slice/jobSlice";
import JobCard from "../components/JobCard";

const JobList = () =>{

    const dispatch = useDispatch();
    const {status,error,jobs} = useSelector(state => state.job);

    useEffect(()=>{ 

        if(status === "idle")
            dispatch(fetchJobsAPI());
    },[status,dispatch])



    return<>
        <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>
        <div className="w-full flex justify-between items-center flex-wrap">
            {status === "loading" && <p>Loading jobs...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {status === "Succeeded" && jobs.length > 0 ? (
                jobs.map( job => <JobCard key={job.id} job ={job} />)
            ) : (
                <p>No jobs available at the moment.</p>
            )}
        </div>
    </>
}

export default JobList;