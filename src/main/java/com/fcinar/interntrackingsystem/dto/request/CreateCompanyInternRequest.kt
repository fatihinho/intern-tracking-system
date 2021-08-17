package com.fcinar.interntrackingsystem.dto.request

import java.util.*

data class CreateCompanyInternRequest(
    val unitName: String,
    val companyId: UUID,
    val internId: UUID
)
