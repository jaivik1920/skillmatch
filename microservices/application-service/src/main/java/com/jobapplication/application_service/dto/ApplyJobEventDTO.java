package com.jobapplication.application_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplyJobEventDTO {

    private int applicationId;
    private int jobId;
    private int applicantId;
    private String jobTitle;
}
