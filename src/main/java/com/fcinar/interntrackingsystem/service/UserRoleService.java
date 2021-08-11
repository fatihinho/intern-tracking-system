package com.fcinar.interntrackingsystem.service;

import com.fcinar.interntrackingsystem.dto.UserRoleDto;
import com.fcinar.interntrackingsystem.dto.converter.UserRoleDtoConverter;
import com.fcinar.interntrackingsystem.exception.UserRoleNotFoundException;
import com.fcinar.interntrackingsystem.model.Role;
import com.fcinar.interntrackingsystem.model.User;
import com.fcinar.interntrackingsystem.model.UserRole;
import com.fcinar.interntrackingsystem.repository.IUserRoleRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserRoleService {
    private final IUserRoleRepository userRoleRepository;
    private final UserRoleDtoConverter userRoleDtoConverter;

    public UserRoleService(IUserRoleRepository userRoleRepository,
                           UserRoleDtoConverter userRoleDtoConverter) {
        this.userRoleRepository = userRoleRepository;
        this.userRoleDtoConverter = userRoleDtoConverter;
    }


    protected UserRole findUserRoleById(UUID id) {
        return userRoleRepository.findById(id)
                .orElseThrow(() -> new UserRoleNotFoundException("UserRole could not found by id: " + id));
    }


    public UserRoleDto createUserRole(User user, Role role) {
        UserRole userRole = new UserRole(user, role);
        return userRoleDtoConverter.convert(userRoleRepository.save(userRole));
    }
}
