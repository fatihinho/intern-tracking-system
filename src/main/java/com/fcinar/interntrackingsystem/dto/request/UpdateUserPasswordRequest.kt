package com.fcinar.interntrackingsystem.dto.request

data class UpdateUserPasswordRequest(
    val password: String,
    val password2: String,
)
