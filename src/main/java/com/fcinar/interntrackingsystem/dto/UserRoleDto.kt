package com.fcinar.interntrackingsystem.dto

import com.fcinar.interntrackingsystem.model.Role
import com.fcinar.interntrackingsystem.model.User
import java.util.*

data class UserRoleDto(
    val id: UUID,
    val user: User,
    val role: Role
)
