package com.fcinar.interntrackingsystem;

import com.fcinar.interntrackingsystem.model.*;
import com.fcinar.interntrackingsystem.repository.*;
import com.fcinar.interntrackingsystem.service.RoleService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Date;

@SpringBootApplication
public class InternTrackingSystemApplication implements CommandLineRunner {
    private final IRoleRepository roleRepository;
    private final IUserRepository userRepository;
    private final IUserRoleRepository userRoleRepository;
    private final ICompanyRepository companyRepository;
    private final IInstitutionRepository institutionRepository;
    private final IInternRepository internRepository;
    private final RoleService roleService;

    public InternTrackingSystemApplication(IRoleRepository roleRepository,
                                           IUserRepository userRepository,
                                           IUserRoleRepository userRoleRepository,
                                           ICompanyRepository companyRepository,
                                           IInstitutionRepository institutionRepository,
                                           IInternRepository internRepository,
                                           RoleService roleService) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.companyRepository = companyRepository;
        this.institutionRepository = institutionRepository;
        this.internRepository = internRepository;
        this.roleService = roleService;
    }

    public static void main(String[] args) {
        SpringApplication.run(InternTrackingSystemApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        Date birthDate = Date.from(LocalDate.of(1998, 9, 11).atStartOfDay().toInstant(ZoneOffset.UTC));

        if (roleRepository.findAll().isEmpty()) {
            roleRepository.save(new Role("ADMIN"));
            roleRepository.save(new Role("INTERN"));
            roleRepository.save(new Role("COMPANY"));
            roleRepository.save(new Role("INSTITUTION"));
        }

        if (userRepository.findAll().isEmpty()) {
            User user1 = new User("admin", "123",
                    null, null, null, roleService.findRoleById(1));

            User user2 = new User("intern", "123",
                    null, null, null, roleService.findRoleById(2));

            User user3 = new User("company", "123",
                    null, null, null, roleService.findRoleById(3));

            User user4 = new User("institution", "123",
                    null, null, null, roleService.findRoleById(4));

            Company company = new Company(
                    "Türksat", "info@turksat.com.tr", "Ankara Teknokent Gölbaşı/Ankara",
                    "Ankara", "Gölbaşı", "06830", "Türkiye", "02121231212", user3);
            Institution institution = new Institution(
                    "Erciyes Üniversitesi", "erciyes@edu.tr", "Erciyes Üniversitesi Talas/Kayseri",
                    "Kayseri", "Talas", "38060", "Türkiye", "03523124568", user4);
            Intern intern = new Intern(
                    "Fatih", "Çınar", birthDate, 36895791198L, "05313579655",
                    "fcinar_38@hotmail.com", null, null, institution, user2);

            user1.setSubUserType(UserTypes.ADMIN.toString());
            user2.setSubUserId(intern.getId());
            user2.setSubUserType(UserTypes.INTERN.toString());
            user3.setSubUserId(company.getId());
            user3.setSubUserType(UserTypes.COMPANY.toString());
            user4.setSubUserId(institution.getId());
            user4.setSubUserType(UserTypes.INSTITUTION.toString());

            userRepository.save(user1);
            userRepository.save(user2);
            userRepository.save(user3);
            userRepository.save(user4);

            companyRepository.save(company);
            institutionRepository.save(institution);
            internRepository.save(intern);

            userRoleRepository.save(new UserRole(user1, roleService.findRoleById(1)));
            userRoleRepository.save(new UserRole(user2, roleService.findRoleById(2)));
            userRoleRepository.save(new UserRole(user3, roleService.findRoleById(3)));
            userRoleRepository.save(new UserRole(user4, roleService.findRoleById(4)));
        }
    }
}
