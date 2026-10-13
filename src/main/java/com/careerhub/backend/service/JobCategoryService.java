package com.careerhub.backend.service;

import com.careerhub.backend.entity.JobCategory;
import com.careerhub.backend.repository.JobCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobCategoryService {

    private final JobCategoryRepository jobCategoryRepository;

    public JobCategoryService(JobCategoryRepository jobCategoryRepository) {
        this.jobCategoryRepository = jobCategoryRepository;
    }

    public JobCategory createCategory(JobCategory category) {
        return jobCategoryRepository.save(category);
    }

    public List<JobCategory> getAllCategories() {
        return jobCategoryRepository.findAll();
    }

    public JobCategory getCategoryById(Long id) {
        return jobCategoryRepository.findById(id).orElse(null);
    }

    public JobCategory getCategoryByName(String name) {
        return jobCategoryRepository.findByNameIgnoreCase(name).orElse(null);
    }

    public JobCategory updateCategory(Long id, JobCategory updatedCategory) {

        JobCategory category =
                jobCategoryRepository.findById(id).orElse(null);

        if (category != null) {
            category.setName(updatedCategory.getName());
            category.setDescription(updatedCategory.getDescription());

            return jobCategoryRepository.save(category);
        }

        return null;
    }

    public void deleteCategory(Long id) {
        jobCategoryRepository.deleteById(id);
    }
}