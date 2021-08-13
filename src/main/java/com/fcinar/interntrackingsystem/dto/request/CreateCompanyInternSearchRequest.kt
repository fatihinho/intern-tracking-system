package com.fcinar.interntrackingsystem.dto.request

import java.util.*

data class CreateCompanyInternSearchRequest(
    val dayOfInternship: Int,
    val startDate: Date,
    val endDate: Date,
    val companyId: UUID
)
