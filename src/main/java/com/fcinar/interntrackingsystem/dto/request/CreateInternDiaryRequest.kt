package com.fcinar.interntrackingsystem.dto.request

data class CreateInternDiaryRequest(
    val content: String,
    val dayOfInternship: Int
)
