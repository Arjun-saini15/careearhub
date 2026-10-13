package com.careerhub.backend.controller;

import com.careerhub.backend.entity.EmployerProfile;
import com.careerhub.backend.service.EmployerProfileService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/employer-profiles")
public class EmployerProfileController {

    private final EmployerProfileService employerProfileService;

    public EmployerProfileController(
            EmployerProfileService employerProfileService) {

        this.employerProfileService = employerProfileService;
    }

    @PostMapping
    public EmployerProfile createProfile(
           @Valid  @RequestBody EmployerProfile profile) {

        return employerProfileService.createProfile(profile);
    }

    @GetMapping
    public List<EmployerProfile> getAllProfiles() {
        return employerProfileService.getAllProfiles();
    }

    @GetMapping("/user/{userId}")
    public EmployerProfile getProfileByUserId(
            @PathVariable Long userId) {

        return employerProfileService.getProfileByUserId(userId);
    }

    @GetMapping("/company/{companyId}")
    public EmployerProfile getProfileByCompanyId(
            @PathVariable Long companyId) {

        return employerProfileService.getProfileByCompanyId(companyId);
    }

    @PutMapping("/user/{userId}")
    public EmployerProfile updateProfile(
            @PathVariable Long userId,
            @RequestBody EmployerProfile profile) {

        return employerProfileService.updateProfile(userId, profile);
    }

    @DeleteMapping("/{id}")
    public String deleteProfile(@PathVariable Long id) {

        employerProfileService.deleteProfile(id);

        return "Employer profile deleted successfully";
    }
}