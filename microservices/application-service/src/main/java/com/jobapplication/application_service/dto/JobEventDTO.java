package com.jobapplication.application_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobEventDTO {
    private String eventType;
    private int jobId;
    private String jobTitle;
    private String company;
}
