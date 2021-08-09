package com.fcinar.interntrackingsystem.model

import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "Company")
data class Company(
    @Id
    @Column(name = "Id")
    val id: UUID,

    @Column(name = "Name", length = 30)
    val name: String,

    @Column(name = "Email", length = 20)
    val email: String,

    @Column(name = "Address", length = 50)
    val address: String,

    @Column(name = "City", length = 20)
    val city: String?,

    @Column(name = "Region", length = 20)
    val region: String?,

    @Column(name = "PostalCode", length = 10)
    val postalCode: String?,

    @Column(name = "Country", length = 20)
    val country: String?,

    @Column(name = "Phone", length = 20)
    val phone: String?
) {
    constructor(
        name: String,
        email: String,
        address: String,
        city: String,
        region: String,
        postalCode: String,
        country: String,
        phone: String
    ) : this(
        id = UUID.randomUUID(),
        name = name,
        email = email,
        address = address,
        city = city,
        region = region,
        postalCode = postalCode,
        country = country,
        phone = phone
    )

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Company

        if (id != other.id) return false
        if (name != other.name) return false
        if (email != other.email) return false
        if (address != other.address) return false
        if (city != other.city) return false
        if (region != other.region) return false
        if (postalCode != other.postalCode) return false
        if (country != other.country) return false
        if (phone != other.phone) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + name.hashCode()
        result = 31 * result + email.hashCode()
        result = 31 * result + address.hashCode()
        result = 31 * result + (city?.hashCode() ?: 0)
        result = 31 * result + (region?.hashCode() ?: 0)
        result = 31 * result + (postalCode?.hashCode() ?: 0)
        result = 31 * result + (country?.hashCode() ?: 0)
        result = 31 * result + (phone?.hashCode() ?: 0)
        return result
    }

    override fun toString(): String {
        return "Company(id=$id, name='$name', email='$email', address='$address', city=$city, " +
                "region=$region, postalCode=$postalCode, country=$country, phone=$phone)"
    }
}
