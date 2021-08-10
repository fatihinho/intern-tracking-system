package com.fcinar.interntrackingsystem.dto.converter;

import com.fcinar.interntrackingsystem.dto.InstitutionDto;
import com.fcinar.interntrackingsystem.model.Institution;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Component
public class InstitutionDtoConverter {
    public InstitutionDto convert(@NotNull Institution from) {
        return new InstitutionDto(from.getId(), from.getName(), from.getEmail(), from.getAddress(), from.getCity(),
                from.getRegion(), from.getPostalCode(), from.getCountry(), from.getPhone(), from.getUser());
    }
}
