package com.fcinar.interntrackingsystem.model

import java.util.*
import javax.persistence.*

@Entity
@Table(name = "Intern")
data class Intern(
    @Id
    @Column(name = "Id")
    val id: UUID,

    @Column(name = "Name", length = 30, nullable = false)
    var name: String,

    @Column(name = "Surname", length = 30, nullable = false)
    var surname: String,

    @Column(name = "BirthDate")
    val birthDate: Date?,

    @Column(name = "IdentityNumber", nullable = false)
    val identityNumber: Long,

    @Column(name = "Phone", length = 20)
    var phone: String?,

    @Column(name = "Email", length = 50, nullable = false)
    var email: String,

    @Column(name = "CvUrl")
    val cvUrl: ByteArray?,

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CompanyId")
    val company: Company?,

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "InstitutionId", nullable = false)
    val institution: Institution,

    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "UserId", nullable = false)
    val user: User
) {
    constructor(
        name: String,
        surname: String,
        birthDate: Date?,
        identityNumber: Long,
        phone: String?,
        email: String,
        cvUrl: ByteArray?,
        company: Company?,
        institution: Institution,
        user: User
    ) : this(
        id = UUID.randomUUID(),
        name = name,
        surname = surname,
        birthDate = birthDate,
        identityNumber = identityNumber,
        phone = phone,
        email = email,
        cvUrl = cvUrl,
        company = company,
        institution = institution,
        user = user
    )

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Intern

        if (id != other.id) return false
        if (name != other.name) return false
        if (surname != other.surname) return false
        if (birthDate != other.birthDate) return false
        if (identityNumber != other.identityNumber) return false
        if (phone != other.phone) return false
        if (email != other.email) return false
        if (!cvUrl.contentEquals(other.cvUrl)) return false
        if (company != other.company) return false
        if (institution != other.institution) return false
        if (user != other.user) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + name.hashCode()
        result = 31 * result + surname.hashCode()
        result = 31 * result + (birthDate?.hashCode() ?: 0)
        result = 31 * result + identityNumber.hashCode()
        result = 31 * result + (phone?.hashCode() ?: 0)
        result = 31 * result + email.hashCode()
        result = 31 * result + (cvUrl?.contentHashCode() ?: 0)
        result = 31 * result + (company?.hashCode() ?: 0)
        result = 31 * result + institution.hashCode()
        result = 31 * result + user.hashCode()
        return result
    }

    override fun toString(): String {
        return "Intern(id=$id, name=$name, surname=$surname, birthDate=$birthDate, identityNumber=$identityNumber, " +
                "phone=$phone, email=$email, cvUrl=${cvUrl?.contentToString()}, company=$company, " +
                "institution=$institution, user=$user)"
    }
}