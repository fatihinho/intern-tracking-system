package com.fcinar.interntrackingsystem.service;

import com.fcinar.interntrackingsystem.dto.CompanyDto;
import com.fcinar.interntrackingsystem.dto.converter.CompanyDtoConverter;
import com.fcinar.interntrackingsystem.dto.request.CreateCompanyRequest;
import com.fcinar.interntrackingsystem.exception.CompanyNotFoundException;
import com.fcinar.interntrackingsystem.model.Company;
import com.fcinar.interntrackingsystem.model.User;
import com.fcinar.interntrackingsystem.model.UserTypes;
import com.fcinar.interntrackingsystem.repository.ICompanyRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CompanyService {
    private final ICompanyRepository companyRepository;
    private final CompanyDtoConverter companyDtoConverter;
    private final UserService userService;

    public CompanyService(ICompanyRepository companyRepository,
                          CompanyDtoConverter companyDtoConverter,
                          UserService userService) {
        this.companyRepository = companyRepository;
        this.companyDtoConverter = companyDtoConverter;
        this.userService = userService;
    }


    protected Company findCompanyById(UUID id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new CompanyNotFoundException("Company could not found by id: " + id));
    }


    public List<CompanyDto> getAllCompanies() {
        List<Company> companies = companyRepository.findAll();
        return companies.stream().map(companyDtoConverter::convert).collect(Collectors.toList());
    }

    public CompanyDto getCompanyById(UUID id) {
        Company company = findCompanyById(id);
        return companyDtoConverter.convert(company);
    }


    public CompanyDto createCompany(@NotNull CreateCompanyRequest createCompanyRequest) {
        User user = userService.findUserById(createCompanyRequest.getUserId());
        Company company = new Company(
                createCompanyRequest.getName(), createCompanyRequest.getEmail(),
                createCompanyRequest.getAddress(), createCompanyRequest.getCity(),
                createCompanyRequest.getRegion(), createCompanyRequest.getPostalCode(),
                createCompanyRequest.getCountry(), createCompanyRequest.getPhone(), user);
        if (user.getRole().getId() == UserTypes.COMPANY.getValue()) {
            user.setSubUserId(company.getId());
            user.setSubUserType(UserTypes.COMPANY.toString());
            return companyDtoConverter.convert(companyRepository.save(company));
        } else {
            return companyDtoConverter.convert(company);
        }
    }


    public void deleteAllCompanies() {
        companyRepository.deleteAll();
    }

    public void deleteCompanyById(UUID id) {
        companyRepository.deleteById(id);
    }
}