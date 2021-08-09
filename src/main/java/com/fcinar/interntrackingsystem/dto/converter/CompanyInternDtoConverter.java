package com.fcinar.interntrackingsystem.dto.converter;

import com.fcinar.interntrackingsystem.dto.CompanyInternDto;
import com.fcinar.interntrackingsystem.model.CompanyIntern;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Component
public class CompanyInternDtoConverter {
    public CompanyInternDto convert(@NotNull CompanyIntern from) {
        return new CompanyInternDto(from.getId(), from.getUnitName(), from.getDayOfInternship(),
                from.getStartDate(), from.getEndDate(), from.getCompany(), from.getIntern());
    }
}
