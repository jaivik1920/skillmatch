package com.jobapplication.application_service.repository;

import com.jobapplication.application_service.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {

        List<Application> findByJobId(Integer jobId);
        List<Application> findByApplicantId(Integer applicantId);
}
