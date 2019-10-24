package com.hippo.tracker.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A TagOnlyUUID.
 */
@Entity
@Table(name = "tag_only_uuid")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TagOnlyUUID implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 3)
    @Column(name = "label")
    private String label;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public TagOnlyUUID label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TagOnlyUUID)) {
            return false;
        }
        return id != null && id.equals(((TagOnlyUUID) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TagOnlyUUID{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            "}";
    }
}
