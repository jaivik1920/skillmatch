package com.jobapplication.job_service.service;

import com.jobapplication.job_service.dto.JobEventDTO;
import com.netflix.discovery.converters.Auto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobEventProducer {

    private static final String TOPIC = "job-events";

    private final KafkaTemplate<String, JobEventDTO> kafkaTemplate;

    public void sendJobEvent(JobEventDTO event) {
        kafkaTemplate.send(TOPIC, event);
    }

}
