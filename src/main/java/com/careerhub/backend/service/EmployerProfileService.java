package com.careerhub.backend.service;

import com.careerhub.backend.entity.EmployerProfile;
import com.careerhub.backend.repository.EmployerProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployerProfileService {

    private final EmployerProfileRepository employerProfileRepository;

    public EmployerProfileService(
            EmployerProfileRepository employerProfileRepository) {

        this.employerProfileRepository = employerProfileRepository;
    }

    public EmployerProfile createProfile(EmployerProfile profile) {
        return employerProfileRepository.save(profile);
    }

    public List<EmployerProfile> getAllProfiles() {
        return employerProfileRepository.findAll();
    }

    public EmployerProfile getProfileByUserId(Long userId) {
        return employerProfileRepository
                .findByUserId(userId)
                .orElse(null);
    }

    public EmployerProfile getProfileByCompanyId(Long companyId) {
        return employerProfileRepository
                .findByCompanyId(companyId)
                .orElse(null);
    }

    public EmployerProfile updateProfile(
            Long userId,
            EmployerProfile updatedProfile) {

        EmployerProfile profile =
                employerProfileRepository
                        .findByUserId(userId)
                        .orElse(null);

        if (profile != null) {

            profile.setCompanyId(updatedProfile.getCompanyId());
            profile.setName(updatedProfile.getName());
            profile.setEmail(updatedProfile.getEmail());
            profile.setPhone(updatedProfile.getPhone());
            profile.setDesignation(updatedProfile.getDesignation());

            return employerProfileRepository.save(profile);
        }

        return null;
    }

    public void deleteProfile(Long id) {
        employerProfileRepository.deleteById(id);
    }
}