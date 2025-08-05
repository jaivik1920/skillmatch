package com.jobapplication.job_service.service;

import com.jobapplication.job_service.model.Job;
import com.jobapplication.job_service.model.JobType;
import com.jobapplication.job_service.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public Job addJob(Job job)
    {
        if(jobRepository.findById(job.getId()).isPresent())
            throw new RuntimeException("Job already exists with ID: " + job.getId());
        return jobRepository.save(job);
    }

    public Job getJobById(int id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with ID: " + id));
    }

    public void updateJob(Job job) {
        Job dbSaveJob = jobRepository.findById(job.getId())
                .orElseThrow(() -> new RuntimeException("Job not found with ID: " + job.getId()));

        if(job.getDescription() != null && !job.getDescription().isEmpty())
            dbSaveJob.setDescription(job.getDescription());
        if(job.getTitle() != null && !job.getTitle().isEmpty())
            dbSaveJob.setTitle(job.getTitle());
        if(job.getCompany() != null && !job.getCompany().isEmpty())
            dbSaveJob.setCompany(job.getCompany());
        if(job.getLocation() != null && !job.getLocation().isEmpty())
            dbSaveJob.setLocation(job.getLocation());
        if(job.getJobType() != null)
            dbSaveJob.setJobType(job.getJobType());
        if(job.getJobStatus() != null)
            dbSaveJob.setJobStatus(job.getJobStatus());

        jobRepository.save(dbSaveJob);
    }
    public void deleteJob(int id) {
        if (jobRepository.findById(id).isEmpty())
            throw new RuntimeException("Job not found with ID: " + id);
        jobRepository.deleteById(id);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public List<Job> getAllJobsByTitle(String title) {
        return jobRepository.findByTitle(title);
    }
    public List<Job>   getAllJobsByCompany(String company) {
        return jobRepository.findByCompany(company);
    }

    public List<Job> getAllJobsByLocation(String location) {
        return jobRepository.findByLocation(location);
    }
    public List<Job> getAllJobsByJobType(JobType jobType) {
            return jobRepository.findByJobType(jobType);
    }
}
