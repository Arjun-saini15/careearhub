package com.careerhub.backend.repository;
import java.util.List;
import com.careerhub.backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
    // Search jobs by title, company or location
    List<Job> findByTitleContainingIgnoreCaseOrCompanyContainingIgnoreCaseOrLocationContainingIgnoreCase(
            String title,
            String company,
            String location);
            List<Job> findByEmployerId(Long employerId);
}