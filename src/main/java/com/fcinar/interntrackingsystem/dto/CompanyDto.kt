package com.fcinar.interntrackingsystem.dto

import com.fcinar.interntrackingsystem.model.User
import java.util.*

data class CompanyDto(
    val id: UUID,
    val name: String,
    val email: String,
    val address: String,
    val city: String?,
    val region: String?,
    val postalCode: String?,
    val country: String?,
    val phone: String?,
    val user: User
)