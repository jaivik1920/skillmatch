package com.jobapplication.application_service.service;

import com.jobapplication.application_service.dto.ApplicationEventDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducer {

    private static final String TOPIC = "application-events";
    private final KafkaTemplate<String, ApplicationEventDTO> kafkaTemplate;

    public void sendApplicationEvents(ApplicationEventDTO eventDTO)
    {
        kafkaTemplate.send(TOPIC, eventDTO);
        System.out.println("Apply-Job-Events send");
    }

}
