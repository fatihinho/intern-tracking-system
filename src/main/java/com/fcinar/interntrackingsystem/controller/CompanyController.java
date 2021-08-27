package com.fcinar.interntrackingsystem.controller;

import com.fcinar.interntrackingsystem.dto.CompanyDto;
import com.fcinar.interntrackingsystem.dto.request.CreateCompanyRequest;
import com.fcinar.interntrackingsystem.dto.request.UpdateUserProfileRequest;
import com.fcinar.interntrackingsystem.service.CompanyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class CompanyController {
    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }


    @GetMapping("/companies")
    public ResponseEntity<List<CompanyDto>> getAllCompanies() {
        try {
            List<CompanyDto> companies = companyService.getAllCompanies();
            if (companies.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(companies, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/companies/{id}")
    public ResponseEntity<CompanyDto> getCompanyById(@PathVariable UUID id) {
        try {
            CompanyDto company = companyService.getCompanyById(id);
            return new ResponseEntity<>(company, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/companies")
    public ResponseEntity<CompanyDto> createCompany(@RequestBody CreateCompanyRequest createCompanyRequest) {
        try {
            CompanyDto company = companyService.createCompany(createCompanyRequest);
            if (company.getUser().getSubUserId() == null) {
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
            return new ResponseEntity<>(company, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/companies/{id}/profile")
    public ResponseEntity<CompanyDto> updateCompanyProfileById(
            @PathVariable UUID id,
            @RequestBody UpdateUserProfileRequest updateUserProfileRequest) {
        try {
            CompanyDto company = companyService.updateCompanyProfileById(id, updateUserProfileRequest);
            return new ResponseEntity<>(company, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
