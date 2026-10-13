package com.careerhub.backend.controller;

import com.careerhub.backend.entity.Resume;
import com.careerhub.backend.service.ResumeService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    private final String uploadDir = "uploads/";

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    // Upload actual resume file
    @PostMapping("/upload")
    public Resume uploadResume(
            @RequestParam Long userId,
            @RequestParam("file") MultipartFile file) throws IOException {

        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = file.getOriginalFilename();

        Path filePath = uploadPath.resolve(fileName);

        Files.copy(file.getInputStream(), filePath);

        Resume resume = new Resume();
        resume.setUserId(userId);
        resume.setFileName(fileName);
        resume.setFilePath(filePath.toString());
        resume.setUploadedDate("2026-09-28");

        return resumeService.createResume(resume);
    }

    @GetMapping
    public List<Resume> getAllResumes() {
        return resumeService.getAllResumes();
    }

    @GetMapping("/{id}")
    public Resume getResumeById(@PathVariable Long id) {
        return resumeService.getResumeById(id).orElse(null);
    }

    @GetMapping("/user/{userId}")
    public List<Resume> getResumesByUserId(@PathVariable Long userId) {
        return resumeService.getResumesByUserId(userId);
    }

    @DeleteMapping("/{id}")
    public String deleteResume(@PathVariable Long id) {
        resumeService.deleteResume(id);
        return "Resume deleted successfully";
    }
}