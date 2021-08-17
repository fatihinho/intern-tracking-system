package com.fcinar.interntrackingsystem.repository;

import com.fcinar.interntrackingsystem.model.CompanyIntern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ICompanyInternRepository extends JpaRepository<CompanyIntern, UUID> {
    List<CompanyIntern> findAllByCompanyId(UUID companyId);

    List<CompanyIntern> findAllByInternId(UUID internId);
}
