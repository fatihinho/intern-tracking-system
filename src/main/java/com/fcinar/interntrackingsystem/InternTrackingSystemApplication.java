package com.fcinar.interntrackingsystem;

import com.fcinar.interntrackingsystem.model.Role;
import com.fcinar.interntrackingsystem.repository.IRoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InternTrackingSystemApplication implements CommandLineRunner {
    private final IRoleRepository roleRepository;

    public InternTrackingSystemApplication(IRoleRepository roleRepository) {
        this.roleRepository = roleRepository;
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
    }
}
