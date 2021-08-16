package com.fcinar.interntrackingsystem.dto.request

import java.util.*

data class CreateCompanyOfferRequest(
    val offerMessage: String,
    val internId: UUID,
    val companyId: UUID
)
