package com.careerhub.backend.repository;

import com.careerhub.backend.entity.EmployerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployerProfileRepository
        extends JpaRepository<EmployerProfile, Long> {

    Optional<EmployerProfile> findByUserId(Long userId);

    Optional<EmployerProfile> findByCompanyId(Long companyId);
}