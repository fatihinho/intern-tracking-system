package com.fcinar.interntrackingsystem.dto.request

import java.util.*

data class CreateInstitutionRequest(
    val name: String,
    val email: String,
    val address: String,
    val city: String?,
    val region: String?,
    val postalCode: String?,
    val country: String?,
    val phone: String?,
    val userId: UUID
)
