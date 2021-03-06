package com.fcinar.interntrackingsystem.service;

import com.fcinar.interntrackingsystem.dto.InstitutionDto;
import com.fcinar.interntrackingsystem.dto.converter.InstitutionDtoConverter;
import com.fcinar.interntrackingsystem.dto.request.CreateInstitutionRequest;
import com.fcinar.interntrackingsystem.dto.request.UpdateUserProfileRequest;
import com.fcinar.interntrackingsystem.exception.InstitutionNotFoundException;
import com.fcinar.interntrackingsystem.model.Institution;
import com.fcinar.interntrackingsystem.model.User;
import com.fcinar.interntrackingsystem.model.UserTypes;
import com.fcinar.interntrackingsystem.repository.IInstitutionRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class InstitutionService {
    private final IInstitutionRepository institutionRepository;
    private final InstitutionDtoConverter institutionDtoConverter;
    private final UserService userService;

    public InstitutionService(IInstitutionRepository institutionRepository,
                              InstitutionDtoConverter institutionDtoConverter,
                              UserService userService) {
        this.institutionRepository = institutionRepository;
        this.institutionDtoConverter = institutionDtoConverter;
        this.userService = userService;
    }


    protected Institution findInstitutionById(UUID id) {
        return institutionRepository.findById(id)
                .orElseThrow(() -> new InstitutionNotFoundException("Institution could not found by id: " + id));
    }


    public List<InstitutionDto> getAllInstitutions() {
        List<Institution> institutions = institutionRepository.findAll();
        return institutions.stream().map(institutionDtoConverter::convert).collect(Collectors.toList());
    }

    public InstitutionDto getInstitutionById(UUID id) {
        Institution institution = findInstitutionById(id);
        return institutionDtoConverter.convert(institution);
    }


    public InstitutionDto createInstitution(@NotNull CreateInstitutionRequest createInstitutionRequest) {
        User user = userService.findUserById(createInstitutionRequest.getUserId());
        Institution institution = new Institution(
                createInstitutionRequest.getName(), createInstitutionRequest.getEmail(),
                createInstitutionRequest.getAddress(), createInstitutionRequest.getCity(),
                createInstitutionRequest.getRegion(), createInstitutionRequest.getPostalCode(),
                createInstitutionRequest.getCountry(), createInstitutionRequest.getPhone(), user);
        if (user.getRole().getId() == UserTypes.INSTITUTION.getValue()) {
            user.setSubUserId(institution.getId());
            user.setSubUserType(UserTypes.INSTITUTION.toString());
            return institutionDtoConverter.convert(institutionRepository.save(institution));
        } else {
            return institutionDtoConverter.convert(institution);
        }
    }


    public InstitutionDto updateInstitutionProfileById(UUID id,
                                                       UpdateUserProfileRequest updateUserProfileRequest) {
        User user = userService.findUserById(id);
        Institution institution = findInstitutionById(user.getSubUserId());
        if (user.getSubUserType().equals(UserTypes.INSTITUTION.toString())) {
            String name = updateUserProfileRequest.getName() != null
                    ? updateUserProfileRequest.getName() : institution.getName();
            String email = updateUserProfileRequest.getEmail() != null
                    ? updateUserProfileRequest.getEmail() : institution.getEmail();
            String phone = updateUserProfileRequest.getPhone() != null
                    ? updateUserProfileRequest.getPhone() : institution.getPhone();
            String address = updateUserProfileRequest.getAddress() != null
                    ? updateUserProfileRequest.getAddress() : institution.getAddress();
            String logoUrl = updateUserProfileRequest.getLogoUrl() != null
                    ? updateUserProfileRequest.getLogoUrl() : user.getLogoUrl();
            institution.setName(name);
            institution.setEmail(email);
            institution.setAddress(address);
            institution.setPhone(phone);
            user.setLogoUrl(logoUrl);
            return institutionDtoConverter.convert(institutionRepository.save(institution));
        } else {
            return institutionDtoConverter.convert(institution);
        }
    }
}