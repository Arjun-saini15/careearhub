package com.careerhub.backend.service;

import com.careerhub.backend.entity.UserProfile;
import com.careerhub.backend.repository.UserProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;

    public UserProfileService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    public UserProfile createProfile(UserProfile profile) {
        return userProfileRepository.save(profile);
    }

    public List<UserProfile> getAllProfiles() {
        return userProfileRepository.findAll();
    }

    public UserProfile getProfileByUserId(Long userId) {
        return userProfileRepository.findByUserId(userId).orElse(null);
    }

    public UserProfile updateProfile(Long userId, UserProfile updatedProfile) {

        UserProfile profile = userProfileRepository.findByUserId(userId).orElse(null);

        if (profile != null) {
            profile.setPhone(updatedProfile.getPhone());
            profile.setLocation(updatedProfile.getLocation());
            profile.setSkills(updatedProfile.getSkills());
            profile.setEducation(updatedProfile.getEducation());
            profile.setBio(updatedProfile.getBio());

            return userProfileRepository.save(profile);
        }

        return null;
    }
}