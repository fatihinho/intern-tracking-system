package com.fcinar.interntrackingsystem.dto.request

import java.util.*

data class CreateInternRequest(
    val name: String,
    val surname: String,
    val birthDate: Date?,
    val identityNumber: Long,
    val phone: String?,
    val email: String,
    val cvUrl: ByteArray?,
    val companyId: UUID?,
    val institutionId: UUID,
    val userId: UUID
)
