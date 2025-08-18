package com.jobapplication.application_service.service;

import com.jobapplication.application_service.dto.ApplyJobEventDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApplyJobEventProducer {

    private static final String TOPIC = "apply-job-events";
    private final KafkaTemplate<String, ApplyJobEventDTO> kafkaTemplate;

    public void sendApplyJobEvent(ApplyJobEventDTO eventDTO)
    {
        kafkaTemplate.send(TOPIC, eventDTO);
        System.out.println("Apply-Job-Events send");
    }

}
