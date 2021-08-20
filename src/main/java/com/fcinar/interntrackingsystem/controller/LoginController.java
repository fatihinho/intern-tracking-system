package com.fcinar.interntrackingsystem.controller;

import com.fcinar.interntrackingsystem.dto.UserDto;
import com.fcinar.interntrackingsystem.dto.request.LoginValidationRequest;
import com.fcinar.interntrackingsystem.service.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class LoginController {
    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }


    @PostMapping("/login")
    public ResponseEntity<UserDto> loginValidation(@RequestBody LoginValidationRequest loginValidationRequest) {
        try {
            if (Boolean.TRUE.equals(loginService.isValid(loginValidationRequest))) {
                UserDto user = loginService.getUserByUsernameAndPassword(loginValidationRequest.getUsername(),
                        loginValidationRequest.getPassword());
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
