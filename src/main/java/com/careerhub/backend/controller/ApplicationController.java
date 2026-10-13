package com.careerhub.backend.controller;

import jakarta.validation.Valid;
import java.util.List;
import com.careerhub.backend.entity.Application;
import com.careerhub.backend.service.ApplicationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // Apply for a job
    @PostMapping
    public Application applyForJob(@Valid @RequestBody Application application) {
        return applicationService.applyForJob(application);
    }

    // Get all applications
    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    // Get application by ID
    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable Long id) {
        return applicationService.getApplicationById(id).orElse(null);
    }

    // Update application status
    @PutMapping("/{id}/status")
    public Application updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return applicationService.updateStatus(id, status);
    }

    // Get applications by Employer ID
    @GetMapping("/employer/{employerId}")
    public List<Application> getApplicationsByEmployerId(@PathVariable Long employerId) {
        return applicationService.getApplicationsByEmployerId(employerId);
    }

    // Delete application
    @DeleteMapping("/{id}")
    public String deleteApplication(@PathVariable Long id) {

        applicationService.deleteApplication(id);

        return "Application deleted successfully";
    }

    // Get applications by Job ID
    @GetMapping("/job/{jobId}")
    public List<Application> getApplicationsByJobId(@PathVariable Long jobId) {
        return applicationService.getApplicationsByJobId(jobId);
    }
}