package com.fcinar.interntrackingsystem.dto.request

data class CreateUserRequest(
    val username: String,
    val password: String,
    val type: String,
    val logoUrl: String?
)
