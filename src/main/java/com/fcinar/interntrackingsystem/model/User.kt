package com.fcinar.interntrackingsystem.model

import java.util.*
import javax.persistence.*

enum class UserTypes {
    ADMIN, INTERN, COMPANY, INSTITUTION
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

    @Column(name = "Type", length = 20, nullable = false)
    val type: String,

    @Column(name = "TypeId")
    var typeId: UUID?,

    @Column(name = "LogoUrl", length = 50)
    var logoUrl: String?

) {
    constructor(username: String, password: String, type: String, typeId: UUID?, logoUrl: String?) : this(
        id = UUID.randomUUID(),
        username = username,
        password = password,
        type = type,
        typeId = typeId,
        logoUrl = logoUrl
    )

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as User

        if (id != other.id) return false
        if (username != other.username) return false
        if (password != other.password) return false
        if (type != other.type) return false
        if (typeId != other.typeId) return false
        if (logoUrl != other.logoUrl) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + username.hashCode()
        result = 31 * result + password.hashCode()
        result = 31 * result + type.hashCode()
        result = 31 * result + (typeId?.hashCode() ?: 0)
        result = 31 * result + (logoUrl?.hashCode() ?: 0)
        return result
    }

    override fun toString(): String {
        return "User(id=$id, username='$username', password='$password', " +
                "type='$type', typeId=$typeId, logoUrl=$logoUrl)"
    }
}
