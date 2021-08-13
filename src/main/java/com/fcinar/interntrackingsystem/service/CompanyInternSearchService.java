package com.fcinar.interntrackingsystem.service;

import com.fcinar.interntrackingsystem.dto.CompanyInternSearchDto;
import com.fcinar.interntrackingsystem.dto.converter.CompanyInternSearchDtoConverter;
import com.fcinar.interntrackingsystem.dto.request.CreateCompanyInternSearchRequest;
import com.fcinar.interntrackingsystem.model.Company;
import com.fcinar.interntrackingsystem.model.CompanyInternSearch;
import com.fcinar.interntrackingsystem.repository.ICompanyInternSearchRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.UUID;

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
