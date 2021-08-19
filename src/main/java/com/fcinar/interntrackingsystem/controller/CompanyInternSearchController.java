package com.fcinar.interntrackingsystem.controller;

import com.fcinar.interntrackingsystem.dto.CompanyInternSearchDto;
import com.fcinar.interntrackingsystem.dto.request.CreateCompanyInternSearchRequest;
import com.fcinar.interntrackingsystem.service.CompanyInternSearchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class CompanyInternSearchController {
    private final CompanyInternSearchService companyInternSearchService;

    public CompanyInternSearchController(CompanyInternSearchService companyInternSearchService) {
        this.companyInternSearchService = companyInternSearchService;
    }


    @GetMapping("/intern-searches/{id}")
    public ResponseEntity<CompanyInternSearchDto> getCompanyInternSearchById(@PathVariable UUID id) {
        try {
            CompanyInternSearchDto companyInternSearch = companyInternSearchService.getCompanyInternSearchById(id);
            return new ResponseEntity<>(companyInternSearch, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/intern-searches/company/{companyId}")
    public ResponseEntity<CompanyInternSearchDto> getCompanyInternSearchByCompanyId(@PathVariable UUID companyId) {
        try {
            CompanyInternSearchDto companyInternSearch = companyInternSearchService
                    .getCompanyInternSearchByCompanyId(companyId);
            return new ResponseEntity<>(companyInternSearch, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/intern-searches")
    public ResponseEntity<List<CompanyInternSearchDto>> getAllCompanyInternSearches() {
        try {
            List<CompanyInternSearchDto> companyInternSearches = companyInternSearchService
                    .getAllCompanyInternSearches();
            if (companyInternSearches.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(companyInternSearches, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/intern-searches")
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


    @DeleteMapping("/intern-searches/{companyId}")
    public ResponseEntity<HttpStatus> deleteCompanyInternSearchByCompanyId(@PathVariable UUID companyId) {
        try {
            CompanyInternSearchDto companyInternSearch = companyInternSearchService.
                    getCompanyInternSearchByCompanyId(companyId);
            if (companyInternSearch != null) {
                companyInternSearchService.deleteCompanyInternSearchByCompanyId(companyId);
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
