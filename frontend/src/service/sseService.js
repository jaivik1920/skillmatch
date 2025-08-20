import { setStatus } from "../store/slice/jobSlice";
import { addNotification } from "../store/slice/notificationSlice";

const connectToSSE = (userId,dispatch)=>{

        const sseURL = `http://localhost:8080/notification-service/subscribe/${userId}`;

        const eventSource = new EventSource(sseURL);

        eventSource.addEventListener("new-job-posted", event =>{
            dispatch(setStatus("idle"));
        })

        eventSource.addEventListener("job-posted", event =>{
            const notification = JSON.parse(event.data);
            dispatch(addNotification(notification));
            dispatch(setStatus("idle"));
        });

        eventSource.addEventListener("job-applied", event =>{
            console.log("data receieved");
            const notification = JSON.parse(event.data);
            dispatch(addNotification(notification));
        })

        eventSource.onerror = error =>{
            console.log(error);
        }

        return eventSource;
}

export {connectToSSE};