package com.jobapplication.application_service.dto;

import java.time.LocalDateTime;


public interface ApplicationResponseDTO {
    String getJobTitle();
    String getCompany();
    Integer getApplicationId();
    Integer getJobId();
    String getStatus();
    LocalDateTime getAppliedAt();
    String getName();
    String getUserName();
}
