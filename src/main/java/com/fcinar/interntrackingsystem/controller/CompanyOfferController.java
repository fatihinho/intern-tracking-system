package com.fcinar.interntrackingsystem.controller;

import com.fcinar.interntrackingsystem.dto.CompanyOfferDto;
import com.fcinar.interntrackingsystem.dto.request.CreateCompanyOfferRequest;
import com.fcinar.interntrackingsystem.service.CompanyOfferService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class CompanyOfferController {
    private final CompanyOfferService companyOfferService;

    public CompanyOfferController(CompanyOfferService companyOfferService) {
        this.companyOfferService = companyOfferService;
    }


    @GetMapping("/company-offers/{id}")
    public ResponseEntity<CompanyOfferDto> getCompanyOfferById(@PathVariable UUID id) {
        try {
            CompanyOfferDto companyOffer = companyOfferService.getCompanyOfferById(id);
            if (companyOffer.getId() == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(companyOffer, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/company-offers/company/{companyId}")
    public ResponseEntity<List<CompanyOfferDto>> getAllCompanyOffersByCompanyId(@PathVariable UUID companyId) {
        try {
            List<CompanyOfferDto> companyOffers = companyOfferService.getAllCompanyOffersByCompanyId(companyId);
            if (companyOffers.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(companyOffers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/company-offers/intern/{internId}")
    public ResponseEntity<List<CompanyOfferDto>> getAllCompanyOffersByInternId(@PathVariable UUID internId) {
        try {
            List<CompanyOfferDto> companyOffers = companyOfferService.getAllCompanyOffersByInternId(internId);
            if (companyOffers.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(companyOffers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/company-offers")
    public ResponseEntity<List<CompanyOfferDto>> getAllCompanyOffers() {
        try {
            List<CompanyOfferDto> companyOffers = companyOfferService.getAllCompanyOffers();
            if (companyOffers.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(companyOffers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/company-offers")
    public ResponseEntity<CompanyOfferDto> createCompanyOffer(
            @RequestBody CreateCompanyOfferRequest createCompanyOfferRequest) {
        try {
            CompanyOfferDto companyOffer = companyOfferService.createCompanyOffer(createCompanyOfferRequest);
            if (companyOffer.getId() == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(companyOffer, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/company-offers/accept/{id}")
    public ResponseEntity<CompanyOfferDto> acceptCompanyOfferById(@PathVariable UUID id) {
        try {
            CompanyOfferDto companyOffer = companyOfferService.acceptCompanyOfferById(id);
            return new ResponseEntity<>(companyOffer, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/company-offers/reject/{id}")
    public ResponseEntity<CompanyOfferDto> rejectCompanyOfferById(@PathVariable UUID id) {
        try {
            CompanyOfferDto companyOffer = companyOfferService.rejectCompanyOfferById(id);
            return new ResponseEntity<>(companyOffer, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/company-offers/activate/{id}")
    public ResponseEntity<CompanyOfferDto> activateCompanyOfferById(@PathVariable UUID id) {
        try {
            CompanyOfferDto companyOffer = companyOfferService.activateCompanyOfferById(id);
            return new ResponseEntity<>(companyOffer, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/company-offers/inactivate/{id}")
    public ResponseEntity<CompanyOfferDto> inactivateCompanyOfferById(@PathVariable UUID id) {
        try {
            CompanyOfferDto companyOffer = companyOfferService.inactivateCompanyOfferById(id);
            return new ResponseEntity<>(companyOffer, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
