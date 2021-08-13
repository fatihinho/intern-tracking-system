package com.fcinar.interntrackingsystem.controller;

import com.fcinar.interntrackingsystem.dto.CompanyInternSearchDto;
import com.fcinar.interntrackingsystem.dto.request.CreateCompanyInternSearchRequest;
import com.fcinar.interntrackingsystem.service.CompanyInternSearchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class CompanyInternSearchController {
    private final CompanyInternSearchService companyInternSearchService;

    public CompanyInternSearchController(CompanyInternSearchService companyInternSearchService) {
        this.companyInternSearchService = companyInternSearchService;
    }

    @PostMapping("/intern-search")
    public ResponseEntity<CompanyInternSearchDto> createCompanyInternSearch(
            @RequestBody CreateCompanyInternSearchRequest createCompanyInternSearchRequest) {
        try {
            CompanyInternSearchDto companyInternSearch = companyInternSearchService
                    .createCompanyInternSearch(createCompanyInternSearchRequest);
            return new ResponseEntity<>(companyInternSearch, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/intern-search/{companyId}")
    public ResponseEntity<HttpStatus> deleteCompanyInternSearchByCompanyId(@PathVariable UUID companyId) {
        try {
            companyInternSearchService.deleteCompanyInternSearchByCompanyId(companyId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
