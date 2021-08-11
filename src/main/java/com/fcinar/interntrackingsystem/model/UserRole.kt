package com.fcinar.interntrackingsystem.model

import java.util.*
import javax.persistence.*

@Entity
@Table(name = "UserRole")
data class UserRole(
    @Id
    @Column(name = "id")
    val id: UUID,

    @ManyToOne(fetch = FetchType.LAZY, cascade = [CascadeType.ALL], optional = false)
    @JoinColumn(name = "UserId", nullable = false)
    val user: User,

    @ManyToOne(fetch = FetchType.LAZY, cascade = [CascadeType.ALL], optional = false)
    @JoinColumn(name = "RoleId", nullable = false)
    val role: Role
) {
    constructor(user: User, role: Role) : this(
        id = UUID.randomUUID(),
        user = user,
        role = role
    )

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as UserRole

        if (id != other.id) return false
        if (user != other.user) return false
        if (role != other.role) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + user.hashCode()
        result = 31 * result + role.hashCode()
        return result
    }

    override fun toString(): String {
        return "UserRole(id=$id, user=$user, role=$role)"
    }
}
