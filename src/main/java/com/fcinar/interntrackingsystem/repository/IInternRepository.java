package com.fcinar.interntrackingsystem.repository;

import com.fcinar.interntrackingsystem.model.Intern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IInternRepository extends JpaRepository<Intern, UUID> {
}
