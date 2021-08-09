package com.fcinar.interntrackingsystem.dto.converter;

import com.fcinar.interntrackingsystem.dto.CompanyInternSearchDto;
import com.fcinar.interntrackingsystem.model.CompanyInternSearch;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Component
public class CompanyInternSearchDtoConverter {
    public CompanyInternSearchDto convert(@NotNull CompanyInternSearch from) {
        return new CompanyInternSearchDto(from.getId(), from.getDayOfInternship(),
                from.getStartDate(), from.getEndDate(), from.isActive(), from.getCompany());
    }
}
