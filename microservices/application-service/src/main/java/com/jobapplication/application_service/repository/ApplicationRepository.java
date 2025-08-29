package com.jobapplication.application_service.repository;

import com.jobapplication.application_service.dto.ApplicationResponseDTO;
import com.jobapplication.application_service.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {

        Optional<Application> findByJobIdAndApplicantId(Integer jobId, Integer applicantId);
        List<Application> findByJobId(Integer jobId);
        List<Application> findByApplicantId(Integer applicantId);

        @Query(value = "SELECT j.title as jobTitle, j.company as company, a.id as applicationId," +
                "j.id as jobId, a.status as status, a.applied_at as appliedAt " +
                "FROM applications a " +
                "JOIN jobs j ON a.job_id = j.id " +
                "WHERE a.applicant_id = :userId", nativeQuery = true)
        List<ApplicationResponseDTO> findByApplicantIdWithJobDetails(@Param("userId") int userId);

        @Query(value = "SELECT j.title, j.recruiter_id FROM jobs j WHERE j.id = :jobId", nativeQuery = true)
        Optional<Object> findJobDetailsById(@Param("jobId") int jobId);

        @Query(value = "SELECT u.name, u.username, a.id as applicationId, a.status FROM " +
                "applications a JOIN users u " +
                "ON a.applicant_id = u.id " +
                "WHERE job_id = :jobId", nativeQuery = true)
        List<ApplicationResponseDTO> findApplicantsDetailsByJob(@Param("jobId") int jobId);
}
