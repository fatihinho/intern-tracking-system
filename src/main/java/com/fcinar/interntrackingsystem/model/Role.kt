package com.fcinar.interntrackingsystem.model

import javax.persistence.*

@Entity
@Table(name = "Role")
data class Role(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Id")
    val id: Int?,

    @Column(name = "RoleName", length = 20, nullable = false)
    val roleName: String,
) {
    constructor(roleName: String) : this(
        id = null,
        roleName = roleName
    )

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Role

        if (id != other.id) return false
        if (roleName != other.roleName) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id ?: 0
        result = 31 * result + roleName.hashCode()
        return result
    }

    override fun toString(): String {
        return "Role(id=$id, roleName='$roleName')"
    }
}
