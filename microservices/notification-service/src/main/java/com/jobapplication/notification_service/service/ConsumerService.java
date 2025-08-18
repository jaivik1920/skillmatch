package com.jobapplication.notification_service.service;

import com.jobapplication.notification_service.dto.ApplyJobEventDTO;
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
                alertService.processAlerts(event);
            } catch (Exception e) {
                System.out.println("Error processing job event: " + e.getMessage());
            }
        }

        @KafkaListener(topics = "apply-job-events", containerFactory = "applyJobEventConsumerFactory")
        public void consumeApplyJobEvent(ApplyJobEventDTO eventDTO)
        {
            System.out.println("event received" + eventDTO);
            sseService.sendApplyJobEventNotifications(9,eventDTO);
        }
}
