package com.jobapplication.notification_service.service;

import com.jobapplication.notification_service.dto.ApplicationEventDTO;
import com.jobapplication.notification_service.dto.JobEventDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConsumerService {

         private final AlertService alertService;
         private final SSEService sseService;

        @KafkaListener(topics ="job-events", containerFactory = "jobEventConsumerFactory")
        public void consumeJobEvent(JobEventDTO event) {
            try
            {
                System.out.println("Received job event: " + event);

                String eventType = event.getEventType();

                if(eventType.equals("JOB_POSTED"))
                    alertService.processAlerts(event);

                sseService.publishJobEvents(event);
            } catch (Exception e) {
                System.out.println("Error processing job event: " + e.getMessage());
            }
        }

        @KafkaListener(topics = "application-events", containerFactory = "applyJobEventConsumerFactory")
        public void consumeApplicationEvent(ApplicationEventDTO eventDTO)
        {
            System.out.println("event received" + eventDTO);

            String eventType = eventDTO.getEventType();

            if(eventType.equals("APPLICATION_CREATED")) {
                sseService.sendApplicationEventsToRecruiter(eventDTO.getRecruiterId(), eventDTO);
            }

            sseService.publishApplicationEvents(eventDTO);
        }
}
