package com.careerhub.backend.controller;

import com.careerhub.backend.entity.JobCategory;
import com.careerhub.backend.service.JobCategoryService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class JobCategoryController {

    private final JobCategoryService jobCategoryService;

    public JobCategoryController(JobCategoryService jobCategoryService) {
        this.jobCategoryService = jobCategoryService;
    }

    @PostMapping
    public JobCategory createCategory(
            @Valid @RequestBody JobCategory category) {

        return jobCategoryService.createCategory(category);
    }

    @GetMapping
    public List<JobCategory> getAllCategories() {
        return jobCategoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public JobCategory getCategoryById(@PathVariable Long id) {
        return jobCategoryService.getCategoryById(id);
    }

    @GetMapping("/name/{name}")
    public JobCategory getCategoryByName(@PathVariable String name) {
        return jobCategoryService.getCategoryByName(name);
    }

    @PutMapping("/{id}")
    public JobCategory updateCategory(
            @PathVariable Long id,
            @RequestBody JobCategory category) {

        return jobCategoryService.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public String deleteCategory(@PathVariable Long id) {

        jobCategoryService.deleteCategory(id);

        return "Category deleted successfully";
    }
}