package com.fcinar.interntrackingsystem.dto.converter;

import com.fcinar.interntrackingsystem.dto.InternDiaryDto;
import com.fcinar.interntrackingsystem.model.InternDiary;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Component
public class InternDiaryDtoConverter {
    public InternDiaryDto convert(@NotNull InternDiary from) {
        return new InternDiaryDto(from.getId(), from.getContent(), from.getDayOfInternship(),
                from.getUpdatedDate(), from.isAccepted(), from.isRejected(), from.getIntern());
    }
}
