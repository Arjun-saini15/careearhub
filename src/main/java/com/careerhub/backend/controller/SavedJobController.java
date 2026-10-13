package com.careerhub.backend.controller;

import com.careerhub.backend.entity.SavedJob;
import com.careerhub.backend.service.SavedJobService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/saved-jobs")
public class SavedJobController {

    private final SavedJobService savedJobService;

    public SavedJobController(SavedJobService savedJobService) {
        this.savedJobService = savedJobService;
    }

    @PostMapping
    public SavedJob saveJob(@Valid @RequestBody SavedJob savedJob) {
        return savedJobService.saveJob(savedJob);
    }

    @GetMapping
    public List<SavedJob> getAllSavedJobs() {
        return savedJobService.getAllSavedJobs();
    }

    @GetMapping("/user/{userId}")
    public List<SavedJob> getSavedJobsByUserId(@PathVariable Long userId) {
        return savedJobService.getSavedJobsByUserId(userId);
    }

    @DeleteMapping("/{id}")
    public String deleteSavedJob(@PathVariable Long id) {
        savedJobService.deleteSavedJob(id);
        return "Saved job deleted successfully";
    }
}