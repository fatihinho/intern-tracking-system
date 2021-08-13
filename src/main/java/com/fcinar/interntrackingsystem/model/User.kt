package com.fcinar.interntrackingsystem.model

import java.util.*
import javax.persistence.*

enum class UserTypes(val value: Int) {
    ADMIN(1), INTERN(2), COMPANY(3), INSTITUTION(4)
}

@Entity
@Table(name = "Users")
data class User(
    @Id
    @Column(name = "Id")
    val id: UUID,

    @Column(name = "Username", length = 20, nullable = false)
    val username: String,

    @Column(name = "Password", length = 20, nullable = false)
    var password: String,

    @Column(name = "LogoUrl", length = 50)
    var logoUrl: String?,

    @Column(name = "SubUserType", length = 20)
    var subUserType: String?,

    @Column(name = "SubUserId")
    var subUserId: UUID?,

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "RoleId", nullable = false)
    val role: Role

) {
    constructor(
        username: String,
        password: String,
        logoUrl: String?,
        subUserType: String?,
        subUserId: UUID?,
        role: Role
    ) : this(
        id = UUID.randomUUID(),
        username = username,
        password = password,
        logoUrl = logoUrl,
        subUserType = subUserType,
        subUserId = subUserId,
        role = role
    )

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as User

        if (id != other.id) return false
        if (username != other.username) return false
        if (password != other.password) return false
        if (logoUrl != other.logoUrl) return false
        if (subUserType != other.subUserType) return false
        if (subUserId != other.subUserId) return false
        if (role != other.role) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + username.hashCode()
        result = 31 * result + password.hashCode()
        result = 31 * result + (logoUrl?.hashCode() ?: 0)
        result = 31 * result + (subUserType?.hashCode() ?: 0)
        result = 31 * result + (subUserId?.hashCode() ?: 0)
        result = 31 * result + role.hashCode()
        return result
    }

    override fun toString(): String {
        return "User(id=$id, username='$username', password='$password', logoUrl=$logoUrl, " +
                "subUserType=$subUserType, subUserId=$subUserId, role=$role)"
    }
}
