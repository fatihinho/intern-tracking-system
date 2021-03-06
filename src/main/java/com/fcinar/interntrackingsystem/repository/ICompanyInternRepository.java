package com.fcinar.interntrackingsystem.repository;

import com.fcinar.interntrackingsystem.model.CompanyIntern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ICompanyInternRepository extends JpaRepository<CompanyIntern, UUID> {
    Optional<CompanyIntern> findByCompanyIdAndInternId(UUID companyId, UUID internId);

    List<CompanyIntern> findAllByCompanyId(UUID companyId);

    List<CompanyIntern> findAllByInternId(UUID internId);

    List<CompanyIntern> findAllByCompanyIdAndUnitNameNotNull(UUID companyId);
}
