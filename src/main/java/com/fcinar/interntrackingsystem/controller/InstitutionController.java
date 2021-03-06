package com.fcinar.interntrackingsystem.controller;

import com.fcinar.interntrackingsystem.dto.InstitutionDto;
import com.fcinar.interntrackingsystem.dto.request.CreateInstitutionRequest;
import com.fcinar.interntrackingsystem.dto.request.UpdateUserProfileRequest;
import com.fcinar.interntrackingsystem.service.InstitutionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class InstitutionController {
    private final InstitutionService institutionService;

    public InstitutionController(InstitutionService institutionService) {
        this.institutionService = institutionService;
    }


    @GetMapping("/institutions")
    public ResponseEntity<List<InstitutionDto>> getAllInstitutions() {
        try {
            List<InstitutionDto> institutions = institutionService.getAllInstitutions();
            if (institutions.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(institutions, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/institutions/{id}")
    public ResponseEntity<InstitutionDto> getInstitutionById(@PathVariable UUID id) {
        try {
            InstitutionDto institution = institutionService.getInstitutionById(id);
            return new ResponseEntity<>(institution, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/institutions")
    public ResponseEntity<InstitutionDto> createInstitution(
            @RequestBody CreateInstitutionRequest createInstitutionRequest) {
        try {
            InstitutionDto institution = institutionService.createInstitution(createInstitutionRequest);
            if (institution.getUser().getSubUserId() == null) {
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
            return new ResponseEntity<>(institution, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/institutions/{id}/profile")
    public ResponseEntity<InstitutionDto> updateInstitutionProfileById(
            @PathVariable UUID id,
            @RequestBody UpdateUserProfileRequest updateUserProfileRequest) {
        try {
            InstitutionDto institution = institutionService
                    .updateInstitutionProfileById(id, updateUserProfileRequest);
            return new ResponseEntity<>(institution, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}