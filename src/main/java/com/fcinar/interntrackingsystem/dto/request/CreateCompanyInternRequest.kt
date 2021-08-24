package com.fcinar.interntrackingsystem.dto.request

import java.util.*

data class CreateCompanyInternRequest(
    val companyId: UUID,
    val internId: UUID
)
