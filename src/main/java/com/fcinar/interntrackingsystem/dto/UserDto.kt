package com.fcinar.interntrackingsystem.dto

import com.fcinar.interntrackingsystem.model.Role
import java.util.*

data class UserDto(
    val id: UUID,
    val username: String,
    val password: String,
    val logoUrl: String?,
    val subUserType: String?,
    val subUserId: UUID?,
    val role: Role
)
