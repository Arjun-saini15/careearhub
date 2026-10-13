package com.careerhub.backend.service;

import com.careerhub.backend.entity.Interview;
import com.careerhub.backend.repository.InterviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;

    public InterviewService(InterviewRepository interviewRepository) {
        this.interviewRepository = interviewRepository;
    }

    // Create interview
    public Interview createInterview(Interview interview) {
        return interviewRepository.save(interview);
    }

    // Get all interviews
    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }

    // Get interview by ID
    public Optional<Interview> getInterviewById(Long id) {
        return interviewRepository.findById(id);
    }

    // Get interviews by employer
    public List<Interview> getInterviewsByEmployerId(Long employerId) {
        return interviewRepository.findByEmployerId(employerId);
    }

    // Get interviews by user
    public List<Interview> getInterviewsByUserId(Long userId) {
        return interviewRepository.findByUserId(userId);
    }

    // Update interview
    public Interview updateInterview(Long id, Interview updatedInterview) {

        Optional<Interview> existing = interviewRepository.findById(id);

        if (existing.isPresent()) {

            Interview interview = existing.get();

            interview.setApplicationId(updatedInterview.getApplicationId());
            interview.setEmployerId(updatedInterview.getEmployerId());
            interview.setUserId(updatedInterview.getUserId());
            interview.setInterviewDate(updatedInterview.getInterviewDate());
            interview.setInterviewTime(updatedInterview.getInterviewTime());
            interview.setMode(updatedInterview.getMode());
            interview.setMeetingLink(updatedInterview.getMeetingLink());
            interview.setStatus(updatedInterview.getStatus());

            return interviewRepository.save(interview);
        }

        return null;
    }

    // Delete interview
    public void deleteInterview(Long id) {
        interviewRepository.deleteById(id);
    }
}