package com.fcinar.interntrackingsystem.dto.converter;

import com.fcinar.interntrackingsystem.dto.RoleDto;
import com.fcinar.interntrackingsystem.model.Role;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Component
public class RoleDtoConverter {
    public RoleDto convert(@NotNull Role from) {
        return new RoleDto(from.getId(), from.getRoleName());
    }
}
