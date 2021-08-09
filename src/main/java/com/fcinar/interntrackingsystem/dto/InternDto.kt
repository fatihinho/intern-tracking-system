package com.fcinar.interntrackingsystem.dto

import com.fcinar.interntrackingsystem.model.Company
import com.fcinar.interntrackingsystem.model.Institution
import java.util.*

data class InternDto(
    val id: UUID,
    val name: String,
    val surname: String,
    val birthDate: Date?,
    val identityNumber: Long,
    val phone: String?,
    val email: String,
    val cvUrl: ByteArray?,
    val company: Company,
    val institution: Institution
)
