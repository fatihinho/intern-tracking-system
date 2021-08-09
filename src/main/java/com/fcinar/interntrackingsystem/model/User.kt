package com.fcinar.interntrackingsystem.model

import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "Users")
data class User(
    @Id
    @Column(name = "Id")
    val id: UUID,

    @Column(name = "Username", length = 20)
    val username: String,

    @Column(name = "Password", length = 20)
    val password: String,

    @Column(name = "Type", length = 10)
    val type: String,

    @Column(name = "LogoUrl", length = 50)
    val logoUrl: String?
) {
    constructor(username: String, password: String, type: String, logoUrl: String?) : this(
        id = UUID.randomUUID(),
        username = username,
        password = password,
        type = type,
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
        if (logoUrl != other.logoUrl) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + username.hashCode()
        result = 31 * result + password.hashCode()
        result = 31 * result + type.hashCode()
        result = 31 * result + (logoUrl?.hashCode() ?: 0)
        return result
    }

    override fun toString(): String {
        return "User(id=$id, username='$username', password='$password', type='$type', logoUrl=$logoUrl)"
    }
}
