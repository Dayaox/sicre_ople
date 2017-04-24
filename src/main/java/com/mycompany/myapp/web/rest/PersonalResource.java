package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Personal;

import com.mycompany.myapp.repository.PersonalRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.service.dto.PersonalDTO;
import com.mycompany.myapp.service.mapper.PersonalMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing Personal.
 */
@RestController
@RequestMapping("/api")
public class PersonalResource {

    private final Logger log = LoggerFactory.getLogger(PersonalResource.class);

    private static final String ENTITY_NAME = "personal";
        
    private final PersonalRepository personalRepository;

    private final PersonalMapper personalMapper;

    public PersonalResource(PersonalRepository personalRepository, PersonalMapper personalMapper) {
        this.personalRepository = personalRepository;
        this.personalMapper = personalMapper;
    }

    /**
     * POST  /personals : Create a new personal.
     *
     * @param personalDTO the personalDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new personalDTO, or with status 400 (Bad Request) if the personal has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/personals")
    @Timed
    public ResponseEntity<PersonalDTO> createPersonal(@Valid @RequestBody PersonalDTO personalDTO) throws URISyntaxException {
        log.debug("REST request to save Personal : {}", personalDTO);
        if (personalDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new personal cannot already have an ID")).body(null);
        }
        Personal personal = personalMapper.personalDTOToPersonal(personalDTO);
        personal = personalRepository.save(personal);
        PersonalDTO result = personalMapper.personalToPersonalDTO(personal);
        return ResponseEntity.created(new URI("/api/personals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /personals : Updates an existing personal.
     *
     * @param personalDTO the personalDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated personalDTO,
     * or with status 400 (Bad Request) if the personalDTO is not valid,
     * or with status 500 (Internal Server Error) if the personalDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/personals")
    @Timed
    public ResponseEntity<PersonalDTO> updatePersonal(@Valid @RequestBody PersonalDTO personalDTO) throws URISyntaxException {
        log.debug("REST request to update Personal : {}", personalDTO);
        if (personalDTO.getId() == null) {
            return createPersonal(personalDTO);
        }
        Personal personal = personalMapper.personalDTOToPersonal(personalDTO);
        personal = personalRepository.save(personal);
        PersonalDTO result = personalMapper.personalToPersonalDTO(personal);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, personalDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /personals : get all the personals.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of personals in body
     */
    @GetMapping("/personals")
    @Timed
    public List<PersonalDTO> getAllPersonals() {
        log.debug("REST request to get all Personals");
        List<Personal> personals = personalRepository.findAll();
        return personalMapper.personalsToPersonalDTOs(personals);
    }

    /**
     * GET  /personals/:id : get the "id" personal.
     *
     * @param id the id of the personalDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the personalDTO, or with status 404 (Not Found)
     */
    @GetMapping("/personals/{id}")
    @Timed
    public ResponseEntity<PersonalDTO> getPersonal(@PathVariable Long id) {
        log.debug("REST request to get Personal : {}", id);
        Personal personal = personalRepository.findOne(id);
        PersonalDTO personalDTO = personalMapper.personalToPersonalDTO(personal);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(personalDTO));
    }

    /**
     * DELETE  /personals/:id : delete the "id" personal.
     *
     * @param id the id of the personalDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/personals/{id}")
    @Timed
    public ResponseEntity<Void> deletePersonal(@PathVariable Long id) {
        log.debug("REST request to delete Personal : {}", id);
        personalRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
