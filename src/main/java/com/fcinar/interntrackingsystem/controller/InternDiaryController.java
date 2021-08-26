package com.fcinar.interntrackingsystem.controller;

import com.fcinar.interntrackingsystem.dto.CompanyOfferDto;
import com.fcinar.interntrackingsystem.dto.InternDiaryDto;
import com.fcinar.interntrackingsystem.dto.request.CreateInternDiaryRequest;
import com.fcinar.interntrackingsystem.dto.request.UpdateInternDiaryRequest;
import com.fcinar.interntrackingsystem.service.InternDiaryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class InternDiaryController {
    private final InternDiaryService internDiaryService;

    public InternDiaryController(InternDiaryService internDiaryService) {
        this.internDiaryService = internDiaryService;
    }

    @GetMapping("/interns/diaries")
    public ResponseEntity<List<InternDiaryDto>> getAllInternDiaries() {
        try {
            List<InternDiaryDto> internDiaries = internDiaryService.getAllInternDiaries();
            if (internDiaries.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(internDiaries, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/interns/diaries/institution/{institutionId}")
    public ResponseEntity<List<InternDiaryDto>> getAllInternDiariesByInstitutionId(
            @PathVariable UUID institutionId) {
        try {
            List<InternDiaryDto> internDiaries = internDiaryService
                    .getAllInternDiariesByInstitutionId(institutionId);
            if (internDiaries.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(internDiaries, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/interns/{internId}/diaries")
    public ResponseEntity<List<InternDiaryDto>> getAllInternDiariesByInternId(@PathVariable UUID internId) {
        try {
            List<InternDiaryDto> internDiaries = internDiaryService.getAllInternDiariesByInternId(internId);
            if (internDiaries.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(internDiaries, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/interns/diaries/{id}")
    public ResponseEntity<InternDiaryDto> getInternDiaryById(@PathVariable UUID id) {
        try {
            InternDiaryDto internDiary = internDiaryService.getInternDiaryById(id);
            return new ResponseEntity<>(internDiary, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/interns/{internId}/diaries")
    public ResponseEntity<InternDiaryDto> createInternDiary(
            @PathVariable UUID internId,
            @RequestBody CreateInternDiaryRequest createInternDiaryRequest) {
        try {
            InternDiaryDto internDiary = internDiaryService.createInternDiary(internId, createInternDiaryRequest);
            return new ResponseEntity<>(internDiary, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/interns/diaries/{id}")
    public ResponseEntity<InternDiaryDto> updateInternDiaryById(
            @PathVariable UUID id,
            @RequestBody UpdateInternDiaryRequest updateInternDiaryRequest) {
        try {
            InternDiaryDto internDiary = internDiaryService.updateInternDiaryById(id, updateInternDiaryRequest);
            return new ResponseEntity<>(internDiary, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/interns/diaries/accept/{id}")
    public ResponseEntity<InternDiaryDto> acceptInternDiaryById(@PathVariable UUID id) {
        try {
            InternDiaryDto internDiary = internDiaryService.acceptInternDiaryById(id);
            return new ResponseEntity<>(internDiary, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/interns/diaries/reject/{id}")
    public ResponseEntity<InternDiaryDto> rejectInternDiaryById(@PathVariable UUID id) {
        try {
            InternDiaryDto internDiary = internDiaryService.rejectInternDiaryById(id);
            return new ResponseEntity<>(internDiary, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
