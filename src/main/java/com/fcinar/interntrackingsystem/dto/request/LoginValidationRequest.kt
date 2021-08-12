package com.fcinar.interntrackingsystem.dto.request

data class LoginValidationRequest(
    val username: String,
    val password: String,
    val roleType: Int
)
