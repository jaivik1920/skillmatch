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
        if(notifications.length == 0) return;
        const latestNotification = notifications[notifications.length - 1];
        const notificationMessages = {
            JOB_APPLIED: () =>
            `Applicant applied to jobid: job${latestNotification.jobId} Job Title: ${latestNotification.jobTitle}`,
            JOB_POSTED: () =>
            `New Job posted. Job Title: ${latestNotification.jobTitle} at ${latestNotification.company}`,
        };

        const message = notificationMessages[latestNotification.type];
        toast.info(message);

    },[notifications]);

    return;

}

export default NotificationListner;