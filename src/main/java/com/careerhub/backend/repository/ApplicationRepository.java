package com.careerhub.backend.repository;

import java.util.List;
import com.careerhub.backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByJobId(Long jobId);

    @Query("SELECT a FROM Application a JOIN Job j ON a.jobId = j.id WHERE j.employerId = :employerId")
    List<Application> findByEmployerId(@Param("employerId") Long employerId);
}