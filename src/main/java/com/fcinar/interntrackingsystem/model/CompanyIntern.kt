package com.fcinar.interntrackingsystem.model

import java.util.*
import javax.persistence.*

@Entity
@Table(name = "CompanyIntern")
data class CompanyIntern(
    @Id
    @Column(name = "Id")
    val id: UUID,

    @Column(name = "UnitName", length = 30, nullable = false)
    val unitName: String,

    @Column(name = "DayOfInternship", nullable = false)
    val dayOfInternship: Int,

    @Column(name = "StartDate", nullable = false)
    val startDate: Date,

    @Column(name = "EndDate", nullable = false)
    val endDate: Date,

    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "CompanyId", nullable = false)
    val company: Company,

    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "InternId", nullable = false)
    val intern: Intern
) {
    constructor(
        unitName: String,
        dayOfInternship: Int,
        startDate: Date,
        endDate: Date,
        company: Company,
        intern: Intern
    ) : this(
        id = UUID.randomUUID(),
        unitName = unitName,
        dayOfInternship = dayOfInternship,
        startDate = startDate,
        endDate = endDate,
        company = company,
        intern = intern
    )

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as CompanyIntern

        if (id != other.id) return false
        if (unitName != other.unitName) return false
        if (dayOfInternship != other.dayOfInternship) return false
        if (startDate != other.startDate) return false
        if (endDate != other.endDate) return false
        if (company != other.company) return false
        if (intern != other.intern) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + unitName.hashCode()
        result = 31 * result + dayOfInternship
        result = 31 * result + startDate.hashCode()
        result = 31 * result + endDate.hashCode()
        result = 31 * result + company.hashCode()
        result = 31 * result + intern.hashCode()
        return result
    }

    override fun toString(): String {
        return "CompanyIntern(id=$id, unitName='$unitName', dayOfInternship=$dayOfInternship, " +
                "startDate=$startDate, endDate=$endDate, company=$company, intern=$intern)"
    }
}
