package com.fcinar.interntrackingsystem.dto.request

import java.util.*

data class UpdateInternDiaryRequest(
    val content: String?,
    val dayOfInternship: Int?
)
