package com.fcinar.interntrackingsystem.dto.converter;

import com.fcinar.interntrackingsystem.dto.CompanyDto;
import com.fcinar.interntrackingsystem.model.Company;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Component
public class CompanyDtoConverter {
    public CompanyDto convert(@NotNull Company from) {
        return new CompanyDto(from.getId(), from.getName(), from.getEmail(), from.getAddress(), from.getCity(),
                from.getRegion(), from.getPostalCode(), from.getCountry(), from.getPhone(), from.getUser());
    }
}