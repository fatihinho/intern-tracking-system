package com.fcinar.interntrackingsystem.repository;

import com.fcinar.interntrackingsystem.model.InternDiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IInternDiaryRepository extends JpaRepository<InternDiary, UUID> {
    List<InternDiary> findAllByInternId(UUID internId);
}
