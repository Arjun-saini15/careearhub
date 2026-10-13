package com.careerhub.backend.service;

import com.careerhub.backend.entity.Job;
import com.careerhub.backend.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    // Create / Save Job
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    // Get all Jobs
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // Get Job by ID
    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    // Delete Job
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }

    // Search jobs by keyword
    public List<Job> searchJobs(String keyword) {
        return jobRepository
                .findByTitleContainingIgnoreCaseOrCompanyContainingIgnoreCaseOrLocationContainingIgnoreCase(
                        keyword,
                        keyword,
                        keyword);
    }

    // Update Job
    public Job updateJob(Long id, Job updatedJob) {

        Optional<Job> existingJob = jobRepository.findById(id);

        if (existingJob.isPresent()) {

            Job job = existingJob.get();

            // Update job details
            job.setTitle(updatedJob.getTitle());
            job.setCompany(updatedJob.getCompany());
            job.setLocation(updatedJob.getLocation());
            job.setSalary(updatedJob.getSalary());
            job.setDescription(updatedJob.getDescription());
            job.setJobType(updatedJob.getJobType());
            job.setSkills(updatedJob.getSkills());
            job.setPostedDate(updatedJob.getPostedDate());
            job.setCategoryId(updatedJob.getCategoryId());
            return jobRepository.save(job);
        }

        return null;
    }

    public List<Job> getJobsByEmployerId(Long employerId) {
        return jobRepository.findByEmployerId(employerId);
    }
}