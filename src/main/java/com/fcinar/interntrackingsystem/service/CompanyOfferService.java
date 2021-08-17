package com.fcinar.interntrackingsystem.service;

import com.fcinar.interntrackingsystem.dto.CompanyOfferDto;
import com.fcinar.interntrackingsystem.dto.converter.CompanyOfferDtoConverter;
import com.fcinar.interntrackingsystem.dto.request.CreateCompanyOfferRequest;
import com.fcinar.interntrackingsystem.exception.CompanyOfferNotFoundException;
import com.fcinar.interntrackingsystem.model.Company;
import com.fcinar.interntrackingsystem.model.CompanyOffer;
import com.fcinar.interntrackingsystem.model.Intern;
import com.fcinar.interntrackingsystem.repository.ICompanyOfferRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CompanyOfferService {
    private final ICompanyOfferRepository companyOfferRepository;
    private final CompanyOfferDtoConverter companyOfferDtoConverter;
    private final CompanyService companyService;
    private final InternService internService;

    public CompanyOfferService(ICompanyOfferRepository companyOfferRepository,
                               CompanyOfferDtoConverter companyOfferDtoConverter,
                               CompanyService companyService,
                               InternService internService) {
        this.companyOfferRepository = companyOfferRepository;
        this.companyOfferDtoConverter = companyOfferDtoConverter;
        this.companyService = companyService;
        this.internService = internService;
    }


    private CompanyOffer findCompanyOfferById(UUID id) {
        return companyOfferRepository.findById(id)
                .orElseThrow(() -> new CompanyOfferNotFoundException("Company Offer could not found by id: " + id));
    }


    public CompanyOfferDto getCompanyOfferById(UUID id) {
        CompanyOffer companyOffer = findCompanyOfferById(id);
        return companyOfferDtoConverter.convert(companyOffer);
    }

    public List<CompanyOfferDto> getAllCompanyOffersByCompanyId(UUID companyId) {
        List<CompanyOffer> companyOffers = companyOfferRepository.findAllByCompanyId(companyId);
        return companyOffers.stream().map(companyOfferDtoConverter::convert).collect(Collectors.toList());
    }

    public List<CompanyOfferDto> getAllCompanyOffersByInternId(UUID internId) {
        List<CompanyOffer> companyOffers = companyOfferRepository.findAllByInternId(internId);
        return companyOffers.stream().map(companyOfferDtoConverter::convert).collect(Collectors.toList());
    }

    public List<CompanyOfferDto> getAllCompanyOffers() {
        List<CompanyOffer> companyOffers = companyOfferRepository.findAll();
        return companyOffers.stream().map(companyOfferDtoConverter::convert).collect(Collectors.toList());
    }


    public CompanyOfferDto createCompanyOffer(@NotNull CreateCompanyOfferRequest createCompanyOfferRequest) {
        Date dateNow = Date.from(LocalDate.now().atStartOfDay().toInstant(ZoneOffset.ofHours(3)));
        Company company = companyService.findCompanyById(createCompanyOfferRequest.getCompanyId());
        Intern intern = internService.findInternById(createCompanyOfferRequest.getInternId());
        CompanyOffer companyOffer = new CompanyOffer(
                dateNow, createCompanyOfferRequest.getOfferMessage(),
                true, false, false, company, intern);
        return companyOfferDtoConverter.convert(companyOfferRepository.save(companyOffer));
    }


    public CompanyOfferDto acceptCompanyOfferById(UUID id) {
        CompanyOffer companyOffer = findCompanyOfferById(id);
        companyOffer.setAccepted(true);
        companyOffer.setRejected(false);
        return companyOfferDtoConverter.convert(companyOfferRepository.save(companyOffer));
    }

    public CompanyOfferDto rejectCompanyOfferById(UUID id) {
        CompanyOffer companyOffer = findCompanyOfferById(id);
        companyOffer.setRejected(true);
        companyOffer.setAccepted(false);
        return companyOfferDtoConverter.convert(companyOfferRepository.save(companyOffer));
    }

    public CompanyOfferDto activateCompanyOfferById(UUID id) {
        CompanyOffer companyOffer = findCompanyOfferById(id);
        companyOffer.setActive(true);
        return companyOfferDtoConverter.convert(companyOfferRepository.save(companyOffer));
    }

    public CompanyOfferDto inactivateCompanyOfferById(UUID id) {
        CompanyOffer companyOffer = findCompanyOfferById(id);
        companyOffer.setActive(false);
        return companyOfferDtoConverter.convert(companyOfferRepository.save(companyOffer));
    }
}
