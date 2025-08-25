import { setApplicantsByJobStatus } from "../store/slice/applicantSlice";
import { setApplicationListStatus } from "../store/slice/jobApplicationSlice";
import { setJobSliceStatus } from "../store/slice/jobSlice";
import { addNotification } from "../store/slice/notificationSlice";

const connectToSSE = (userId,dispatch)=>{

        const sseURL = `http://localhost:8080/notification-service/subscribe/${userId}`;

        const eventSource = new EventSource(sseURL);

        eventSource.addEventListener("JOB_EVENTS", event =>{
            console.log("JOB EVENTS RECEIVED");
            dispatch(setJobSliceStatus("idle"));
        })

        eventSource.addEventListener("APPLICATION_EVENTS", event =>{
            console.log("APPLICATION EVENTS RECEIEVED");
            dispatch(setApplicationListStatus("idle"));
            // dispatch(setApplicantsByJobStatus("idle")); tbd for show applicants for recruiters.
        })

        eventSource.addEventListener("JOBS_NOTIFICATIONS", event =>{
            const notification = JSON.parse(event.data);
            notification.type = "JOB_POSTED";
            dispatch(addNotification(notification));
            dispatch(setStatus("idle"));
        });

        eventSource.addEventListener("APPLY_JOB_NOTIFICATIONS", event =>{
            const notification = JSON.parse(event.data);
            notification.type = "JOB_APPLIED";
            dispatch(addNotification(notification));
        })

        eventSource.onerror = error =>{
            console.log(error);
        }

        return eventSource;
}

export {connectToSSE};