package com.jobapplication.application_service.repository;

import com.jobapplication.application_service.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {

        Optional<Application> findByJobIdAndApplicantId(Integer jobId, Integer applicantId);
        List<Application> findByJobId(Integer jobId);
        List<Application> findByApplicantId(Integer applicantId);
}
