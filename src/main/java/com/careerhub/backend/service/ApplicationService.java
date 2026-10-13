package com.careerhub.backend.service;

import java.util.Optional;
import java.util.List;
import com.careerhub.backend.entity.Application;
import com.careerhub.backend.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    // Apply for a job
    public Application applyForJob(Application application) {
        return applicationRepository.save(application);
    }

    // Get all applications
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    // Get application by ID
    public Optional<Application> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }
    // Update application status

    public Application updateStatus(Long id, String status) {

        Optional<Application> application = applicationRepository.findById(id);

        if (application.isPresent()) {

            Application app = application.get();

            app.setStatus(status);

            return applicationRepository.save(app);
        }

        return null;
    }

    // Delete application
    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }

    // Get applications for a job
    public List<Application> getApplicationsByJobId(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }
    public List<Application> getApplicationsByEmployerId(Long employerId) {
    return applicationRepository.findByEmployerId(employerId);
}
}