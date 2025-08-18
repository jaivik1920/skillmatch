import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectToSSE } from "../service/sseService";
import { toast } from "react-toastify";

const NotificationListner = ()=>{

    const dispatch = useDispatch();
    const {notifications} = useSelector(state => state.notification);

    const {user} = useSelector(state => state.auth);

    useEffect(()=>{
        if(!user?.userId) return;
        const eventSource = connectToSSE(user?.userId, dispatch);
        return ()=>{
            eventSource?.close();
        }
    },[user?.userId,dispatch]);

    useEffect(()=>{
        if(notifications.length > 0 && user?.role === "RECRUITER")
        {
            const latestNotification = notifications[notifications.length - 1];
            toast.info(`Someone applied to jobid ${latestNotification.jobId}`);
        }
        else if(notifications.length > 0 && user?.role === "APPLICANT")
        {
            const latestNotification = notifications[notifications.length - 1];
            console.log(`new job posted ${latestNotification.jobTitle}`);
            toast.info(`New Job posted. Job Title : ${latestNotification.jobTitle} at ${latestNotification.company}`);
        }
    },[notifications]);

    return;

}

export default NotificationListner;