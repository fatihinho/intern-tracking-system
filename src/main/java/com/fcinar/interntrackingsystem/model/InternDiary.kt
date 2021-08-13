package com.fcinar.interntrackingsystem.model

import java.util.*
import javax.persistence.*

@Entity
@Table(name = "InternDiary")
data class InternDiary(
    @Id
    @Column(name = "Id")
    val id: UUID,

    @Column(name = "Content", length = 300, nullable = false)
    val content: String,

    @Column(name = "UpdatedDate")
    val updatedDate: Date?,

    @Column(name = "IsAccepted", nullable = false)
    val isAccepted: Boolean,

    @Column(name = "IsRejected", nullable = false)
    val isRejected: Boolean,

    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "InternId", unique = true, nullable = false)
    val intern: Intern
) {
    constructor(content: String, updatedDate: Date?, isAccepted: Boolean, isRejected: Boolean, intern: Intern) : this(
        id = UUID.randomUUID(),
        content = content,
        updatedDate = updatedDate,
        isAccepted = isAccepted,
        isRejected = isRejected,
        intern = intern
    )

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as InternDiary

        if (id != other.id) return false
        if (content != other.content) return false
        if (updatedDate != other.updatedDate) return false
        if (isAccepted != other.isAccepted) return false
        if (isRejected != other.isRejected) return false
        if (intern != other.intern) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + content.hashCode()
        result = 31 * result + (updatedDate?.hashCode() ?: 0)
        result = 31 * result + isAccepted.hashCode()
        result = 31 * result + isRejected.hashCode()
        result = 31 * result + intern.hashCode()
        return result
    }

    override fun toString(): String {
        return "InternDiary(id=$id, content='$content', updatedDate=$updatedDate, " +
                "isAccepted=$isAccepted, isRejected=$isRejected, intern=$intern)"
    }
}
