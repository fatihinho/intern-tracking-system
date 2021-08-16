package com.fcinar.interntrackingsystem.service;

import com.fcinar.interntrackingsystem.dto.UserDto;
import com.fcinar.interntrackingsystem.dto.request.LoginValidationRequest;
import com.fcinar.interntrackingsystem.exception.UserUnauthorizedException;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {
    private final UserService userService;

    public LoginService(UserService userService) {
        this.userService = userService;
    }

    public Boolean isValid(@NotNull LoginValidationRequest loginValidationRequest) {
        List<UserDto> users = userService.getAllUsersByRoleId(loginValidationRequest.getRoleType());
        UserDto user = userService.getUserByUsernameAndPassword(
                loginValidationRequest.getUsername(), loginValidationRequest.getPassword());
        if (users.isEmpty()) {
            return false;
        }
        return users.stream().map(u -> u.getId() == user.getId())
                .findAny()
                .orElseThrow(() -> new UserUnauthorizedException("Unauthorized User by id: " + user.getId()));
    }
}
