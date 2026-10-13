package com.careerhub.backend.repository;

import com.careerhub.backend.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewRepository extends JpaRepository<Interview, Long> {

    List<Interview> findByEmployerId(Long employerId);

    List<Interview> findByUserId(Long userId);

    List<Interview> findByApplicationId(Long applicationId);
}