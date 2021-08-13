package com.fcinar.interntrackingsystem.service;

import com.fcinar.interntrackingsystem.dto.UserDto;
import com.fcinar.interntrackingsystem.dto.UserRoleDto;
import com.fcinar.interntrackingsystem.dto.converter.UserDtoConverter;
import com.fcinar.interntrackingsystem.dto.request.CreateUserRequest;
import com.fcinar.interntrackingsystem.dto.request.UpdateUserPasswordRequest;
import com.fcinar.interntrackingsystem.exception.UserNotFoundException;
import com.fcinar.interntrackingsystem.model.Role;
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
    private final RoleService roleService;
    private final UserRoleService userRoleService;

    public UserService(IUserRepository userRepository,
                       UserDtoConverter userDtoConverter,
                       RoleService roleService,
                       UserRoleService userRoleService) {
        this.userRepository = userRepository;
        this.userDtoConverter = userDtoConverter;
        this.roleService = roleService;
        this.userRoleService = userRoleService;
    }


    protected User findUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User could not found by id: " + id));
    }

    protected User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User could not found by username: " + username));
    }

    protected User findUserByUsernameAndPassword(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password)
                .orElseThrow(() -> new UserNotFoundException(
                        String.format("User could not found by username: (%s) and password", username)));
    }


    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(userDtoConverter::convert).collect(Collectors.toList());
    }

    public List<UserDto> getAllUsersByRoleId(Integer roleId) {
        List<User> users = userRepository.findAllByRoleId(roleId);
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

    public UserDto getUserByUsernameAndPassword(String username, String password) {
        User user = findUserByUsernameAndPassword(username, password);
        return userDtoConverter.convert(user);
    }


    public UserDto createUser(@NotNull CreateUserRequest createUserRequest) {
        Role role = roleService.findRoleById(createUserRequest.getRoleId());
        User user = new User(createUserRequest.getUsername(), createUserRequest.getPassword(),
                createUserRequest.getLogoUrl(), null, null, role);
        UserRoleDto userRole = userRoleService.createUserRole(user, role);
        if (createUserRequest.getRoleId() == UserTypes.ADMIN.getValue() ||
                createUserRequest.getRoleId() == UserTypes.INTERN.getValue() ||
                createUserRequest.getRoleId() == UserTypes.COMPANY.getValue() ||
                createUserRequest.getRoleId() == UserTypes.INSTITUTION.getValue()) {
            if (createUserRequest.getRoleId() == UserTypes.ADMIN.getValue()) {
                user.setSubUserType(UserTypes.ADMIN.toString());
            }
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
}
