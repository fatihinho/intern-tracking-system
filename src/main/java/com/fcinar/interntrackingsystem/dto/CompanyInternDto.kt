package com.fcinar.interntrackingsystem.dto

import com.fcinar.interntrackingsystem.model.Company
import com.fcinar.interntrackingsystem.model.Intern
import java.util.*

data class CompanyInternDto(
    val id: UUID,
    val unitName: String?,
    val dayOfInternship: Int,
    val startDate: Date,
    val endDate: Date,
    val company: Company,
    val intern: Intern
)
