package com.careerhub.backend.controller;

import com.careerhub.backend.entity.Job;
import com.careerhub.backend.service.JobService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*; 
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // Create Job
    @PostMapping
 public Job createJob(@Valid @RequestBody Job job){
        return jobService.createJob(job);
    }

    // Get all Jobs
    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    // Search jobs
    @GetMapping("/search")
    public List<Job> searchJobs(@RequestParam String keyword) {
        return jobService.searchJobs(keyword);
    }

    // Get Job by ID
    @GetMapping("/{id}")
    public Job getJobById(@PathVariable Long id) {
        return jobService.getJobById(id).orElse(null);
    }

    // Update Job
    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id, @RequestBody Job job) {
        return jobService.updateJob(id, job);
    }

    // Delete Job
    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return "Job deleted successfully";
    }
    @GetMapping("/employer/{employerId}")
public List<Job> getJobsByEmployerId(@PathVariable Long employerId) {
    return jobService.getJobsByEmployerId(employerId);
}
}