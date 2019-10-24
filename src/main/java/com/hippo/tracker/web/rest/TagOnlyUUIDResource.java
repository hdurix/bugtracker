package com.hippo.tracker.web.rest;

import com.hippo.tracker.domain.TagOnlyUUID;
import com.hippo.tracker.repository.TagOnlyUUIDRepository;
import com.hippo.tracker.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.hippo.tracker.domain.TagOnlyUUID}.
 */
@RestController
@RequestMapping("/api")
public class TagOnlyUUIDResource {

    private final Logger log = LoggerFactory.getLogger(TagOnlyUUIDResource.class);

    private static final String ENTITY_NAME = "tagOnlyUUID";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TagOnlyUUIDRepository tagOnlyUUIDRepository;

    public TagOnlyUUIDResource(TagOnlyUUIDRepository tagOnlyUUIDRepository) {
        this.tagOnlyUUIDRepository = tagOnlyUUIDRepository;
    }

    /**
     * {@code POST  /tag-only-uuids} : Create a new tagOnlyUUID.
     *
     * @param tagOnlyUUID the tagOnlyUUID to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tagOnlyUUID, or with status {@code 400 (Bad Request)} if the tagOnlyUUID has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tag-only-uuids")
    public ResponseEntity<TagOnlyUUID> createTagOnlyUUID(@Valid @RequestBody TagOnlyUUID tagOnlyUUID) throws URISyntaxException {
        log.debug("REST request to save TagOnlyUUID : {}", tagOnlyUUID);
        if (tagOnlyUUID.getId() != null) {
            throw new BadRequestAlertException("A new tagOnlyUUID cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TagOnlyUUID result = tagOnlyUUIDRepository.save(tagOnlyUUID);
        return ResponseEntity.created(new URI("/api/tag-only-uuids/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tag-only-uuids} : Updates an existing tagOnlyUUID.
     *
     * @param tagOnlyUUID the tagOnlyUUID to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tagOnlyUUID,
     * or with status {@code 400 (Bad Request)} if the tagOnlyUUID is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tagOnlyUUID couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tag-only-uuids")
    public ResponseEntity<TagOnlyUUID> updateTagOnlyUUID(@Valid @RequestBody TagOnlyUUID tagOnlyUUID) throws URISyntaxException {
        log.debug("REST request to update TagOnlyUUID : {}", tagOnlyUUID);
        if (tagOnlyUUID.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TagOnlyUUID result = tagOnlyUUIDRepository.save(tagOnlyUUID);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tagOnlyUUID.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tag-only-uuids} : get all the tagOnlyUUIDS.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tagOnlyUUIDS in body.
     */
    @GetMapping("/tag-only-uuids")
    public List<TagOnlyUUID> getAllTagOnlyUUIDS() {
        log.debug("REST request to get all TagOnlyUUIDS");
        return tagOnlyUUIDRepository.findAll();
    }

    /**
     * {@code GET  /tag-only-uuids/:id} : get the "id" tagOnlyUUID.
     *
     * @param id the id of the tagOnlyUUID to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tagOnlyUUID, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tag-only-uuids/{id}")
    public ResponseEntity<TagOnlyUUID> getTagOnlyUUID(@PathVariable Long id) {
        log.debug("REST request to get TagOnlyUUID : {}", id);
        Optional<TagOnlyUUID> tagOnlyUUID = tagOnlyUUIDRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tagOnlyUUID);
    }

    /**
     * {@code DELETE  /tag-only-uuids/:id} : delete the "id" tagOnlyUUID.
     *
     * @param id the id of the tagOnlyUUID to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tag-only-uuids/{id}")
    public ResponseEntity<Void> deleteTagOnlyUUID(@PathVariable Long id) {
        log.debug("REST request to delete TagOnlyUUID : {}", id);
        tagOnlyUUIDRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
