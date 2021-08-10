package com.fcinar.interntrackingsystem.dto.request

data class UpdateUserProfileRequest(
    val name: String?,
    val surname: String?,
    val email: String?,
    val phone: String?,
    val address: String?,
    val logoUrl: String?
)
