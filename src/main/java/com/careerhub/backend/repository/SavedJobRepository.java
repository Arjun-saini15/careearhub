package com.careerhub.backend.repository;

import com.careerhub.backend.entity.SavedJob;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {

    List<SavedJob> findByUserId(Long userId);

    List<SavedJob> findByJobId(Long jobId);
}