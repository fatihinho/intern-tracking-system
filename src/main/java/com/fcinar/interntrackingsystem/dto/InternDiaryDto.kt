package com.fcinar.interntrackingsystem.dto

import com.fcinar.interntrackingsystem.model.Intern
import java.util.*

data class InternDiaryDto(
    val id: UUID,
    val content: String,
    val dayOfInternship: Int,
    val updatedDate: Date?,
    val isAccepted: Boolean,
    val isRejected: Boolean,
    val intern: Intern
)
