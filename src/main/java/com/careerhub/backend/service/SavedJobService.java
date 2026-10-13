package com.careerhub.backend.service;

import com.careerhub.backend.entity.SavedJob;
import com.careerhub.backend.repository.SavedJobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavedJobService {

    private final SavedJobRepository savedJobRepository;

    public SavedJobService(SavedJobRepository savedJobRepository) {
        this.savedJobRepository = savedJobRepository;
    }

    public SavedJob saveJob(SavedJob savedJob) {
        return savedJobRepository.save(savedJob);
    }

    public List<SavedJob> getAllSavedJobs() {
        return savedJobRepository.findAll();
    }

    public List<SavedJob> getSavedJobsByUserId(Long userId) {
        return savedJobRepository.findByUserId(userId);
    }

    public void deleteSavedJob(Long id) {
        savedJobRepository.deleteById(id);
    }
}