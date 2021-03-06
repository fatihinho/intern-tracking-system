package com.fcinar.interntrackingsystem.repository;

import com.fcinar.interntrackingsystem.model.CompanyInternSearch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ICompanyInternSearchRepository extends JpaRepository<CompanyInternSearch, UUID> {
    Optional<CompanyInternSearch> findByCompanyId(UUID companyId);

    @Transactional
    void deleteAllByCompanyId(UUID companyId);
}
