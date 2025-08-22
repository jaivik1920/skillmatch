import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsAPI } from "../store/slice/jobSlice";
import JobCard from "../components/JobCard";

const JobList = () =>{

    const dispatch = useDispatch();
    const {status,error,jobs} = useSelector(state => state.job);
    const {user} = useSelector(state => state.auth);
    let jobPostedByRecruiter;
    let isRecruiter = false;
    if(user?.role === "RECRUITER")
    {
        jobPostedByRecruiter = jobs.filter(job => job.recruiterId == user?.userId);
        isRecruiter = true;
    }

    useEffect(()=>{ 

        if(status === "idle")
            dispatch(fetchJobsAPI());
    },[status,dispatch])



    return<>
        <h1 className="text-2xl font-bold mb-4">
        {
            isRecruiter ? "Your Jobs" : "Available Jobs"
        }
       </h1>
        <div className="w-full flex justify-between items-center flex-wrap">
            {status === "loading" && <p>Loading jobs...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {
                status === "Succeeded" && isRecruiter && jobPostedByRecruiter.length > 0 
                ? 
                jobPostedByRecruiter.map( job => <JobCard key={job.id} job ={job} />)
                :
                status === "Succeeded" && !isRecruiter && jobs.length > 0 
                &&
                (jobs.map( job => <JobCard key={job.id} job ={job} />))
                
            }
        </div>
    </>
}

export default JobList;