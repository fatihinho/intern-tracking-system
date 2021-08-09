package com.fcinar.interntrackingsystem.model

import java.util.*
import javax.persistence.*

@Entity
@Table(name = "CompanyInternSearch")
data class CompanyInternSearch(
    @Id
    @Column(name = "Id")
    val id: UUID,

    @Column(name = "DayOfInternship")
    val dayOfInternship: Int,

    @Column(name = "StartDate")
    val startDate: Date,

    @Column(name = "EndDate")
    val endDate: Date,

    @Column(name = "IsActive")
    val isActive: Boolean,

    @OneToOne(fetch = FetchType.LAZY, cascade = [CascadeType.ALL], optional = false)
    @JoinColumn(name = "CompanyId", nullable = false)
    val company: Company
) {
    constructor(dayOfInternship: Int, startDate: Date, endDate: Date, isActive: Boolean, company: Company) : this(
        id = UUID.randomUUID(),
        dayOfInternship = dayOfInternship,
        startDate = startDate,
        endDate = endDate,
        isActive = isActive,
        company = company
    )

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as CompanyInternSearch

        if (id != other.id) return false
        if (dayOfInternship != other.dayOfInternship) return false
        if (startDate != other.startDate) return false
        if (endDate != other.endDate) return false
        if (isActive != other.isActive) return false
        if (company != other.company) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + dayOfInternship
        result = 31 * result + startDate.hashCode()
        result = 31 * result + endDate.hashCode()
        result = 31 * result + isActive.hashCode()
        result = 31 * result + company.hashCode()
        return result
    }

    override fun toString(): String {
        return "CompanyInternSearch(id=$id, dayOfInternship=$dayOfInternship, " +
                "startDate=$startDate, endDate=$endDate, isActive=$isActive, company=$company)"
    }
}
