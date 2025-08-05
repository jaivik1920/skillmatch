package com.jobapplication.notification_service.service;

import com.jobapplication.notification_service.dto.JobEventDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobEventConsumer {

         private final AlertService alertService;

        @KafkaListener(topics ="job-events", groupId = "notification-service-group")
        public void consumeJobEvent(JobEventDTO event) {
            try
            {
                System.out.println("Received job event: " + event);
                alertService.processAlerts(event);
            } catch (Exception e) {
                System.out.println("Error processing job event: " + e.getMessage());
            }

        }
}
