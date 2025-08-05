package com.jobapplication.application_service.service;

import com.jobapplication.application_service.dto.JobEventDTO;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class JobEventConsumer {

    @KafkaListener(topics = "job-events", groupId = "application-service-group")
    public void consumeJobEvent(JobEventDTO event) {
        try {
            System.out.println("Consumed job event: " + event.toString());
        } catch (Exception e) {
            System.out.println("Error consuming job event: " + e.getMessage());
        }
    }
}
