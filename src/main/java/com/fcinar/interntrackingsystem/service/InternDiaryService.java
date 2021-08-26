package com.fcinar.interntrackingsystem.service;

import com.fcinar.interntrackingsystem.dto.CompanyOfferDto;
import com.fcinar.interntrackingsystem.dto.InternDiaryDto;
import com.fcinar.interntrackingsystem.dto.converter.InternDiaryDtoConverter;
import com.fcinar.interntrackingsystem.dto.request.CreateInternDiaryRequest;
import com.fcinar.interntrackingsystem.dto.request.UpdateInternDiaryRequest;
import com.fcinar.interntrackingsystem.exception.InternDiaryNotFoundException;
import com.fcinar.interntrackingsystem.model.CompanyOffer;
import com.fcinar.interntrackingsystem.model.Intern;
import com.fcinar.interntrackingsystem.model.InternDiary;
import com.fcinar.interntrackingsystem.repository.IInternDiaryRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class InternDiaryService {
    private final IInternDiaryRepository internDiaryRepository;
    private final InternDiaryDtoConverter internDiaryDtoConverter;
    private final InternService internService;

    public InternDiaryService(IInternDiaryRepository internDiaryRepository,
                              InternDiaryDtoConverter internDiaryDtoConverter,
                              InternService internService) {
        this.internDiaryRepository = internDiaryRepository;
        this.internDiaryDtoConverter = internDiaryDtoConverter;
        this.internService = internService;
    }


    private InternDiary findInternDiaryById(UUID id) {
        return internDiaryRepository.findById(id)
                .orElseThrow(() -> new InternDiaryNotFoundException("Intern Diary could not found by id: " + id));
    }

    private List<InternDiary> findAllInternDiariesByInternId(UUID internId) {
        return internDiaryRepository.findAllByInternId(internId);
    }


    public List<InternDiaryDto> getAllInternDiaries() {
        List<InternDiary> internDiaries = internDiaryRepository.findAll();
        return internDiaries.stream().map(internDiaryDtoConverter::convert).collect(Collectors.toList());
    }

    public List<InternDiaryDto> getAllInternDiariesByInstitutionId(UUID institutionId) {
        List<Intern> interns = internService.findInternByInstitutionId(institutionId);
        List<UUID> internIds = new ArrayList<>();
        interns.forEach(intern -> internIds.add(intern.getId()));
        List<InternDiary> internDiaries = new ArrayList<>();
        internIds.forEach(internId -> internDiaries.addAll(internDiaryRepository.findAllByInternId(internId)));
        return internDiaries.stream().map(internDiaryDtoConverter::convert).collect(Collectors.toList());
    }

    public List<InternDiaryDto> getAllInternDiariesByInternId(UUID internId) {
        List<InternDiary> internDiaries = findAllInternDiariesByInternId(internId);
        return internDiaries.stream().map(internDiaryDtoConverter::convert).collect(Collectors.toList());
    }

    public InternDiaryDto getInternDiaryById(UUID id) {
        InternDiary internDiary = findInternDiaryById(id);
        return internDiaryDtoConverter.convert(internDiary);
    }


    public InternDiaryDto createInternDiary(UUID internId, @NotNull CreateInternDiaryRequest createInternDiaryRequest) {
        Intern intern = internService.findInternById(internId);
        InternDiary internDiary = new InternDiary(
                createInternDiaryRequest.getContent(),
                createInternDiaryRequest.getDayOfInternship(),
                null, false, false, intern);
        return internDiaryDtoConverter.convert(internDiaryRepository.save(internDiary));
    }


    public InternDiaryDto updateInternDiaryById(UUID id,
                                                @NotNull UpdateInternDiaryRequest updateInternDiaryRequest) {
        Date dateNow = Date.from(LocalDate.now().atStartOfDay().toInstant(ZoneOffset.ofHours(3)));
        InternDiary internDiary = findInternDiaryById(id);
        String content = updateInternDiaryRequest.getContent() != null
                ? updateInternDiaryRequest.getContent() : internDiary.getContent();
        int dayOfInternShip = updateInternDiaryRequest.getDayOfInternship() != null
                ? updateInternDiaryRequest.getDayOfInternship() : internDiary.getDayOfInternship();
        internDiary.setContent(content);
        internDiary.setDayOfInternship(dayOfInternShip);
        internDiary.setUpdatedDate(dateNow);
        return internDiaryDtoConverter.convert(internDiaryRepository.save(internDiary));
    }


    public InternDiaryDto acceptInternDiaryById(UUID id) {
        InternDiary internDiary = findInternDiaryById(id);
        internDiary.setAccepted(true);
        internDiary.setRejected(false);
        return internDiaryDtoConverter.convert(internDiaryRepository.save(internDiary));
    }

    public InternDiaryDto rejectInternDiaryById(UUID id) {
        InternDiary internDiary = findInternDiaryById(id);
        internDiary.setRejected(true);
        internDiary.setAccepted(false);
        return internDiaryDtoConverter.convert(internDiaryRepository.save(internDiary));
    }
}