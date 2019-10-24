package com.hippo.tracker.web.rest;

import com.hippo.tracker.BugtrackerApp;
import com.hippo.tracker.domain.TagOnlyUUID;
import com.hippo.tracker.repository.TagOnlyUUIDRepository;
import com.hippo.tracker.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.hippo.tracker.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TagOnlyUUIDResource} REST controller.
 */
@SpringBootTest(classes = BugtrackerApp.class)
public class TagOnlyUUIDResourceIT {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    @Autowired
    private TagOnlyUUIDRepository tagOnlyUUIDRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTagOnlyUUIDMockMvc;

    private TagOnlyUUID tagOnlyUUID;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TagOnlyUUIDResource tagOnlyUUIDResource = new TagOnlyUUIDResource(tagOnlyUUIDRepository);
        this.restTagOnlyUUIDMockMvc = MockMvcBuilders.standaloneSetup(tagOnlyUUIDResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TagOnlyUUID createEntity(EntityManager em) {
        TagOnlyUUID tagOnlyUUID = new TagOnlyUUID()
            .label(DEFAULT_LABEL);
        return tagOnlyUUID;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TagOnlyUUID createUpdatedEntity(EntityManager em) {
        TagOnlyUUID tagOnlyUUID = new TagOnlyUUID()
            .label(UPDATED_LABEL);
        return tagOnlyUUID;
    }

    @BeforeEach
    public void initTest() {
        tagOnlyUUID = createEntity(em);
    }

    @Test
    @Transactional
    public void createTagOnlyUUID() throws Exception {
        int databaseSizeBeforeCreate = tagOnlyUUIDRepository.findAll().size();

        // Create the TagOnlyUUID
        restTagOnlyUUIDMockMvc.perform(post("/api/tag-only-uuids")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tagOnlyUUID)))
            .andExpect(status().isCreated());

        // Validate the TagOnlyUUID in the database
        List<TagOnlyUUID> tagOnlyUUIDList = tagOnlyUUIDRepository.findAll();
        assertThat(tagOnlyUUIDList).hasSize(databaseSizeBeforeCreate + 1);
        TagOnlyUUID testTagOnlyUUID = tagOnlyUUIDList.get(tagOnlyUUIDList.size() - 1);
        assertThat(testTagOnlyUUID.getLabel()).isEqualTo(DEFAULT_LABEL);
    }

    @Test
    @Transactional
    public void createTagOnlyUUIDWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tagOnlyUUIDRepository.findAll().size();

        // Create the TagOnlyUUID with an existing ID
        tagOnlyUUID.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTagOnlyUUIDMockMvc.perform(post("/api/tag-only-uuids")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tagOnlyUUID)))
            .andExpect(status().isBadRequest());

        // Validate the TagOnlyUUID in the database
        List<TagOnlyUUID> tagOnlyUUIDList = tagOnlyUUIDRepository.findAll();
        assertThat(tagOnlyUUIDList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTagOnlyUUIDS() throws Exception {
        // Initialize the database
        tagOnlyUUIDRepository.saveAndFlush(tagOnlyUUID);

        // Get all the tagOnlyUUIDList
        restTagOnlyUUIDMockMvc.perform(get("/api/tag-only-uuids?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tagOnlyUUID.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)));
    }
    
    @Test
    @Transactional
    public void getTagOnlyUUID() throws Exception {
        // Initialize the database
        tagOnlyUUIDRepository.saveAndFlush(tagOnlyUUID);

        // Get the tagOnlyUUID
        restTagOnlyUUIDMockMvc.perform(get("/api/tag-only-uuids/{id}", tagOnlyUUID.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tagOnlyUUID.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL));
    }

    @Test
    @Transactional
    public void getNonExistingTagOnlyUUID() throws Exception {
        // Get the tagOnlyUUID
        restTagOnlyUUIDMockMvc.perform(get("/api/tag-only-uuids/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTagOnlyUUID() throws Exception {
        // Initialize the database
        tagOnlyUUIDRepository.saveAndFlush(tagOnlyUUID);

        int databaseSizeBeforeUpdate = tagOnlyUUIDRepository.findAll().size();

        // Update the tagOnlyUUID
        TagOnlyUUID updatedTagOnlyUUID = tagOnlyUUIDRepository.findById(tagOnlyUUID.getId()).get();
        // Disconnect from session so that the updates on updatedTagOnlyUUID are not directly saved in db
        em.detach(updatedTagOnlyUUID);
        updatedTagOnlyUUID
            .label(UPDATED_LABEL);

        restTagOnlyUUIDMockMvc.perform(put("/api/tag-only-uuids")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTagOnlyUUID)))
            .andExpect(status().isOk());

        // Validate the TagOnlyUUID in the database
        List<TagOnlyUUID> tagOnlyUUIDList = tagOnlyUUIDRepository.findAll();
        assertThat(tagOnlyUUIDList).hasSize(databaseSizeBeforeUpdate);
        TagOnlyUUID testTagOnlyUUID = tagOnlyUUIDList.get(tagOnlyUUIDList.size() - 1);
        assertThat(testTagOnlyUUID.getLabel()).isEqualTo(UPDATED_LABEL);
    }

    @Test
    @Transactional
    public void updateNonExistingTagOnlyUUID() throws Exception {
        int databaseSizeBeforeUpdate = tagOnlyUUIDRepository.findAll().size();

        // Create the TagOnlyUUID

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTagOnlyUUIDMockMvc.perform(put("/api/tag-only-uuids")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tagOnlyUUID)))
            .andExpect(status().isBadRequest());

        // Validate the TagOnlyUUID in the database
        List<TagOnlyUUID> tagOnlyUUIDList = tagOnlyUUIDRepository.findAll();
        assertThat(tagOnlyUUIDList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTagOnlyUUID() throws Exception {
        // Initialize the database
        tagOnlyUUIDRepository.saveAndFlush(tagOnlyUUID);

        int databaseSizeBeforeDelete = tagOnlyUUIDRepository.findAll().size();

        // Delete the tagOnlyUUID
        restTagOnlyUUIDMockMvc.perform(delete("/api/tag-only-uuids/{id}", tagOnlyUUID.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TagOnlyUUID> tagOnlyUUIDList = tagOnlyUUIDRepository.findAll();
        assertThat(tagOnlyUUIDList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TagOnlyUUID.class);
        TagOnlyUUID tagOnlyUUID1 = new TagOnlyUUID();
        tagOnlyUUID1.setId(1L);
        TagOnlyUUID tagOnlyUUID2 = new TagOnlyUUID();
        tagOnlyUUID2.setId(tagOnlyUUID1.getId());
        assertThat(tagOnlyUUID1).isEqualTo(tagOnlyUUID2);
        tagOnlyUUID2.setId(2L);
        assertThat(tagOnlyUUID1).isNotEqualTo(tagOnlyUUID2);
        tagOnlyUUID1.setId(null);
        assertThat(tagOnlyUUID1).isNotEqualTo(tagOnlyUUID2);
    }
}
