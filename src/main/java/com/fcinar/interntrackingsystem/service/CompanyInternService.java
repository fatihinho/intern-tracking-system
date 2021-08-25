package com.fcinar.interntrackingsystem.service;

import com.fcinar.interntrackingsystem.dto.CompanyInternDto;
import com.fcinar.interntrackingsystem.dto.request.UpdateUnitNameRequest;
import com.fcinar.interntrackingsystem.dto.converter.CompanyInternDtoConverter;
import com.fcinar.interntrackingsystem.dto.request.CreateCompanyInternRequest;
import com.fcinar.interntrackingsystem.exception.CompanyInternNotFoundException;
import com.fcinar.interntrackingsystem.model.Company;
import com.fcinar.interntrackingsystem.model.CompanyIntern;
import com.fcinar.interntrackingsystem.model.CompanyInternSearch;
import com.fcinar.interntrackingsystem.model.Intern;
import com.fcinar.interntrackingsystem.repository.ICompanyInternRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CompanyInternService {
    private final ICompanyInternRepository companyInternRepository;
    private final CompanyInternDtoConverter companyInternDtoConverter;
    private final CompanyService companyService;
    private final CompanyInternSearchService companyInternSearchService;
    private final InternService internService;

    public CompanyInternService(ICompanyInternRepository companyInternRepository,
                                CompanyInternDtoConverter companyInternDtoConverter,
                                CompanyService companyService,
                                CompanyInternSearchService companyInternSearchService,
                                InternService internService) {
        this.companyInternRepository = companyInternRepository;
        this.companyInternDtoConverter = companyInternDtoConverter;
        this.companyService = companyService;
        this.companyInternSearchService = companyInternSearchService;
        this.internService = internService;
    }

    private CompanyIntern findCompanyInternById(UUID id) {
        return companyInternRepository.findById(id)
                .orElseThrow(() -> new CompanyInternNotFoundException("CompanyIntern could not found by id: " + id));
    }

    private CompanyIntern findCompanyInternByCompanyIdAndInternId(UUID companyId, UUID internId) {
        return companyInternRepository.findByCompanyIdAndInternId(companyId, internId)
                .orElseThrow(() -> new CompanyInternNotFoundException("CompanyIntern could not found by " +
                        "company id: " + companyId + " and intern id: " + internId));
    }

    public CompanyInternDto getCompanyInternById(UUID id) {
        CompanyIntern companyIntern = findCompanyInternById(id);
        return companyInternDtoConverter.convert(companyIntern);
    }

    public CompanyInternDto getCompanyInternByCompanyIdAndInternId(UUID companyId, UUID internId) {
        CompanyIntern companyIntern = findCompanyInternByCompanyIdAndInternId(companyId, internId);
        return companyInternDtoConverter.convert(companyIntern);
    }

    public List<CompanyInternDto> getAllCompanyInternsByCompanyId(UUID companyId) {
        List<CompanyIntern> companyInterns = companyInternRepository.findAllByCompanyId(companyId);
        return companyInterns.stream().map(companyInternDtoConverter::convert).collect(Collectors.toList());
    }

    public List<CompanyInternDto> getAllCompanyInternsByInternId(UUID internId) {
        List<CompanyIntern> companyInterns = companyInternRepository.findAllByInternId(internId);
        return companyInterns.stream().map(companyInternDtoConverter::convert).collect(Collectors.toList());
    }

    public List<CompanyInternDto> getAllCompanyInterns() {
        List<CompanyIntern> companyInterns = companyInternRepository.findAll();
        return companyInterns.stream().map(companyInternDtoConverter::convert).collect(Collectors.toList());
    }

    public List<CompanyInternDto> getAllCompanyInternsHasUnitByCompanyId(UUID companyId) {
        List<CompanyIntern> companyInterns = companyInternRepository.findAllByCompanyIdAndUnitNameNotNull(companyId);
        return companyInterns.stream().map(companyInternDtoConverter::convert).collect(Collectors.toList());
    }

    public CompanyInternDto createCompanyIntern(@NotNull CreateCompanyInternRequest createCompanyInternRequest) {
        Intern intern = internService.findInternById(createCompanyInternRequest.getInternId());
        Company company = companyService.findCompanyById(createCompanyInternRequest.getCompanyId());
        CompanyInternSearch companyInternSearch = companyInternSearchService
                .findCompanyInternSearchByCompanyId(company.getId());
        CompanyIntern companyIntern = new CompanyIntern(null, companyInternSearch.getDayOfInternship(),
                companyInternSearch.getStartDate(), companyInternSearch.getEndDate(), company, intern);
        return companyInternDtoConverter.convert(companyInternRepository.save(companyIntern));
    }

    public CompanyInternDto addUnitToIntern(@NotNull UpdateUnitNameRequest updateUnitNameRequest) {
        CompanyIntern companyIntern = findCompanyInternById(updateUnitNameRequest.getId());
        companyIntern.setUnitName(updateUnitNameRequest.getUnitName());
        return companyInternDtoConverter.convert(companyInternRepository.save(companyIntern));
    }
}