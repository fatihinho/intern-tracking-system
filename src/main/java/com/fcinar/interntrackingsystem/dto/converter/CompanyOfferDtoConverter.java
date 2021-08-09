package com.fcinar.interntrackingsystem.dto.converter;

import com.fcinar.interntrackingsystem.dto.CompanyOfferDto;
import com.fcinar.interntrackingsystem.model.CompanyOffer;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Component
public class CompanyOfferDtoConverter {
    public CompanyOfferDto convert(@NotNull CompanyOffer from) {
        return new CompanyOfferDto(from.getId(), from.getOfferDate(), from.isActive(),
                from.isAccepted(), from.isRejected(), from.getCompany(), from.getIntern());
    }
}
