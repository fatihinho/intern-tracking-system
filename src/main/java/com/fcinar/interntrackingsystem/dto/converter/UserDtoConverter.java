package com.fcinar.interntrackingsystem.dto.converter;

import com.fcinar.interntrackingsystem.dto.UserDto;
import com.fcinar.interntrackingsystem.model.User;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Component
public class UserDtoConverter {
    public UserDto convert(@NotNull User from) {
        return new UserDto(from.getId(), from.getUsername(), from.getPassword(), from.getLogoUrl(),
                from.getSubUserType(), from.getSubUserId(), from.getRole());
    }
}
