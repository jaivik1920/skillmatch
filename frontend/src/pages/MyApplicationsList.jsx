import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationsByApplicantIdAPI } from "../store/slice/jobApplicationSlice";

const MyApplicationsList = ()=>{
    
    const statusColors = {
        PENDING: "bg-yellow-100 text-yellow-800",
        ACCEPTED: "bg-green-100 text-green-800",
        REJECTED: "bg-red-100 text-red-800",
        WITHDRAWN: "bg-gray-100 text-gray-800"
    };  

    const dispatch = useDispatch();
    const {applications, applicationListStatus,applicationListError} = useSelector(state => state.jobApplication);
    const {user} = useSelector(state => state.auth);
    useEffect(()=>{
        if(applicationListStatus === "idle")
            dispatch(getApplicationsByApplicantIdAPI(user?.id));
    },[applicationListStatus,dispatch]);

    return <>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applicationListStatus === "loading" && <p>Loading jobs...</p>}
        {applicationListError && <p className="text-red-500">{applicationListError}</p>}
        {applications.map((application) => (
            <div
            key={application.applicationId}
            className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition duration-200"
            >
            <h3 className="text-lg font-bold mb-2">{application.jobTitle}</h3>
            <p className="text-gray-600 mb-1">{application.company}</p>
            <p className={`inline-block px-2 py-1 text-sm rounded ${statusColors[application.status]}`}>
                {application.status}
            </p>
            <p className="text-gray-500 mt-2 text-sm">
                Applied: {new Date(application.appliedAt).toLocaleString()}
            </p>
            </div>
        ))}
        </div>
    </>
}

export default MyApplicationsList;