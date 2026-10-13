package com.careerhub.backend.controller;

import com.careerhub.backend.entity.Interview;
import com.careerhub.backend.service.InterviewService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    // Create interview
    @PostMapping
    public Interview createInterview(
            @Valid @RequestBody Interview interview) {

        return interviewService.createInterview(interview);
    }

    // Get all interviews
    @GetMapping
    public List<Interview> getAllInterviews() {
        return interviewService.getAllInterviews();
    }

    // Get interview by ID
    @GetMapping("/{id}")
    public Interview getInterviewById(@PathVariable Long id) {
        return interviewService.getInterviewById(id).orElse(null);
    }

    // Get interviews by employer
    @GetMapping("/employer/{employerId}")
    public List<Interview> getInterviewsByEmployerId(
            @PathVariable Long employerId) {
        return interviewService.getInterviewsByEmployerId(employerId);
    }

    // Get interviews by user
    @GetMapping("/user/{userId}")
    public List<Interview> getInterviewsByUserId(
            @PathVariable Long userId) {
        return interviewService.getInterviewsByUserId(userId);
    }

    // Update interview
    @PutMapping("/{id}")
    public Interview updateInterview(
            @PathVariable Long id,
            @RequestBody Interview interview) {
        return interviewService.updateInterview(id, interview);
    }

    // Delete interview
    @DeleteMapping("/{id}")
    public String deleteInterview(@PathVariable Long id) {
        interviewService.deleteInterview(id);
        return "Interview deleted successfully";
    }
}