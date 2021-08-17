package com.fcinar.interntrackingsystem.service;

import com.fcinar.interntrackingsystem.dto.CompanyInternSearchDto;
import com.fcinar.interntrackingsystem.dto.converter.CompanyInternSearchDtoConverter;
import com.fcinar.interntrackingsystem.dto.request.CreateCompanyInternSearchRequest;
import com.fcinar.interntrackingsystem.exception.CompanyInternSearchNotFoundException;
import com.fcinar.interntrackingsystem.model.Company;
import com.fcinar.interntrackingsystem.model.CompanyInternSearch;
import com.fcinar.interntrackingsystem.repository.ICompanyInternSearchRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CompanyInternSearchService {
    private final ICompanyInternSearchRepository companyInternSearchRepository;
    private final CompanyInternSearchDtoConverter companyInternSearchDtoConverter;
    private final CompanyService companyService;

    public CompanyInternSearchService(ICompanyInternSearchRepository companyInternSearchRepository,
                                      CompanyInternSearchDtoConverter companyInternSearchDtoConverter,
                                      CompanyService companyService) {
        this.companyInternSearchRepository = companyInternSearchRepository;
        this.companyInternSearchDtoConverter = companyInternSearchDtoConverter;
        this.companyService = companyService;
    }


    private CompanyInternSearch findCompanyInternSearchById(UUID id) {
        return companyInternSearchRepository.findById(id)
                .orElseThrow(() -> new CompanyInternSearchNotFoundException(
                        "CompanyInternSearch could not found by id: " + id));
    }

    protected CompanyInternSearch findCompanyInternSearchByCompanyId(UUID companyId) {
        return companyInternSearchRepository.findByCompanyId(companyId)
                .orElseThrow(() -> new CompanyInternSearchNotFoundException(
                        "CompanyInternSearch could not found by company id: " + companyId));
    }


    public CompanyInternSearchDto getCompanyInternSearchById(UUID id) {
        CompanyInternSearch companyInternSearch = findCompanyInternSearchById(id);
        return companyInternSearchDtoConverter.convert(companyInternSearch);
    }

    public CompanyInternSearchDto getCompanyInternSearchByCompanyId(UUID companyId) {
        CompanyInternSearch companyInternSearch = findCompanyInternSearchByCompanyId(companyId);
        return companyInternSearchDtoConverter.convert(companyInternSearch);
    }

    public List<CompanyInternSearchDto> getAllCompanyInternSearches() {
        List<CompanyInternSearch> companyInternSearches = companyInternSearchRepository.findAll();
        return companyInternSearches.stream().map(companyInternSearchDtoConverter::convert).collect(Collectors.toList());
    }


    public CompanyInternSearchDto createCompanyInternSearch(
            @NotNull CreateCompanyInternSearchRequest createCompanyInternSearchRequest) {
        Company company = companyService.findCompanyById(createCompanyInternSearchRequest.getCompanyId());
        CompanyInternSearch companyInternSearch = new CompanyInternSearch(
                createCompanyInternSearchRequest.getDayOfInternship(),
                createCompanyInternSearchRequest.getStartDate(),
                createCompanyInternSearchRequest.getEndDate(),
                true,
                company
        );
        return companyInternSearchDtoConverter.convert(companyInternSearchRepository.save(companyInternSearch));
    }


    public void deleteCompanyInternSearchByCompanyId(UUID companyId) {
        companyInternSearchRepository.deleteAllByCompanyId(companyId);
    }
}
