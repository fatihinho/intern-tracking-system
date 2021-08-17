package com.fcinar.interntrackingsystem.controller;

import com.fcinar.interntrackingsystem.dto.CompanyInternDto;
import com.fcinar.interntrackingsystem.dto.request.CreateCompanyInternRequest;
import com.fcinar.interntrackingsystem.service.CompanyInternService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class CompanyInternController {
    private final CompanyInternService companyInternService;

    public CompanyInternController(CompanyInternService companyInternService) {
        this.companyInternService = companyInternService;
    }

    @GetMapping("/company-interns/{id}")
    public ResponseEntity<CompanyInternDto> getCompanyInternById(@PathVariable UUID id) {
        try {
            CompanyInternDto companyIntern = companyInternService.getCompanyInternById(id);
            if (companyIntern.getId() == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(companyIntern, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/company-interns/company/{companyId}")
    public ResponseEntity<List<CompanyInternDto>> getAllCompanyInternsByCompanyId(@PathVariable UUID companyId) {
        try {
            List<CompanyInternDto> companyInterns = companyInternService.getAllCompanyInternsByCompanyId(companyId);
            if (companyInterns.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(companyInterns, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/company-interns/intern/{internId}")
    public ResponseEntity<List<CompanyInternDto>> getAllCompanyInternsByInternId(@PathVariable UUID internId) {
        try {
            List<CompanyInternDto> companyInterns = companyInternService.getAllCompanyInternsByInternId(internId);
            if (companyInterns.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(companyInterns, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/company-interns")
    public ResponseEntity<List<CompanyInternDto>> getAllCompanyInterns() {
        try {
            List<CompanyInternDto> companyInterns = companyInternService.getAllCompanyInterns();
            if (companyInterns.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(companyInterns, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/company-interns")
    public ResponseEntity<CompanyInternDto> createCompanyIntern(
            @RequestBody CreateCompanyInternRequest createCompanyInternRequest) {
        try {
            CompanyInternDto companyIntern = companyInternService.createCompanyIntern(createCompanyInternRequest);
            if (companyIntern.getId() == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(companyIntern, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
