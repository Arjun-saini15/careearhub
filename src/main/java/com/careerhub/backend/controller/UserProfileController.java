package com.careerhub.backend.controller;
import jakarta.validation.Valid;
import com.careerhub.backend.entity.UserProfile;
import com.careerhub.backend.service.UserProfileService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profiles")
public class UserProfileController {

    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @PostMapping
    public UserProfile createProfile(@Valid @RequestBody UserProfile profile) {
        return userProfileService.createProfile(profile);
    }

    @GetMapping
    public List<UserProfile> getAllProfiles() {
        return userProfileService.getAllProfiles();
    }

    @GetMapping("/user/{userId}")
    public UserProfile getProfileByUserId(@PathVariable Long userId) {
        return userProfileService.getProfileByUserId(userId);
    }

    @PutMapping("/user/{userId}")
    public UserProfile updateProfile(
            @PathVariable Long userId,
            @RequestBody UserProfile profile) {
        return userProfileService.updateProfile(userId, profile);
    }
}