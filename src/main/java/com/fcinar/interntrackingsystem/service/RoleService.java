package com.fcinar.interntrackingsystem.service;

import com.fcinar.interntrackingsystem.exception.RoleNotFoundException;
import com.fcinar.interntrackingsystem.model.Role;
import com.fcinar.interntrackingsystem.repository.IRoleRepository;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    private final IRoleRepository roleRepository;

    public RoleService(IRoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }


    protected Role findRoleById(int id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new RoleNotFoundException("Role could not found by id: " + id));
    }
}
