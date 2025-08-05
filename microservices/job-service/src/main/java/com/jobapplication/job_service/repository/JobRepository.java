package com.jobapplication.job_service.repository;

import com.jobapplication.job_service.model.Job;
import com.jobapplication.job_service.model.JobType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {
        List<Job> findByTitle(String title);
        List<Job> findByCompany(String company);
        List<Job> findByLocation(String location);
        List<Job> findByJobType(JobType jobType);
}
