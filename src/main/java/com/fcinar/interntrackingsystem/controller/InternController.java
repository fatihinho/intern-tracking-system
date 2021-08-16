package com.fcinar.interntrackingsystem.controller;

import com.fcinar.interntrackingsystem.dto.InternDto;
import com.fcinar.interntrackingsystem.dto.request.CreateInternRequest;
import com.fcinar.interntrackingsystem.service.InternService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class InternController {
    private final InternService internService;

    public InternController(InternService internService) {
        this.internService = internService;
    }


    @GetMapping("/interns")
    public ResponseEntity<List<InternDto>> getAllInterns() {
        try {
            List<InternDto> interns = internService.getAllInterns();
            if (interns.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(interns, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/interns/{id}")
    public ResponseEntity<InternDto> getInternById(@PathVariable UUID id) {
        try {
            InternDto intern = internService.getInternById(id);
            return new ResponseEntity<>(intern, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/interns")
    public ResponseEntity<InternDto> createIntern(@RequestBody CreateInternRequest createInternRequest) {
        try {
            InternDto intern = internService.createIntern(createInternRequest);
            if (intern.getUser().getSubUserId() == null) {
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
            return new ResponseEntity<>(intern, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}