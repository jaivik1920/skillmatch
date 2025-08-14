package com.jobapplication.application_service.dto;

import java.time.LocalDateTime;


public interface ApplicationResponseDTO {
    String getJobTitle();
    String getCompany();
    int getApplicationId();
    int getJobId();
    String getStatus();
    LocalDateTime getAppliedAt();
}
