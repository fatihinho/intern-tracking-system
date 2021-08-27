package com.fcinar.interntrackingsystem.service;

import com.fcinar.interntrackingsystem.dto.InternDto;
import com.fcinar.interntrackingsystem.dto.converter.InternDtoConverter;
import com.fcinar.interntrackingsystem.dto.request.CreateInternRequest;
import com.fcinar.interntrackingsystem.dto.request.UpdateUserProfileRequest;
import com.fcinar.interntrackingsystem.exception.InternNotFoundException;
import com.fcinar.interntrackingsystem.model.*;
import com.fcinar.interntrackingsystem.repository.IInternRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class InternService {
    private final IInternRepository internRepository;
    private final InternDtoConverter internDtoConverter;
    private final UserService userService;
    private final InstitutionService institutionService;

    public InternService(IInternRepository internRepository,
                         InternDtoConverter internDtoConverter,
                         UserService userService,
                         InstitutionService institutionService) {
        this.internRepository = internRepository;
        this.internDtoConverter = internDtoConverter;
        this.userService = userService;
        this.institutionService = institutionService;
    }

    protected Intern findInternById(UUID id) {
        return internRepository.findById(id)
                .orElseThrow(() -> new InternNotFoundException("Intern could not found by id: " + id));
    }

    protected List<Intern> findInternByInstitutionId(UUID institutionId) {
        return internRepository.findAllByInstitutionId(institutionId);
    }

    public List<InternDto> getAllInterns() {
        List<Intern> interns = internRepository.findAll();
        return interns.stream().map(internDtoConverter::convert).collect(Collectors.toList());
    }

    public InternDto getInternById(UUID id) {
        Intern intern = findInternById(id);
        return internDtoConverter.convert(intern);
    }

    public InternDto createIntern(@NotNull CreateInternRequest createInternRequest) {
        User user = userService.findUserById(createInternRequest.getUserId());
        Institution institution = institutionService.findInstitutionById(createInternRequest.getInstitutionId());
        Intern intern = new Intern(
                createInternRequest.getName(), createInternRequest.getSurname(),
                createInternRequest.getBirthDate(), createInternRequest.getIdentityNumber(),
                createInternRequest.getPhone(), createInternRequest.getEmail(),
                createInternRequest.getCvUrl(), null, institution, user);
        if (user.getRole().getId() == UserTypes.INTERN.getValue()) {
            user.setSubUserId(intern.getId());
            user.setSubUserType(UserTypes.INTERN.toString());
            return internDtoConverter.convert(internRepository.save(intern));
        } else {
            return internDtoConverter.convert(intern);
        }
    }


    public InternDto updateInternProfileById(UUID id,
                                                   UpdateUserProfileRequest updateUserProfileRequest) {
        User user = userService.findUserById(id);
        Intern intern = findInternById(user.getSubUserId());
        if (user.getSubUserType().equals(UserTypes.INTERN.toString())) {
            String name = updateUserProfileRequest.getName() != null
                    ? updateUserProfileRequest.getName() : intern.getName();
            String surname = updateUserProfileRequest.getSurname() != null
                    ? updateUserProfileRequest.getSurname() : intern.getSurname();
            String email = updateUserProfileRequest.getEmail() != null
                    ? updateUserProfileRequest.getEmail() : intern.getEmail();
            String phone = updateUserProfileRequest.getPhone() != null
                    ? updateUserProfileRequest.getPhone() : intern.getPhone();
            String logoUrl = updateUserProfileRequest.getLogoUrl() != null
                    ? updateUserProfileRequest.getLogoUrl() : user.getLogoUrl();
            intern.setName(name);
            intern.setSurname(surname);
            intern.setEmail(email);
            intern.setPhone(phone);
            user.setLogoUrl(logoUrl);
            return internDtoConverter.convert(internRepository.save(intern));
        } else {
            return internDtoConverter.convert(intern);
        }
    }
}