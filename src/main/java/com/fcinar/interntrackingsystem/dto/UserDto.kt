package com.fcinar.interntrackingsystem.dto

import java.util.*

data class UserDto(
    val id: UUID,
    val username: String,
    val password: String,
    val type: String,
    val logoUrl: String?
)
