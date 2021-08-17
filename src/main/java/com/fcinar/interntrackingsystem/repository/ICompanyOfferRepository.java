package com.fcinar.interntrackingsystem.repository;

import com.fcinar.interntrackingsystem.model.CompanyOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ICompanyOfferRepository extends JpaRepository<CompanyOffer, UUID> {
    List<CompanyOffer> findAllByCompanyId(UUID companyId);

    List<CompanyOffer> findAllByInternId(UUID internId);
}
