package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Personal;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Personal entity.
 */
@SuppressWarnings("unused")
public interface PersonalRepository extends JpaRepository<Personal,Long> {

    @Query("select personal from Personal personal where personal.user.login = ?#{principal.username}")
    List<Personal> findByUserIsCurrentUser();

}
