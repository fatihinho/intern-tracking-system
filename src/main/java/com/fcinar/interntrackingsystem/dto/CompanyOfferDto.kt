package com.fcinar.interntrackingsystem.dto

import com.fcinar.interntrackingsystem.model.Company
import com.fcinar.interntrackingsystem.model.Intern
import java.util.*

data class CompanyOfferDto(
    val id: UUID,
    val offerDate: Date,
    val offerMessage: String?,
    val isActive: Boolean,
    val isAccepted: Boolean,
    val isRejected: Boolean,
    val company: Company,
    val intern: Intern
)
