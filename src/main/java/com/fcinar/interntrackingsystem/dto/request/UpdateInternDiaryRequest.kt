package com.fcinar.interntrackingsystem.dto.request

import java.util.*

data class UpdateInternDiaryRequest(
    val content: String?,
    val dayOfInternship: Int?,
    val updatedDate: Date,
    val isAccepted: Boolean?,
    val isRejected: Boolean?,
)
