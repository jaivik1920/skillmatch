package com.jobapplication.job_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobEventDTO {

    private String eventType;
    private int jobId;
    private String jobTitle;
    private String company;
}
