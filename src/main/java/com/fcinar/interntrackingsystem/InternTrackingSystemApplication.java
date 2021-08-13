package com.fcinar.interntrackingsystem;

import com.fcinar.interntrackingsystem.model.Role;
import com.fcinar.interntrackingsystem.model.User;
import com.fcinar.interntrackingsystem.model.UserRole;
import com.fcinar.interntrackingsystem.repository.IRoleRepository;
import com.fcinar.interntrackingsystem.repository.IUserRepository;
import com.fcinar.interntrackingsystem.repository.IUserRoleRepository;
import com.fcinar.interntrackingsystem.service.RoleService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InternTrackingSystemApplication implements CommandLineRunner {
    private final IRoleRepository roleRepository;
    private final IUserRepository userRepository;
    private final IUserRoleRepository userRoleRepository;
    private final RoleService roleService;

    public InternTrackingSystemApplication(IRoleRepository roleRepository,
                                           IUserRepository userRepository,
                                           IUserRoleRepository userRoleRepository,
                                           RoleService roleService) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.roleService = roleService;
    }

    public static void main(String[] args) {
        SpringApplication.run(InternTrackingSystemApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.findAll().isEmpty()) {
            roleRepository.save(new Role("ADMIN"));
            roleRepository.save(new Role("INTERN"));
            roleRepository.save(new Role("COMPANY"));
            roleRepository.save(new Role("INSTITUTION"));
        }

        if (userRepository.findAll().isEmpty()) {
            User user1 = userRepository.save(new User("admin", "123",
                    null, null, null, roleService.findRoleById(1)));
            User user2 = userRepository.save(new User("intern", "123",
                    null, null, null, roleService.findRoleById(2)));
            User user3 = userRepository.save(new User("company", "123",
                    null, null, null, roleService.findRoleById(3)));
            User user4 = userRepository.save(new User("institution", "123",
                    null, null, null, roleService.findRoleById(4)));
            userRoleRepository.save(new UserRole(user1, roleService.findRoleById(1)));
            userRoleRepository.save(new UserRole(user2, roleService.findRoleById(2)));
            userRoleRepository.save(new UserRole(user3, roleService.findRoleById(3)));
            userRoleRepository.save(new UserRole(user4, roleService.findRoleById(4)));
        }
    }
}
