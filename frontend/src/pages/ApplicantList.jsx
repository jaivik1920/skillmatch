import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchApplicantsAPI, updateApplicationStatusAPI } from "../store/slice/applicantSlice";

const ApplicantList = ()=>{

    const {jobId} = useParams();
    const dispatch = useDispatch();
    const {status,error,applicantList} = useSelector(state => state.applicant.applicantsByJob[jobId] || { status: "idle", applicantList: [], error: null });
    useEffect(()=>{
            if(status === "idle")
                dispatch(fetchApplicantsAPI(jobId));

    },[jobId,dispatch]);

    const handleStatusChange = (applicationId, status) =>{
            const applicationData = {
                "id" : applicationId,
                "jobId" : jobId,
                "status" : status
            }
            dispatch(updateApplicationStatusAPI(applicationData));
    }
    
    if(status === "loading")
        return <p className="text-blue-500">Loading...</p>

    if(error)
        return <p className="text-red-500"> {error}</p>

    return <>
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Applicants for Job {jobId}</h2>
            <table className="w-full border">
                <thead>
                <tr className="bg-gray-100">
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                    {
                        applicantList.length > 0 && applicantList.map(applicant=>{
                            return(
                            <tr className="text-center" key={applicant.applicationId}>
                                <td className="p-2 border">{applicant.name}</td>
                                <td className="p-2 border">{applicant.userName}</td>
                                <td className="p-2 border">{applicant.status}</td>
                                <td className="p-2 border space-x-2">
                                    <button
                                    className="px-3 py-1 bg-green-500 text-white rounded"
                                    onClick={() => handleStatusChange(applicant.applicationId, "ACCEPTED")}
                                    >
                                    Accept
                                    </button>
                                    <button
                                    className="px-3 py-1 bg-red-500 text-white rounded"
                                    onClick={() => handleStatusChange(applicant.applicationId, "REJECTED")}
                                    >
                                    Reject
                                    </button>
                                </td>
                            </tr>);
                        })
                    }
                </tbody>
            </table>
            </div>
    </>
}

export default ApplicantList;