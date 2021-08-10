package com.fcinar.interntrackingsystem.dto.converter;

import com.fcinar.interntrackingsystem.dto.InternDto;
import com.fcinar.interntrackingsystem.model.Intern;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Component
public class InternDtoConverter {
    public InternDto convert(@NotNull Intern from) {
        return new InternDto(from.getId(), from.getName(), from.getSurname(),
                from.getBirthDate(), from.getIdentityNumber(), from.getPhone(), from.getEmail(),
                from.getCvUrl(), from.getCompany(), from.getInstitution(), from.getUser());
    }
}
