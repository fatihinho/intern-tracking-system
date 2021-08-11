package com.fcinar.interntrackingsystem.dto.converter;

import com.fcinar.interntrackingsystem.dto.UserRoleDto;
import com.fcinar.interntrackingsystem.model.UserRole;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Component
public class UserRoleDtoConverter {
    public UserRoleDto convert(@NotNull UserRole from) {
        return new UserRoleDto(from.getId(), from.getUser(), from.getRole());
    }
}
