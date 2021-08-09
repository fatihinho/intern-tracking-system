package com.fcinar.interntrackingsystem.dto

import com.fcinar.interntrackingsystem.model.Company
import java.util.*

data class CompanyInternSearchDto(
    val id: UUID,
    val dayOfInternship: Int,
    val startDate: Date,
    val endDate: Date,
    val isActive: Boolean,
    val company: Company
)
