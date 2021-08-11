package com.fcinar.interntrackingsystem.dto.request

data class CreateUserRequest(
    val username: String,
    val password: String,
    val logoUrl: String?,
    val roleId: Int
)
