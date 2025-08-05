package com.jobapplication.job_service.controller;

import com.jobapplication.job_service.dto.JobEventDTO;
import com.jobapplication.job_service.model.Job;
import com.jobapplication.job_service.model.JobType;
import com.jobapplication.job_service.service.JobEventProducer;
import com.jobapplication.job_service.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;
    private final JobEventProducer jobEventProducer;

    @GetMapping("/getAllJobs")
    public ResponseEntity<?> getAllJobs() {
        try {
            List<Job> jobs = jobService.getAllJobs();
            if (jobs.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Jobs found");
            }
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getJobById/{id}")
    public ResponseEntity<?> getJobById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(jobService.getJobById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getJobsByTitle/{title}")
    public ResponseEntity<?> getJobsByTitle(@PathVariable String title) {
        try {
            List<Job> jobs = jobService.getAllJobsByTitle(title);
            if (jobs.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No jobs found with title: " + title);
            }
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getJobsByCompany/{company}")
    public ResponseEntity<?> getJobsByCompany(@PathVariable String company) {
        try {
            List<Job> jobs = jobService.getAllJobsByCompany(company);
            if (jobs.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No jobs found for company: " + company);
            }
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getJobsByLocation/{location}")
    public ResponseEntity<?> getJobsByLocation(@PathVariable String location) {
        try {
            List<Job> jobs = jobService.getAllJobsByLocation(location);
            if (jobs.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No jobs found in location: " + location);
            }
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getJobsByJobType/{jobType}")
    public ResponseEntity<?> getJobsByJobType(@PathVariable String jobType) {
        try {
            JobType jobTypeEnum = JobType.valueOf(jobType.toUpperCase());

            List<Job> jobs = jobService.getAllJobsByJobType(jobTypeEnum);
            if (jobs.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No jobs found for job type: " + jobType);
            }
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/addJob")
    public ResponseEntity<?> addJob(@RequestBody Job job) {
        try {
             Job dbSaveJob = jobService.addJob(job);
            JobEventDTO jobEventDTO = JobEventDTO.builder()
                    .eventType("JOB_POSTED")
                    .jobId(dbSaveJob.getId())
                    .jobTitle(dbSaveJob.getTitle())
                    .company(dbSaveJob.getCompany())
                    .build();
            jobEventProducer.sendJobEvent(jobEventDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body("Job added successfully with ID: " + job.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/updateJob")
    public ResponseEntity<?> updateJob(@RequestBody Job job) {
        try {
            jobService.updateJob(job);
            return ResponseEntity.ok("Job updated successfully with ID: " + job.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteJob/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable int id) {
        try {
            jobService.deleteJob(id);
            return ResponseEntity.ok("Job deleted successfully with ID: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }
}
