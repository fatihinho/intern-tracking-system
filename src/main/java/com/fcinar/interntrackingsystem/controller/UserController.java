package com.fcinar.interntrackingsystem.controller;

import com.fcinar.interntrackingsystem.dto.UserDto;
import com.fcinar.interntrackingsystem.dto.request.CreateUserRequest;
import com.fcinar.interntrackingsystem.dto.request.UpdateUserPasswordRequest;
import com.fcinar.interntrackingsystem.dto.request.UpdateUserProfileRequest;
import com.fcinar.interntrackingsystem.model.UserTypes;
import com.fcinar.interntrackingsystem.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        try {
            List<UserDto> users = userService.getAllUsers();
            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping(value = "/users")
    public ResponseEntity<UserDto> createUser(
            @RequestBody CreateUserRequest createUserRequest) {
        try {
            UserDto user = userService.createUser(createUserRequest);
            if (user.getRole().getId() == UserTypes.ADMIN.getValue() ||
                    user.getRole().getId() == UserTypes.INTERN.getValue() ||
                    user.getRole().getId() == UserTypes.COMPANY.getValue() ||
                    user.getRole().getId() == UserTypes.INSTITUTION.getValue()) {
                return new ResponseEntity<>(user, HttpStatus.CREATED);
            }
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/users/{username}/settings")
    public ResponseEntity<UserDto> updateUserPasswordByUsername(
            @PathVariable String username,
            @RequestBody UpdateUserPasswordRequest updateUserPasswordRequest) {
        try {
            UserDto user = userService.updateUserPasswordByUsername(username, updateUserPasswordRequest);
            if ((!updateUserPasswordRequest.getPassword().equals(updateUserPasswordRequest.getPassword2())) ||
                    (updateUserPasswordRequest.getPassword().isEmpty() ||
                            updateUserPasswordRequest.getPassword2().isEmpty())) {
                return new ResponseEntity<>(user, HttpStatus.NOT_ACCEPTABLE);
            }
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/users/{username}/profile")
    public ResponseEntity<UserDto> updateUserProfileByUsername(
            @PathVariable String username,
            @RequestBody UpdateUserProfileRequest updateUserProfileRequest) {
        try {
            UserDto user = userService.updateUserProfileByUsername(username, updateUserProfileRequest);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
