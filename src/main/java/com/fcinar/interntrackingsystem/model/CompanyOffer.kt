package com.fcinar.interntrackingsystem.model

import java.util.*
import javax.persistence.*

@Entity
@Table(name = "CompanyOffer")
data class CompanyOffer(
    @Id
    @Column(name = "Id")
    val id: UUID,

    @Column(name = "OfferDate", nullable = false)
    val offerDate: Date,

    @Column(name = "OfferMessage", length = 300)
    val offerMessage: String?,

    @Column(name = "IsActive", nullable = false)
    var isActive: Boolean,

    @Column(name = "IsAccepted", nullable = false)
    var isAccepted: Boolean,

    @Column(name = "IsRejected", nullable = false)
    var isRejected: Boolean,

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "CompanyId", nullable = false)
    val company: Company,

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "InternId", nullable = false)
    val intern: Intern
) {
    constructor(
        offerDate: Date,
        offerMessage: String?,
        isActive: Boolean,
        isAccepted: Boolean,
        isRejected: Boolean,
        company: Company,
        intern: Intern
    ) : this(
        id = UUID.randomUUID(),
        offerDate = offerDate,
        offerMessage = offerMessage,
        isActive = isActive,
        isAccepted = isAccepted,
        isRejected = isRejected,
        company = company,
        intern = intern
    )

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as CompanyOffer

        if (id != other.id) return false
        if (offerDate != other.offerDate) return false
        if (offerMessage != other.offerMessage) return false
        if (isActive != other.isActive) return false
        if (isAccepted != other.isAccepted) return false
        if (isRejected != other.isRejected) return false
        if (company != other.company) return false
        if (intern != other.intern) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + offerDate.hashCode()
        result = 31 * result + (offerMessage?.hashCode() ?: 0)
        result = 31 * result + isActive.hashCode()
        result = 31 * result + isAccepted.hashCode()
        result = 31 * result + isRejected.hashCode()
        result = 31 * result + company.hashCode()
        result = 31 * result + intern.hashCode()
        return result
    }

    override fun toString(): String {
        return "CompanyOffer(id=$id, offerDate=$offerDate, offerMessage=$offerMessage, isActive=$isActive, " +
                "isAccepted=$isAccepted, isRejected=$isRejected, company=$company, intern=$intern)"
    }
}