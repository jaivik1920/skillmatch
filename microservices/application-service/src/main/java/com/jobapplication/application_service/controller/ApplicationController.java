package com.jobapplication.application_service.controller;

import com.jobapplication.application_service.dto.ApplicationResponseDTO;
import com.jobapplication.application_service.model.Application;
import com.jobapplication.application_service.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/apply")
    public ResponseEntity<?> applyForJob(@RequestBody Application application) {
        try {

            applicationService.createApplication(application);
            return ResponseEntity.ok("Application submitted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/updateApplication")
    public ResponseEntity<?> updateApplication(@RequestBody Application application) {
        try {
            applicationService.updateApplication(application);
            return ResponseEntity.ok("Application with id:" + application.getId() + "updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteApplication/{id}")
    public ResponseEntity<?> deleteApplication(@PathVariable int id) {
        try {
            applicationService.deleteApplication(id);
            return ResponseEntity.ok("Application with id: " + id + " deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getApplicationsByJobId/{jobId}")
    public ResponseEntity<?> getApplicationById(@PathVariable int jobId) {
        try {
            List<Application> applications = applicationService.getAllApplicationsByJobId(jobId);

            if (applications.isEmpty())
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No applications found for job ID: " + jobId);

            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getApplicationsWithDetailsByJobId/{jobId}")
    public ResponseEntity<?> getApplicationsWithDetailsByJobId(@PathVariable int jobId) {
        try {
            List<ApplicationResponseDTO> applications = applicationService.getAllApplicationsWithDetailsByJobId(jobId);

            if (applications.isEmpty())
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No applications found for job ID: " + jobId);

            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getApplicationsByApplicantId/{applicantId}")
    public ResponseEntity<?> getApplicationsByApplicantId(@PathVariable int applicantId) {
        try {
            List<Application> applications = applicationService.getAllApplicationsByApplicantId(applicantId);

            if (applications.isEmpty())
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No applications for applicant ID: " + applicantId);

            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getApplicationsByApplicantIdWithJobDetails/{applicantId}")
    public ResponseEntity<?> getApplicationsByApplicantIdWithJobDetails(@PathVariable int applicantId) {
        try {
            List<ApplicationResponseDTO> applications = applicationService.getAllApplicationsByApplicantIdWithJobdetails(applicantId);

            if (applications.isEmpty())
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No applications for applicant ID: " + applicantId);

            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }
}
