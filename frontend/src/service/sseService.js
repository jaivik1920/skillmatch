import { setStatus } from "../store/slice/jobSlice";
import { addNotification } from "../store/slice/notificationSlice";

const connectToSSE = (userId,dispatch)=>{

        const sseURL = `http://localhost:8080/notification-service/subscribe/${userId}`;

        const eventSource = new EventSource(sseURL);

        eventSource.addEventListener("new-job-posted", event =>{
            console.log(event.data);
            dispatch(setStatus("idle"));
        })

        eventSource.addEventListener("job-posted", event =>{
            const notification = JSON.parse(event.data);
            notification.type = "JOB_POSTED";
            dispatch(addNotification(notification));
            dispatch(setStatus("idle"));
        });

        eventSource.addEventListener("job-applied", event =>{
            console.log("data receieved");
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