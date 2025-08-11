package com.jobapplication.application_service.service;

import com.jobapplication.application_service.config.UserContext;
import com.jobapplication.application_service.model.Application;
import com.jobapplication.application_service.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public void createApplication(Application application) {
        application.setApplicantId(Integer.parseInt(Objects.requireNonNull(UserContext.getUserId())));
        application.setAppliedAt(LocalDateTime.now());
        if (applicationRepository.existsById(application.getId())) {
            throw new RuntimeException("Application already exists with ID: " + application.getId());
        }
        else if(applicationRepository.findByJobIdAndApplicantId(application.getJobId(), application.getApplicantId()).isPresent()){
            throw  new RuntimeException(("Already applied to this job"));
        }
        applicationRepository.save(application);
    }

    public void updateApplication(Application application) {
        Application existingApplication = applicationRepository.findById(application.getId())
                .orElseThrow(() -> new RuntimeException("Application not found with ID: " + application.getId()));
        existingApplication.setStatus(application.getStatus());
        existingApplication.setUpdatedAt(LocalDateTime.now());
        applicationRepository.save(existingApplication);
    }

    public void deleteApplication(int id) {
        if (!applicationRepository.existsById(id)) {
            throw new RuntimeException("Application not found with ID: " + id);
        }
        applicationRepository.deleteById(id);
    }

    public List<Application> getAllApplicationsByJobId(int jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    public List<Application> getAllApplicationsByApplicantId(int applicantId) {
        return applicationRepository.findByApplicantId(applicantId);
    }
}
