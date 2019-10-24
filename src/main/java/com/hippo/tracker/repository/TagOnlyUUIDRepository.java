package com.hippo.tracker.repository;
import com.hippo.tracker.domain.TagOnlyUUID;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TagOnlyUUID entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TagOnlyUUIDRepository extends JpaRepository<TagOnlyUUID, Long> {

}
