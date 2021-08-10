package com.fcinar.interntrackingsystem.service;

import com.fcinar.interntrackingsystem.dto.UserDto;
import com.fcinar.interntrackingsystem.dto.converter.UserDtoConverter;
import com.fcinar.interntrackingsystem.dto.request.CreateUserRequest;
import com.fcinar.interntrackingsystem.dto.request.UpdateUserPasswordRequest;
import com.fcinar.interntrackingsystem.exception.UserNotFoundException;
import com.fcinar.interntrackingsystem.model.User;
import com.fcinar.interntrackingsystem.model.UserTypes;
import com.fcinar.interntrackingsystem.repository.IUserRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final IUserRepository userRepository;
    private final UserDtoConverter userDtoConverter;

    public UserService(IUserRepository userRepository,
                       UserDtoConverter userDtoConverter) {
        this.userRepository = userRepository;
        this.userDtoConverter = userDtoConverter;
    }


    protected User findUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User could not found by id: " + id));
    }

    protected User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User could not found by username: " + username));
    }


    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(userDtoConverter::convert).collect(Collectors.toList());
    }

    public UserDto getUserById(UUID id) {
        User user = findUserById(id);
        return userDtoConverter.convert(user);
    }

    public UserDto getUserByUsername(String username) {
        User user = findUserByUsername(username);
        return userDtoConverter.convert(user);
    }


    public UserDto createUser(@NotNull CreateUserRequest createUserRequest) {
        User user = new User(createUserRequest.getUsername(), createUserRequest.getPassword(),
                createUserRequest.getType(), null, createUserRequest.getLogoUrl());
        if (createUserRequest.getType().equals(UserTypes.ADMIN.toString()) ||
                createUserRequest.getType().equals(UserTypes.INTERN.toString()) ||
                createUserRequest.getType().equals(UserTypes.COMPANY.toString()) ||
                createUserRequest.getType().equals(UserTypes.INSTITUTION.toString())) {
            return userDtoConverter.convert(userRepository.save(user));
        }
        return userDtoConverter.convert(user);
    }


    public UserDto updateUserPasswordByUsername(String username,
                                                @NotNull UpdateUserPasswordRequest updateUserPasswordRequest) {
        User user = findUserByUsername(username);
        if (updateUserPasswordRequest.getPassword().equals(updateUserPasswordRequest.getPassword2()) &&
                !updateUserPasswordRequest.getPassword().isEmpty() &&
                !updateUserPasswordRequest.getPassword2().isEmpty()) {
            user.setPassword(updateUserPasswordRequest.getPassword());
        }
        return userDtoConverter.convert(userRepository.save(user));
    }


    public void deleteAllUsers() {
        userRepository.deleteByType(UserTypes.INTERN.toString());
        userRepository.deleteByType(UserTypes.COMPANY.toString());
        userRepository.deleteByType(UserTypes.INSTITUTION.toString());
    }

    public void deleteUserById(UUID id) {
        userRepository.deleteById(id);
    }
}
