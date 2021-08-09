package com.fcinar.interntrackingsystem.repository;

import com.fcinar.interntrackingsystem.model.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IInstitutionRepository extends JpaRepository<Institution, UUID> {
}
