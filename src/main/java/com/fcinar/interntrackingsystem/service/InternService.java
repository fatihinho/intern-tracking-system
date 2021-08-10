package com.fcinar.interntrackingsystem.service;

import com.fcinar.interntrackingsystem.dto.InternDto;
import com.fcinar.interntrackingsystem.dto.converter.InternDtoConverter;
import com.fcinar.interntrackingsystem.model.Intern;
import com.fcinar.interntrackingsystem.repository.IInternRepository;
import org.springframework.stereotype.Service;

@Service
public class InternService {
    private final IInternRepository internRepository;
    private final InternDtoConverter internDtoConverter;

    public InternService(IInternRepository internRepository, InternDtoConverter internDtoConverter) {
        this.internRepository = internRepository;
        this.internDtoConverter = internDtoConverter;
    }

    public InternDto createIntern() {
        Intern intern = new Intern();
        return internDtoConverter.convert(internRepository.save(intern));
    }
}
