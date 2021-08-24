package com.fcinar.interntrackingsystem.dto.request

import java.util.*

data class UpdateUnitNameRequest(
    val id: UUID,
    val unitName: String
)
