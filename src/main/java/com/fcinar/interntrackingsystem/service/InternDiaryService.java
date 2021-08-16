package com.fcinar.interntrackingsystem.service;

import com.fcinar.interntrackingsystem.dto.InternDiaryDto;
import com.fcinar.interntrackingsystem.dto.converter.InternDiaryDtoConverter;
import com.fcinar.interntrackingsystem.dto.request.CreateInternDiaryRequest;
import com.fcinar.interntrackingsystem.dto.request.UpdateInternDiaryRequest;
import com.fcinar.interntrackingsystem.exception.InternDiaryNotFoundException;
import com.fcinar.interntrackingsystem.model.Intern;
import com.fcinar.interntrackingsystem.model.InternDiary;
import com.fcinar.interntrackingsystem.repository.IInternDiaryRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

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
        InternDiary internDiary = findInternDiaryById(id);
        String content = updateInternDiaryRequest.getContent() != null
                ? updateInternDiaryRequest.getContent() : internDiary.getContent();
        int dayOfInternShip = updateInternDiaryRequest.getDayOfInternship() != null
                ? updateInternDiaryRequest.getDayOfInternship() : internDiary.getDayOfInternship();
        boolean isAccepted = updateInternDiaryRequest.isAccepted() != null
                ? updateInternDiaryRequest.isAccepted() : internDiary.isAccepted();
        boolean isRejected = updateInternDiaryRequest.isRejected() != null
                ? updateInternDiaryRequest.isRejected() : internDiary.isRejected();
        internDiary.setContent(content);
        internDiary.setDayOfInternship(dayOfInternShip);
        internDiary.setUpdatedDate(updateInternDiaryRequest.getUpdatedDate());
        internDiary.setAccepted(isAccepted);
        internDiary.setRejected(isRejected);
        return internDiaryDtoConverter.convert(internDiaryRepository.save(internDiary));
    }
}
